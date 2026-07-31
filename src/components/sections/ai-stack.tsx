import { aiStackCategories, portfolio } from '@/data';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

const CATEGORY_ACCENT: Record<string, string> = {
  'Model Providers': 'from-brand/18 text-brand-accent border-brand/30',
  Orchestration: 'from-violet/18 text-violet border-violet/30',
  Retrieval: 'from-teal/18 text-teal border-teal/30',
  'Evaluation & Safety': 'from-amber/18 text-amber border-amber/30',
  Training: 'from-rose/18 text-rose border-rose/30',
};

/** The AI-specific stack, grouped by the role each tool plays in a system. */
export function AiStack() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {aiStackCategories.map((category, categoryIndex) => {
        const items = portfolio.aiStack.filter((entry) => entry.category === category);
        const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT['Model Providers'];

        return (
          <Reveal
            key={category}
            delay={categoryIndex * 0.06}
            className={cn(categoryIndex === 0 && 'lg:col-span-2')}
          >
            <div className="card-surface h-full p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-base font-semibold text-ink">{category}</h3>
                <span
                  className={cn(
                    'rounded-full border bg-gradient-to-r to-transparent px-2.5 py-1 font-mono text-[0.625rem] tracking-wider uppercase',
                    accent,
                  )}
                >
                  {items.length} tools
                </span>
              </div>

              <ul
                className={cn(
                  'mt-5 grid gap-3',
                  categoryIndex === 0 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
                )}
              >
                {items.map((entry) => (
                  <li
                    key={entry.name}
                    className="group rounded-xl border border-line bg-[var(--panel)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:bg-[var(--panel-2)]"
                  >
                    <p className="text-[0.8125rem] font-semibold text-ink">{entry.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{entry.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
