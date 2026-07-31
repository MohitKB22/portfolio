import { projectCategories, projects } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd, projectsCollectionJsonLd } from '@/lib/jsonld';
import { PageHeader } from '@/components/layout/page-header';
import { ProjectFilter } from '@/components/projects/project-filter';
import { CallToAction } from '@/components/sections/cta';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata = buildMetadata({
  title: 'Projects',
  path: '/projects',
  description:
    'Twenty-two production-style AI and machine learning projects — agentic security operations, self-healing RAG, LLM guardrail gateways, evaluation frameworks, computer vision platforms and analytics dashboards.',
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsCollectionJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Projects', href: '/projects' }])} />

      <PageHeader
        eyebrow="Projects"
        title="Everything I've"
        accent="built and shipped"
        description={`${projects.length} public projects across ${projectCategories.length} categories. Filter by category or search by technology.`}
        breadcrumbs={[{ name: 'Projects', href: '/projects' }]}
      />

      <div className="flex flex-col gap-28 pt-12 pb-8 sm:gap-32">
        <section className="container-page">
          <ProjectFilter projects={projects} categories={projectCategories} />
        </section>
        <CallToAction />
      </div>
    </>
  );
}
