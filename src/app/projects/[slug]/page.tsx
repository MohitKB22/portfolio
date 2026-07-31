import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github, Star } from 'lucide-react';
import { getProjectBySlug, getRelatedProjects, projects } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/jsonld';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/ui/json-ld';
import { ProjectCard } from '@/components/projects/project-card';
import { Reveal } from '@/components/motion/reveal';
import { CallToAction } from '@/components/sections/cta';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: 'Project not found', noIndex: true });

  return buildMetadata({
    title: project.title,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    tags: project.stack,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, 3);

  return (
    <>
      <JsonLd data={projectJsonLd(slug)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Projects', href: '/projects' },
          { name: project.title, href: `/projects/${project.slug}` },
        ])}
      />

      <article>
        {/* Hero */}
        <header className="relative overflow-hidden pt-32 pb-14 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-[1]"
            style={{
              background: `radial-gradient(70% 60% at 30% 0%, ${project.accent}1f, transparent 70%)`,
            }}
          />
          <div className="container-page">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs text-subtle transition-colors hover:text-brand-accent"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> All projects
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-wider uppercase"
                style={{ background: `${project.accent}1f`, color: project.accent }}
              >
                {project.category}
              </span>
              <Badge variant="outline">{project.year}</Badge>
              {project.status === 'active' ? (
                <Badge variant="success">Active</Badge>
              ) : (
                <Badge>Archived</Badge>
              )}
              {project.stars > 0 ? (
                <Badge>
                  <Star className="size-2.5" aria-hidden /> {project.stars}
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href={project.github} target="_blank" rel="noreferrer noopener">
                  <Github className="size-4" /> View source
                </a>
              </Button>
              {project.demo ? (
                <Button asChild variant="secondary">
                  <a href={project.demo} target="_blank" rel="noreferrer noopener">
                    Live demo <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : null}
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8 sm:max-w-2xl">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dd className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {metric.value}
                  </dd>
                  <dt className="mt-1 text-[0.6875rem] tracking-wide text-subtle uppercase">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* Body */}
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="space-y-12">
              <Reveal>
                <section>
                  <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    {project.description}
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.05}>
                <section className="grid gap-5 sm:grid-cols-2">
                  <div className="card-surface p-6">
                    <h3 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-rose uppercase">
                      The problem
                    </h3>
                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                      {project.problem}
                    </p>
                  </div>
                  <div className="card-surface p-6">
                    <h3 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-teal uppercase">
                      The approach
                    </h3>
                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                      {project.approach}
                    </p>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={0.05}>
                <section>
                  <h2 className="font-display text-xl font-semibold text-ink">Key features</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 rounded-xl border border-line bg-[var(--panel)] p-4 text-[0.8125rem] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full"
                          style={{ background: project.accent }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              <Reveal delay={0.05}>
                <section>
                  <h2 className="font-display text-xl font-semibold text-ink">Architecture</h2>
                  <ol className="mt-5 space-y-3">
                    {project.architecture.map((layer, index) => (
                      <li key={layer.layer} className="flex items-start gap-4">
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-xl border font-mono text-xs font-semibold"
                          style={{
                            borderColor: `${project.accent}44`,
                            background: `${project.accent}14`,
                            color: project.accent,
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1 rounded-xl border border-line bg-[var(--panel)] p-4">
                          <p className="text-[0.875rem] font-semibold text-ink">{layer.layer}</p>
                          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                            {layer.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Reveal direction="left">
                <div className="card-surface p-6">
                  <h2 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
                    Tech stack
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge variant="brand" size="md">
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-7 text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
                    Repository
                  </h2>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-brand-accent hover:underline"
                  >
                    <Github className="size-3.5" aria-hidden /> {project.repo}
                  </a>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <section className="container-page mt-28">
            <h2 className="font-display text-xl font-semibold text-ink">Related projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((entry) => (
                <ProjectCard key={entry.slug} project={entry} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-28">
          <CallToAction />
        </div>
      </article>
    </>
  );
}
