import Image from 'next/image';
import { Globe, Languages, MapPin, Clock } from 'lucide-react';
import { portfolio } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { PageHeader } from '@/components/layout/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { JourneyTimeline } from '@/components/sections/journey-timeline';
import { EducationTimeline } from '@/components/sections/education-timeline';
import { Interests } from '@/components/sections/interests';
import { Certifications } from '@/components/sections/certifications';
import { CallToAction } from '@/components/sections/cta';
import { JsonLd } from '@/components/ui/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';

export const metadata = buildMetadata({
  title: 'About',
  path: '/about',
  description:
    "Mohit Barse's background — a Computer Science & Engineering (Data Science) graduate from Nagpur building evaluation-first AI systems, with the full education and career timeline.",
});

const { profile } = portfolio;

export default function AboutPage() {
  const facts = [
    { icon: MapPin, label: 'Based in', value: profile.location },
    { icon: Clock, label: 'Timezone', value: profile.timezone },
    { icon: Languages, label: 'Languages', value: profile.languages.join(', ') },
    { icon: Globe, label: 'Open to', value: 'Remote & relocation' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'About', href: '/about' }])} />

      <PageHeader
        eyebrow="About"
        title="The long version of"
        accent="who I am"
        description={profile.summary}
        breadcrumbs={[{ name: 'About', href: '/about' }]}
      />

      <div className="flex flex-col gap-28 pt-12 pb-8 sm:gap-32">
        {/* Story */}
        <section className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line-strong bg-surface">
                  <Image
                    src={profile.avatarLocal}
                    alt={`${profile.name}, ${profile.title}`}
                    fill
                    sizes="(min-width: 1024px) 32vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-4">
                    <p className="font-display text-sm font-semibold text-ink">{profile.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {profile.title} · {profile.pronouns}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start gap-3 rounded-xl border border-line bg-[var(--panel)] p-4"
                    >
                      <fact.icon className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden />
                      <div>
                        <dt className="text-[0.625rem] tracking-wider text-subtle uppercase">
                          {fact.label}
                        </dt>
                        <dd className="mt-0.5 text-[0.8125rem] text-ink">{fact.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal direction="left">
                <div className="space-y-5 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                  <p>{profile.longSummary}</p>
                  <p>
                    The through-line in everything I build is measurement. My first serious
                    encounter with LLMs was not building with them but grading them — reviewing
                    model output against rubrics at Labmentix, finding the error patterns, and
                    watching response quality climb 30% once those patterns were named and fixed.
                    That experience permanently shaped how I approach AI work: if you cannot measure
                    the behaviour, you are not engineering it, you are hoping.
                  </p>
                  <p>
                    So my projects tend to look slightly unusual for a portfolio. Instead of another
                    chatbot, there is a RAG pipeline that detects its own hallucinations and
                    retries. Instead of a model demo, there is a guardrail gateway with a policy
                    engine and structured telemetry. Instead of a notebook with a good accuracy
                    number, there is a containerised service with drift monitoring and a CI quality
                    gate that fails the build when output regresses.
                  </p>
                  <p>
                    Alongside that I keep the fundamentals sharp — 300+ solved DSA problems, the
                    Stanford and DeepLearning.AI specialisations, and an AWS professional
                    certificate — because the systems around a model matter as much as the model.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.06}>
                <div className="card-surface p-7">
                  <h2 className="font-display text-base font-semibold text-ink">
                    How I'd describe my engineering taste
                  </h2>
                  <ul className="mt-5 space-y-3.5">
                    {[
                      'Correctness before cleverness. A boring system that fails loudly beats an elegant one that fails silently.',
                      'Abstention is a feature. "I do not know" is a valid, valuable output.',
                      'Observability is not optional. If you cannot see why it decided that, you cannot improve it.',
                      'Ship the whole thing. A model without auth, caching and deployment is not a product.',
                    ].map((principle) => (
                      <li
                        key={principle}
                        className="flex gap-3.5 text-[0.8125rem] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                        />
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="container-page">
          <SectionHeading
            eyebrow="Journey"
            title="2007 to now,"
            accent="in order"
            description="School in Nagpur, an engineering degree in data science, three internships, and 23 public repositories."
            align="center"
          />
          <div className="mt-14">
            <JourneyTimeline />
          </div>
        </section>

        {/* Education */}
        <section className="container-page">
          <SectionHeading eyebrow="Education" title="Where I" accent="studied" />
          <div className="mt-12">
            <EducationTimeline />
          </div>
        </section>

        {/* Certifications */}
        <section className="container-page">
          <SectionHeading
            eyebrow="Certifications"
            title="Formal"
            accent="credentials"
            description="Completed specialisations, not enrolments."
          />
          <div className="mt-12">
            <Certifications />
          </div>
        </section>

        {/* Interests */}
        <section className="container-page">
          <SectionHeading eyebrow="Interests" title="What holds my" accent="attention" />
          <div className="mt-12">
            <Interests />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.languages.map((language) => (
              <Badge key={language} variant="outline" size="md">
                {language}
              </Badge>
            ))}
          </div>
        </section>

        <CallToAction />
      </div>
    </>
  );
}
