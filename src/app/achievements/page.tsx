import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { PageHeader } from '@/components/layout/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { Achievements } from '@/components/sections/achievements';
import { Certifications } from '@/components/sections/certifications';
import { GitHubStats, GitHubStatsSkeleton } from '@/components/sections/github-stats';
import { CallToAction } from '@/components/sections/cta';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata = buildMetadata({
  title: 'Achievements',
  path: '/achievements',
  description:
    '300+ LeetCode problems solved, 23 public open-source AI projects, a 30% measured improvement in LLM response quality, and completed Stanford, DeepLearning.AI and AWS certifications.',
});

export default function AchievementsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Achievements', href: '/achievements' }])} />

      <PageHeader
        eyebrow="Achievements"
        title="Measured"
        accent="outcomes"
        description="Things with a number attached, and the credentials behind them."
        breadcrumbs={[{ name: 'Achievements', href: '/achievements' }]}
      />

      <div className="flex flex-col gap-28 pt-12 pb-8 sm:gap-32">
        <section className="container-page space-y-6">
          <Achievements />
          <Suspense fallback={<GitHubStatsSkeleton />}>
            <GitHubStats />
          </Suspense>
        </section>

        <section className="container-page">
          <SectionHeading
            eyebrow="Certifications"
            title="Completed"
            accent="specialisations"
            description="Each of these is a finished specialisation with graded assignments, not an enrolment."
          />
          <div className="mt-12">
            <Certifications />
          </div>
        </section>

        <CallToAction />
      </div>
    </>
  );
}
