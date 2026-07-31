import { portfolio } from '@/data';
import { LucideByName } from '@/components/ui/icons';
import { Reveal } from '@/components/motion/reveal';

export function Interests() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {portfolio.interests.map((interest, index) => (
        <Reveal key={interest.title} delay={index * 0.05}>
          <div className="card-surface group h-full p-6">
            <span className="grid size-10 place-items-center rounded-xl border border-line bg-[var(--panel)] text-muted transition-colors duration-300 group-hover:border-brand/35 group-hover:text-brand-accent">
              <LucideByName name={interest.icon} className="size-[18px]" />
            </span>
            <h3 className="mt-4 text-[0.9375rem] font-semibold text-ink">{interest.title}</h3>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
              {interest.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
