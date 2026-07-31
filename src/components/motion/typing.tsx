'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

interface TypingProps {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}

/** Cycles through `phrases` with a type/erase effect and a blinking caret. */
export function Typing({
  phrases,
  className,
  typeSpeed = 55,
  deleteSpeed = 26,
  holdTime = 1900,
}: TypingProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  // Seed with the first phrase so the headline is readable in the
  // server-rendered HTML instead of appearing empty until JS types it out.
  const [text, setText] = useState(phrases[0] ?? '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0] ?? '');
      return;
    }

    const current = phrases[index % phrases.length] ?? '';

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(hold);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        ),
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, reducedMotion, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={cn('inline-flex items-baseline', className)} aria-live="polite">
      <span>{text}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] animate-caret bg-brand-accent"
      />
    </span>
  );
}
