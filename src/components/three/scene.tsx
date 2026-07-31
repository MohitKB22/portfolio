'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/use-media-query';
import { Constellation } from '@/components/ui/constellation';
import { cn } from '@/lib/utils';

const NeuralScene = dynamic(() => import('./neural-scene'), { ssr: false });

const WEBGL_ENABLED = process.env.NEXT_PUBLIC_ENABLE_WEBGL === 'true';

/**
 * Hero background.
 *
 * Defaults to a static SVG constellation. The animated React Three Fiber scene
 * is opt-in via `NEXT_PUBLIC_ENABLE_WEBGL=true`, because a continuously
 * rendering WebGL canvas — an O(n²) proximity pass plus a geometry upload every
 * frame — is by far the most expensive thing on the page and made the site feel
 * sluggish on integrated graphics and on battery.
 *
 * When enabled it still only mounts after hydration, on desktop viewports, with
 * motion allowed, and when a WebGL context can actually be created.
 */
export function Scene({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!WEBGL_ENABLED) return;
    try {
      const canvas = document.createElement('canvas');
      setSupported(
        Boolean(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') ?? canvas.getContext('webgl')),
        ),
      );
    } catch {
      setSupported(false);
    }
  }, []);

  const useWebgl = WEBGL_ENABLED && isDesktop && !reducedMotion && supported;

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-[5]', className)}>
      {useWebgl ? <NeuralScene intensity={intensity} /> : <Constellation />}
    </div>
  );
}
