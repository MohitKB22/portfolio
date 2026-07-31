'use client';

import { useEffect, useState } from 'react';

interface ScrollState {
  scrolled: boolean;
  atTop: boolean;
  progress: number;
}

/** Passive scroll listener returning coarse state — cheap enough for the navbar. */
export function useScrollState(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, atTop: true, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        scrolled: y > threshold,
        atTop: y <= 2,
        progress: max > 0 ? Math.min(1, y / max) : 0,
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
