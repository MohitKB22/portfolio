import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="none">
          <span className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.22em] text-brand-accent uppercase">
            <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-brand" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <Heading
          className={cn(
            'leading-[1.1] font-semibold',
            Heading === 'h1'
              ? 'text-4xl sm:text-5xl lg:text-6xl'
              : 'text-3xl sm:text-4xl lg:text-[2.75rem]',
          )}
        >
          {title}
          {accent ? <span className="text-gradient-brand"> {accent}</span> : null}
        </Heading>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-[0.9375rem] leading-relaxed text-muted sm:text-base',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
