'use client';

import { useMemo } from 'react';
import { useActiveHeading } from '@/hooks/use-active-heading';
import { cn } from '@/lib/utils';

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const active = useActiveHeading(ids);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-4 text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
        On this page
      </p>
      <ul className="space-y-1 border-l border-line">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1.5 text-[0.8125rem] leading-snug transition-colors',
                heading.level === 3 ? 'pl-7' : 'pl-4',
                active === heading.id
                  ? 'border-brand text-brand-accent'
                  : 'border-transparent text-muted hover:border-line-strong hover:text-ink',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
