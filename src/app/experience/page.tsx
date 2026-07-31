import { portfolio } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { PageHeader } from '@/components/layout/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { EducationTimeline } from '@/components/sections/education-timeline';
import { Certifications } from '@/components/sections/certifications';
import { CallToAction } from '@/components/sections/cta';
import { JsonLd } from '@/components/ui/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { durationBetween } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Experience',
  path: '/experience',
  description:
    "Mohit Barse's professional experience — Python full stack development at QSpiders, AI/ML engineering at Labmentix, and data analytics at Codon's Technologies.",
});

export default function ExperiencePage() {
  const totalStack = [...new Set(portfolio.experience.flatMap((role) => role.stack))];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Experience', href: '/experience' }])} />

      <PageHeader
        eyebrow="Experience"
        title="Roles, and what"
        accent="came out of them"
        description="Three internships across analytics, LLM evaluation and backend engineering. Expand any role for the detail."
        breadcrumbs={[{ name: 'Experience', href: '/experience' }]}
      />

      <div className="flex flex-col gap-28 pt-12 pb-8 sm:gap-32">
        <section className="container-page">
          <Reveal>
            <dl className="card-surface mb-12 grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
              {[
                { label: 'Roles held', value: String(portfolio.experience.length) },
                {
                  label: 'Currently at',
                  value: portfolio.experience.find((role) => role.current)?.company ?? '—',
                },
                {
                  label: 'Longest tenure',
                  value: durationBetween(
                    portfolio.experience[portfolio.experience.length - 1]?.start ?? '2025-11',
                    null,
                  ),
                },
                { label: 'Technologies used', value: String(totalStack.length) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-line p-6 max-lg:border-b max-lg:odd:border-r"
                >
                  <dd className="font-display text-lg font-semibold text-ink">{stat.value}</dd>
                  <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <ExperienceTimeline />
        </section>

        <section className="container-page">
          <SectionHeading eyebrow="Education" title="Academic" accent="background" />
          <div className="mt-12">
            <EducationTimeline />
          </div>
        </section>

        <section className="container-page">
          <SectionHeading eyebrow="Certifications" title="Verified" accent="coursework" />
          <div className="mt-12">
            <Certifications />
          </div>
        </section>

        <CallToAction />
      </div>
    </>
  );
}
