'use client';

import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-all duration-300 hover:border-brand/45 hover:text-ink"
    >
      Top
      <ArrowUp className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
