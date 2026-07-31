'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 52;
const CONNECT_DISTANCE = 2.9;
const BOUNDS = 9;

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

/** Soft circular sprite so points render as dots rather than squares. */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.35, 'rgba(170,210,255,0.85)');
      gradient.addColorStop(1, 'rgba(45,124,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/**
 * Drifting nodes with proximity-based edges — a literal neural-network field.
 * Edge geometry is rebuilt into a preallocated buffer each frame, so there are
 * no per-frame allocations and no garbage-collection stutter.
 */
function NeuralField({ intensity = 1 }: { intensity?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dotTexture = useDotTexture();

  const nodes = useMemo<Node[]>(() => {
    // Deterministic seeding keeps the first frame stable across reloads.
    let seed = 20260731;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return Array.from({ length: NODE_COUNT }, () => ({
      position: new THREE.Vector3(
        (random() - 0.5) * BOUNDS * 2,
        (random() - 0.5) * BOUNDS * 1.2,
        (random() - 0.5) * BOUNDS,
      ),
      velocity: new THREE.Vector3(
        (random() - 0.5) * 0.0055,
        (random() - 0.5) * 0.0055,
        (random() - 0.5) * 0.0035,
      ),
    }));
  }, []);

  const nodePositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const maxEdges = NODE_COUNT * 6;
  const edgePositions = useMemo(() => new Float32Array(maxEdges * 6), [maxEdges]);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    return geometry;
  }, [nodePositions]);

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [edgePositions]);

  const { pointer } = useThree();
  const frame = useRef(0);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05) * 60;
    frame.current += 1;
    // The edge pass is O(n^2); running it on alternate frames halves its cost
    // and is imperceptible at these drift speeds.
    const rebuildEdges = frame.current % 2 === 0;

    for (let i = 0; i < NODE_COUNT; i += 1) {
      const node = nodes[i];
      if (!node) continue;

      node.position.addScaledVector(node.velocity, step);

      // Reflect at the bounding box so the field never empties out.
      if (Math.abs(node.position.x) > BOUNDS) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > BOUNDS * 0.6) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > BOUNDS * 0.5) node.velocity.z *= -1;

      nodePositions[i * 3] = node.position.x;
      nodePositions[i * 3 + 1] = node.position.y;
      nodePositions[i * 3 + 2] = node.position.z;
    }

    if (rebuildEdges) {
      let edgeIndex = 0;
      for (let i = 0; i < NODE_COUNT && edgeIndex < maxEdges; i += 1) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < NODE_COUNT && edgeIndex < maxEdges; j += 1) {
          const b = nodes[j];
          if (!b) continue;
          if (a.position.distanceTo(b.position) > CONNECT_DISTANCE) continue;
          const offset = edgeIndex * 6;
          edgePositions[offset] = a.position.x;
          edgePositions[offset + 1] = a.position.y;
          edgePositions[offset + 2] = a.position.z;
          edgePositions[offset + 3] = b.position.x;
          edgePositions[offset + 4] = b.position.y;
          edgePositions[offset + 5] = b.position.z;
          edgeIndex += 1;
        }
      }

      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.setDrawRange(0, edgeIndex * 2);
    }

    pointsGeometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      // Gentle mouse parallax plus a slow constant drift.
      groupRef.current.rotation.y +=
        (pointer.x * 0.22 * intensity - groupRef.current.rotation.y) * 0.035 + 0.0006;
      groupRef.current.rotation.x +=
        (-pointer.y * 0.16 * intensity - groupRef.current.rotation.x) * 0.035;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          map={dotTexture}
          size={0.3}
          sizeAttenuation
          transparent
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color="#2d7cff"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/** Slowly rotating wireframe icosahedron that sits behind the hero portrait. */
function WireSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.18;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]} scale={5.2}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial color="#1a5cd6" wireframe transparent opacity={0.13} />
    </mesh>
  );
}

export default function NeuralScene({ intensity = 1 }: { intensity?: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 13], fov: 55 }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.4} />
      <WireSphere />
      <NeuralField intensity={intensity} />
    </Canvas>
  );
}
