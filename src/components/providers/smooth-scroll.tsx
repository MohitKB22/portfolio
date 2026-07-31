'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

const SMOOTH_SCROLL_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SMOOTH_SCROLL === 'true';

/**
 * Optional Lenis smooth scrolling, plus a scroll reset on navigation.
 *
 * Lenis is off by default. It replaces the browser's native, off-main-thread
 * scrolling with a JavaScript animation loop, which adds input latency and is
 * the most common cause of a site "feeling laggy" on a trackpad. Native
 * scrolling combined with the CSS scroll-driven reveals is smoother on every
 * device I could test. Set `NEXT_PUBLIC_ENABLE_SMOOTH_SCROLL=true` to turn it
 * back on.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!SMOOTH_SCROLL_ENABLED || reducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      let frame = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      });

      cleanup = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reducedMotion]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return <>{children}</>;
}
