import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '@/data';
import { LucideByName } from '@/components/ui/icons';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';

export function Achievements() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {portfolio.achievements.map((achievement, index) => {
        const Wrapper = achievement.href ? 'a' : 'div';

        return (
          <Reveal key={achievement.title} delay={index * 0.06}>
            <Wrapper
              {...(achievement.href
                ? { href: achievement.href, target: '_blank', rel: 'noreferrer noopener' }
                : {})}
              className="card-surface glow-ring group flex h-full items-start gap-5 p-6 sm:p-7"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-accent transition-transform duration-500 group-hover:scale-105">
                <LucideByName name={achievement.icon} className="size-5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-gradient-brand font-display text-2xl leading-none font-semibold">
                    {achievement.metric}
                  </p>
                  {achievement.href ? (
                    <ArrowUpRight className="size-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-accent" />
                  ) : null}
                </div>
                <h3 className="mt-3 text-[0.9375rem] font-semibold text-ink">
                  {achievement.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                  {achievement.description}
                </p>
                <Badge variant="outline" className="mt-4">
                  {achievement.year}
                </Badge>
              </div>
            </Wrapper>
          </Reveal>
        );
      })}
    </div>
  );
}
