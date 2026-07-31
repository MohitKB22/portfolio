'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function CopyButton({
  value,
  label = 'Copy',
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not access the clipboard');
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label}: ${value}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-line bg-[var(--panel)] px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-brand/40 hover:text-ink',
        className,
      )}
    >
      {copied ? <Check className="size-3.5 text-teal" /> : <Copy className="size-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  );
}
