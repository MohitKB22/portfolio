import { portfolio } from '@/data';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/reveal';

const TYPE_STYLES = {
  education: { dot: 'bg-violet', ring: 'border-violet/40', label: 'Education' },
  work: { dot: 'bg-brand', ring: 'border-brand/40', label: 'Work' },
  milestone: { dot: 'bg-teal', ring: 'border-teal/40', label: 'Milestone' },
} as const;

/** Compact alternating timeline of the whole journey, 2007 → today. */
export function JourneyTimeline() {
  return (
    <ol className="relative mx-auto max-w-4xl">
      <span
        aria-hidden
        className="absolute inset-y-0 left-[15px] w-px bg-gradient-to-b from-transparent via-line-strong to-transparent md:left-1/2 md:-translate-x-1/2"
      />

      {portfolio.timeline.map((entry, index) => {
        const style = TYPE_STYLES[entry.type];
        const isRight = index % 2 === 1;

        return (
          <Reveal
            key={`${entry.year}-${entry.title}`}
            as="li"
            direction={isRight ? 'left' : 'right'}
            delay={index * 0.05}
            className={cn(
              'relative flex gap-6 pb-10 pl-10 md:w-1/2 md:pl-0',
              isRight ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute top-1.5 left-0 grid size-[31px] place-items-center rounded-full border bg-night md:left-auto',
                style.ring,
                isRight ? 'md:-left-[15px]' : 'md:-right-[15px]',
              )}
            >
              <span className={cn('size-2 rounded-full', style.dot)} />
            </span>

            <div className="min-w-0 flex-1">
              <div className={cn('flex items-center gap-2.5', !isRight && 'md:justify-end')}>
                <span className="font-mono text-sm font-semibold text-brand-accent">
                  {entry.year}
                </span>
                <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] tracking-wider text-subtle uppercase">
                  {style.label}
                </span>
              </div>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">{entry.title}</h3>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                {entry.description}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
