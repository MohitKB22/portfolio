import { cn } from '@/lib/utils';
import { portfolio } from '@/data';

export function AvailabilityPill({ className }: { className?: string }) {
  const { availability } = portfolio.profile;
  const isOpen = availability.status !== 'unavailable';

  return (
    <span
      title={availability.detail}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium',
        isOpen
          ? 'border-teal/30 bg-teal/10 text-teal'
          : 'border-line bg-[var(--panel-2)] text-muted',
        className,
      )}
    >
      <span className="relative flex size-2">
        {isOpen ? (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-70" />
        ) : null}
        <span
          className={cn(
            'relative inline-flex size-2 rounded-full',
            isOpen ? 'bg-teal' : 'bg-subtle',
          )}
        />
      </span>
      {availability.label}
    </span>
  );
}
