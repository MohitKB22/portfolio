import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-white shadow-[0_10px_34px_-12px_rgba(45,124,255,0.85)] hover:bg-brand-deep hover:shadow-[0_18px_44px_-12px_rgba(45,124,255,0.95)] active:translate-y-px',
        secondary:
          'border border-line-strong bg-[var(--panel-2)] text-ink backdrop-blur-sm hover:border-brand/45 hover:bg-[var(--panel-3)]',
        outline:
          'border border-brand/40 bg-transparent text-brand-accent hover:border-brand hover:bg-brand/10',
        ghost: 'text-muted hover:bg-[var(--panel-3)] hover:text-ink',
        link: 'h-auto p-0 text-brand-accent underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3.5 text-[0.8125rem]',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-[0.9375rem]',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
