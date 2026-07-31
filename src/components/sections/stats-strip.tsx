import { portfolio } from '@/data';
import { Counter } from '@/components/motion/counter';
import { LucideByName } from '@/components/ui/icons';
import { Reveal } from '@/components/motion/reveal';

export function StatsStrip() {
  return (
    <section aria-label="Key statistics" className="container-page">
      <Reveal>
        <dl className="card-surface grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {portfolio.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group flex items-center gap-4 border-line p-6 transition-colors duration-500 hover:bg-[var(--panel)] max-lg:border-b max-lg:odd:border-r lg:p-7"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand-accent transition-transform duration-500 group-hover:scale-105">
                <LucideByName name={stat.icon} className="size-5" />
              </span>
              <div>
                <dd className="font-display text-2xl leading-none font-semibold text-ink sm:text-3xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1.5 text-xs text-muted">{stat.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
