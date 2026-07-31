import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'none';

const DIRECTION_CLASS: Record<Direction, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  none: 'reveal-none',
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  /** Kept for API compatibility; CSS scroll timelines are position-driven. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
}

/**
 * Scroll reveal, implemented entirely in CSS (see `globals.css`).
 *
 * This is deliberately a server component with no client JavaScript. The
 * previous JS implementation serialised `opacity: 0` into the server-rendered
 * HTML, so body copy shipped invisible and only appeared once hydration
 * finished — on a slower device that reads as black or missing text. The CSS
 * version animates `transform` only, is driven by the browser off the main
 * thread, and degrades to "just show the content" where unsupported.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  as: Component = 'div',
}: RevealProps) {
  return (
    <Component className={cn('reveal', DIRECTION_CLASS[direction], className)}>
      {children}
    </Component>
  );
}

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('reveal', className)}>{children}</div>;
}
