import { GraduationCap } from 'lucide-react';
import { portfolio } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';

export function EducationTimeline() {
  return (
    <ol className="relative space-y-5 pl-8 sm:pl-12">
      <span
        aria-hidden
        className="absolute inset-y-2 left-[11px] w-px bg-gradient-to-b from-violet via-violet/25 to-transparent sm:left-[15px]"
      />

      {portfolio.education.map((entry, index) => (
        <Reveal key={entry.id} as="li" direction="left" delay={index * 0.08} className="relative">
          <span
            aria-hidden
            className="absolute top-6 -left-8 grid size-6 place-items-center rounded-full border border-line-strong bg-night sm:-left-12"
          >
            <GraduationCap className="size-3 text-violet" />
          </span>

          <div className="card-surface glow-ring p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet/25 bg-violet/10 font-display text-xs font-bold text-violet">
                {entry.logoText}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">
                    {entry.institution}
                  </h3>
                  <span className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    {entry.start} — {entry.end}
                  </span>
                </div>

                <p className="mt-1 text-[0.8125rem] text-muted">
                  <span className="font-medium text-ink">{entry.degree}</span> · {entry.field}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{entry.location}</Badge>
                  {entry.score ? (
                    <Badge variant="violet">
                      {entry.scoreLabel}: {entry.score}
                    </Badge>
                  ) : null}
                </div>

                {entry.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[0.8125rem] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
