import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-line bg-[var(--panel-2)] text-muted hover:border-brand/35 hover:text-ink',
        brand: 'border-brand/30 bg-brand/12 text-brand-accent',
        violet: 'border-violet/30 bg-violet/12 text-violet',
        teal: 'border-teal/30 bg-teal/12 text-teal',
        amber: 'border-amber/30 bg-amber/12 text-amber',
        success: 'border-teal/35 bg-teal/12 text-teal',
        outline: 'border-line-strong bg-transparent text-muted',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-[0.6875rem]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-3.5 py-1.5 text-[0.8125rem]',
      },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
