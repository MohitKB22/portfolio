import * as React from 'react';
import { cn } from '@/lib/utils';

const base =
  'w-full rounded-xl border border-line bg-[var(--panel)] px-4 text-[0.9375rem] text-ink transition-colors placeholder:text-subtle focus:border-brand/55 focus:bg-[var(--panel-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 disabled:opacity-50 aria-invalid:border-rose/60';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} className={cn(base, 'h-12', className)} {...props} />
  ),
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<'textarea'>
>(({ className, rows = 6, ...props }, ref) => (
  <textarea ref={ref} rows={rows} className={cn(base, 'resize-y py-3.5', className)} {...props} />
));
Textarea.displayName = 'Textarea';
