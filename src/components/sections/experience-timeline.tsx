'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, ExternalLink, MapPin } from 'lucide-react';
import { portfolio } from '@/data';
import { Badge } from '@/components/ui/badge';
import { cn, durationBetween, formatDateRange } from '@/lib/utils';

/** Vertical timeline with an animated rail and expandable role cards. */
export function ExperienceTimeline({ defaultOpen = 0 }: { defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ol className="relative space-y-5 pl-8 sm:pl-12">
      {/* Rail */}
      <span
        aria-hidden
        className="absolute inset-y-2 left-[11px] w-px bg-gradient-to-b from-brand via-brand/25 to-transparent sm:left-[15px]"
      />

      {portfolio.experience.map((role, index) => {
        const isOpen = open === index;

        return (
          <li key={role.id} className="reveal reveal-left relative">
            {/* Node */}
            <span
              aria-hidden
              className={cn(
                'absolute top-6 -left-8 grid size-6 place-items-center rounded-full border bg-night sm:-left-12',
                role.current ? 'border-teal/60' : 'border-line-strong',
              )}
            >
              <span
                className={cn('size-2 rounded-full', role.current ? 'bg-teal' : 'bg-brand/70')}
              />
              {role.current ? (
                <span className="absolute inset-0 animate-ping rounded-full border border-teal/40" />
              ) : null}
            </span>

            <div className="card-surface glow-ring overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 p-6 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 font-display text-xs font-bold text-brand-accent">
                  {role.logoText}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink">{role.role}</h3>
                    {role.current ? (
                      <Badge variant="success" size="sm">
                        Current
                      </Badge>
                    ) : null}
                  </span>

                  <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-muted">
                    {role.companyUrl ? (
                      <a
                        href={role.companyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1 font-medium text-brand-accent hover:underline"
                      >
                        {role.company} <ExternalLink className="size-3" />
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{role.company}</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-subtle">
                      <MapPin className="size-3" aria-hidden /> {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-subtle">
                      <Briefcase className="size-3" aria-hidden /> {role.type}
                    </span>
                  </span>

                  <span className="mt-2 block font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    {formatDateRange(role.start, role.end)} ·{' '}
                    {durationBetween(role.start, role.end)}
                  </span>

                  <span className="mt-3 block text-[0.8125rem] leading-relaxed text-muted">
                    {role.summary}
                  </span>
                </span>

                <ChevronDown
                  aria-hidden
                  className={cn(
                    'mt-1 size-4 shrink-0 text-muted transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line px-6 py-5">
                      <h4 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
                        What I did
                      </h4>
                      <ul className="mt-3 space-y-2.5">
                        {role.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-[0.8125rem] leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {role.stack.map((tech) => (
                          <li key={tech}>
                            <Badge variant="brand">{tech}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
