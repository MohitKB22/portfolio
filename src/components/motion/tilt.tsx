'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
}

/**
 * 3D tilt-on-hover wrapper.
 *
 * Rotation only. An earlier version also painted a cursor-tracking specular
 * highlight, which rebuilt a large radial gradient on every mousemove across
 * 22 cards — a measurable frame-rate cost for a barely visible effect. The
 * border glow in `.glow-ring` gives the same read for free.
 */
export function Tilt({ children, className, max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={cn('relative [perspective:1100px]', className)}
    >
      {children}
    </motion.div>
  );
}
