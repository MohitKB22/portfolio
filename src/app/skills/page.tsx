import { portfolio } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { PageHeader } from '@/components/layout/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { SkillsGrid } from '@/components/sections/skills-grid';
import { AiStack } from '@/components/sections/ai-stack';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { CallToAction } from '@/components/sections/cta';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata = buildMetadata({
  title: 'Skills',
  path: '/skills',
  description:
    'Technical skills across LLMs, agentic AI, RAG, deep learning, MLOps, databases, vector stores, cloud and AI safety — grouped by domain with honest proficiency levels.',
});

export default function SkillsPage() {
  const totalSkills = portfolio.skillGroups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Skills', href: '/skills' }])} />

      <PageHeader
        eyebrow="Skills"
        title="What I can"
        accent="actually build with"
        description={`${totalSkills} skills across ${portfolio.skillGroups.length} domains. The levels are self-assessed against the standard of having shipped something real.`}
        breadcrumbs={[{ name: 'Skills', href: '/skills' }]}
      />

      <div className="flex flex-col gap-28 pt-12 pb-8 sm:gap-32">
        <section className="container-page">
          <SkillsGrid />
        </section>

        <section className="container-page">
          <SectionHeading
            eyebrow="AI Stack"
            title="Generative AI"
            accent="toolchain"
            description="Grouped by the role each tool plays: providing the model, orchestrating the workflow, retrieving the context, evaluating the output, or training the weights."
            align="center"
          />
          <div className="mt-12">
            <AiStack />
          </div>
        </section>

        <TechMarquee />
        <CallToAction />
      </div>
    </>
  );
}
