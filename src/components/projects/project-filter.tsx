'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Project } from '@/data';
import { ProjectCard } from './project-card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function ProjectFilter({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = active === 'All' || project.category === active;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return (
        project.title.toLowerCase().includes(needle) ||
        project.tagline.toLowerCase().includes(needle) ||
        project.description.toLowerCase().includes(needle) ||
        project.stack.some((tech) => tech.toLowerCase().includes(needle))
      );
    });
  }, [projects, active, query]);

  const tabs = ['All', ...categories];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-line bg-[var(--panel)] p-1.5"
        >
          {tabs.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={cn(
                'relative rounded-xl px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300',
                active === category ? 'text-brand-accent' : 'text-muted hover:text-ink',
              )}
            >
              {active === category ? (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-xl bg-brand/15 shadow-[inset_0_0_0_1px_rgba(45,124,255,0.35)]"
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                />
              ) : null}
              <span className="relative">{category}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects or tech…"
            aria-label="Search projects"
            className="h-11 pl-11"
          />
        </div>
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-subtle" aria-live="polite">
        <SlidersHorizontal className="size-3.5" aria-hidden />
        {filtered.length} of {projects.length} projects
        {active !== 'All' ? ` in ${active}` : ''}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? (
        <div className="card-surface mt-8 px-6 py-16 text-center">
          <p className="text-sm text-muted">
            Nothing matches that search. Try a different term or clear the filter.
          </p>
        </div>
      ) : null}
    </div>
  );
}
