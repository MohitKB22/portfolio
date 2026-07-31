'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Star } from 'lucide-react';
import type { Project } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Tilt } from '@/components/motion/tilt';
import { cn } from '@/lib/utils';

/** Deterministic mini "architecture" preview drawn from the project's layers. */
function ArchitecturePreview({ project }: { project: Project }) {
  return (
    <div className="relative h-40 overflow-hidden border-b border-line bg-[#070d19]">
      <div aria-hidden className="dot-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 20% 0%, ${project.accent}22, transparent 60%)`,
        }}
      />
      <div className="relative flex h-full flex-col justify-center gap-1.5 px-5">
        {project.architecture.slice(0, 4).map((layer, index) => (
          <div key={layer.layer} className="flex items-center gap-2.5">
            <span
              className="h-1.5 rounded-full transition-all duration-500 group-hover:opacity-100"
              style={{
                width: `${28 + index * 16}%`,
                background: `linear-gradient(90deg, ${project.accent}, ${project.accent}22)`,
                opacity: 0.75 - index * 0.12,
              }}
            />
            <span className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
              {layer.layer}
            </span>
          </div>
        ))}
      </div>
      <span
        className="absolute top-4 right-4 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold tracking-wider uppercase"
        style={{ background: `${project.accent}1f`, color: project.accent }}
      >
        {project.category}
      </span>
    </div>
  );
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn('reveal group h-full', className)}>
      <Tilt max={5} className="h-full">
        <div className="card-surface glow-ring flex h-full flex-col overflow-hidden">
          <ArchitecturePreview project={project} />

          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg leading-snug font-semibold text-ink transition-colors duration-300 group-hover:text-brand-accent">
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                  <span className="absolute inset-0" aria-hidden />
                </Link>
              </h3>
              {project.stars > 0 ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2 py-0.5 font-mono text-[0.625rem] text-muted">
                  <Star className="size-2.5" aria-hidden /> {project.stars}
                </span>
              ) : null}
            </div>

            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">{project.tagline}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 5).map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
              {project.stack.length > 5 ? (
                <li>
                  <Badge variant="outline">+{project.stack.length - 5}</Badge>
                </li>
              ) : null}
            </ul>

            <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dd className="font-mono text-[0.8125rem] font-semibold text-ink">
                    {metric.value}
                  </dd>
                  <dt className="mt-0.5 text-[0.625rem] tracking-wide text-subtle uppercase">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="relative z-10 mt-5 flex items-center gap-3 pt-1">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-accent transition-transform duration-300 hover:translate-x-0.5"
              >
                Case study <ArrowUpRight className="size-3.5" />
              </Link>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} on GitHub`}
                className="ml-auto grid size-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand/45 hover:text-ink"
              >
                <Github className="size-3.5" />
              </a>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.title} live demo`}
                  className="grid size-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand/45 hover:text-ink"
                >
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Tilt>
    </article>
  );
}
