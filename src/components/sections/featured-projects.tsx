import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredProjects } from '@/data';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectCard } from '@/components/projects/project-card';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

export function FeaturedProjects() {
  return (
    <section id="projects" aria-labelledby="featured-projects-heading" className="container-page">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects built to"
          accent="survive production"
          description="Six systems where the interesting problem was reliability, not the model. Each one ships with evaluation, observability or explainability as a first-class concern."
        />
        <Reveal direction="left" delay={0.1}>
          <Button asChild variant="secondary" className="shrink-0">
            <Link href="/projects">
              All 22 projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>

      <h2 id="featured-projects-heading" className="sr-only">
        Featured projects
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
