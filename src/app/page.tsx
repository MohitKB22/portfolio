import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { portfolio } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/hero';
import { StatsStrip } from '@/components/sections/stats-strip';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { SkillsGrid } from '@/components/sections/skills-grid';
import { AiStack } from '@/components/sections/ai-stack';
import { Achievements } from '@/components/sections/achievements';
import { GitHubStats, GitHubStatsSkeleton } from '@/components/sections/github-stats';
import { CallToAction } from '@/components/sections/cta';
import { PostCard } from '@/components/blog/post-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="flex flex-col gap-28 pb-8 sm:gap-32">
      <Hero />
      <StatsStrip />
      <TechMarquee />

      {/* About preview */}
      <section id="about" className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="About"
            title="Evaluation-first"
            accent="AI engineering"
            description={portfolio.profile.longSummary}
          />

          <div className="space-y-6">
            <Reveal direction="left">
              <div className="card-surface p-7">
                <h3 className="font-display text-base font-semibold text-ink">
                  What I actually do
                </h3>
                <ul className="mt-5 space-y-4">
                  {[
                    {
                      title: 'Make AI systems measurable',
                      body: 'Benchmark suites, hallucination detection and CI quality gates, so a prompt change is a claim with a number attached.',
                    },
                    {
                      title: 'Make retrieval reliable',
                      body: 'Hybrid search, groundedness validation and abstention paths — RAG that knows the difference between an answer and a guess.',
                    },
                    {
                      title: 'Make models deployable',
                      body: 'Containerised FastAPI services, drift monitoring and reproducible environments instead of notebooks.',
                    },
                  ].map((entry) => (
                    <li key={entry.title} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-accent"
                      />
                      <div>
                        <p className="text-[0.875rem] font-semibold text-ink">{entry.title}</p>
                        <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                          {entry.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <Button asChild variant="secondary">
                <Link href="/about">
                  Read the full story <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <FeaturedProjects />

      {/* Experience */}
      <section id="experience" className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've"
            accent="shipped"
            description="Three internships across data analytics, LLM evaluation and Python backend engineering — each one narrowing the focus toward production AI."
          />
          <Reveal direction="left" delay={0.1}>
            <Button asChild variant="secondary" className="shrink-0">
              <Link href="/experience">
                Full journey <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-12">
          <ExperienceTimeline />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title="Depth where it"
          accent="matters"
          description="Eight domains, self-assessed honestly. The high numbers are where I have shipped something that survived real usage."
        />
        <div className="mt-12">
          <SkillsGrid />
        </div>
      </section>

      {/* AI stack */}
      <section id="ai-stack" className="container-page">
        <SectionHeading
          eyebrow="AI Stack"
          title="The generative AI"
          accent="toolchain"
          description="Grouped by the job each tool does in a system, not by vendor. Every entry here appears in at least one shipped project."
          align="center"
        />
        <div className="mt-12">
          <AiStack />
        </div>
      </section>

      {/* Achievements + GitHub */}
      <section id="achievements" className="container-page">
        <SectionHeading eyebrow="Achievements" title="Numbers I can" accent="point at" />
        <div className="mt-12 space-y-6">
          <Achievements />
          <Suspense fallback={<GitHubStatsSkeleton />}>
            <GitHubStats />
          </Suspense>
        </div>
      </section>

      {/* Blog preview */}
      {posts.length > 0 ? (
        <section id="writing" className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Writing"
              title="Notes from"
              accent="building"
              description="Long-form posts on RAG architecture, LLM evaluation, guardrails and the unglamorous parts of production ML."
            />
            <Reveal direction="left" delay={0.1}>
              <Button asChild variant="secondary" className="shrink-0">
                <Link href="/blog">
                  All articles <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <CallToAction />
    </div>
  );
}
