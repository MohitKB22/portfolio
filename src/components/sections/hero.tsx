import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react';
import { portfolio } from '@/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AvailabilityPill } from '@/components/ui/availability-pill';
import { Typing } from '@/components/motion/typing';
import { Magnetic } from '@/components/motion/magnetic';
import { Scene } from '@/components/three/scene';
import { SocialByName } from '@/components/ui/icons';

const { profile, social } = portfolio;

/** Portrait framed by concentric rings — the rings are CSS, the photo is one request. */
function IdentityPortrait() {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(45,124,255,0.28),rgba(103,65,224,0.12)_45%,transparent_70%)] blur-2xl" />

      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand/25" />
      <div className="absolute inset-[8%] rounded-full border border-brand/15" />
      <div
        className="absolute inset-[16%] animate-spin-slow rounded-full border border-violet/20"
        style={{ animationDirection: 'reverse', animationDuration: '40s' }}
      />

      <div className="absolute inset-[21%] overflow-hidden rounded-full border border-line-strong bg-surface shadow-[0_36px_90px_-42px_rgba(26,92,214,0.45)]">
        <Image
          src={profile.avatar}
          alt={`${profile.name} — ${profile.title}`}
          fill
          priority
          sizes="(min-width: 1024px) 32vw, 72vw"
          className="object-cover object-top"
        />
      </div>

      <div className="absolute inset-[8%] animate-spin-slow" style={{ animationDuration: '24s' }}>
        <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_16px_4px_rgba(45,124,255,0.45)]" />
      </div>
    </div>
  );
}

/**
 * Hero.
 *
 * A server component with no entrance library. Staggered copy previously came
 * from a JS animation library, which meant the headline and summary were
 * server-rendered with inline transform/opacity styles and only settled once
 * hydration completed. Now the copy is plain HTML with a short CSS `.enter`
 * animation, so it is readable in the very first paint.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-28 pb-16 lg:pt-24"
    >
      <Scene />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ------------------------------- Copy ------------------------------- */}
          <div className="enter max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="brand"
                size="lg"
                className="font-semibold tracking-[0.16em] uppercase"
              >
                <Sparkles className="size-3" aria-hidden />
                {profile.title}
              </Badge>
              <AvailabilityPill />
            </div>

            <p className="mt-8 text-lg text-muted">Hi, I&apos;m</p>

            <h1
              id="hero-heading"
              className="mt-1 text-5xl leading-[0.98] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            >
              {profile.firstName} <span className="text-gradient-brand">{profile.lastName}</span>
            </h1>

            <div className="mt-6 font-display text-xl leading-snug font-medium text-ink sm:text-2xl lg:text-[1.75rem]">
              <span className="text-muted">{profile.headline} </span>
              <Typing phrases={profile.typingPhrases} className="text-gradient-brand" />
            </div>

            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              {profile.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.14}>
                <Button asChild size="lg">
                  <Link href="/projects">
                    View My Work <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>

              <Magnetic strength={0.14}>
                <Button asChild size="lg" variant="secondary">
                  <a href={profile.resumePath} download>
                    Download Resume <Download className="size-4" />
                  </a>
                </Button>
              </Magnetic>

              <Button asChild size="lg" variant="ghost">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
                <MapPin className="size-3.5" aria-hidden />
                {profile.location}
              </span>
              <span className="hidden h-3 w-px bg-line-strong sm:block" />
              <ul className="flex items-center gap-2">
                {social
                  .filter((entry) => entry.icon !== 'mail')
                  .map((entry) => (
                    <li key={entry.name}>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={entry.name}
                        className="grid size-9 place-items-center rounded-xl border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/45 hover:text-ink"
                      >
                        <SocialByName name={entry.icon} className="size-4" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* ------------------------------ Identity ----------------------------- */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <IdentityPortrait />

            <div className="glass absolute top-[16%] -left-2 animate-float rounded-2xl px-3.5 py-2.5 sm:-left-5">
              <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
                Focus
              </p>
              <p className="text-[0.8125rem] font-semibold text-ink">LLMs &amp; RAG</p>
            </div>

            <div
              className="glass absolute -right-2 bottom-[22%] animate-float-slow rounded-2xl px-3.5 py-2.5 sm:-right-5"
              style={{ animationDelay: '-4s' }}
            >
              <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
                Shipped
              </p>
              <p className="text-[0.8125rem] font-semibold text-ink">23 AI systems</p>
            </div>

            <div
              className="glass absolute bottom-[2%] left-[14%] animate-float rounded-2xl px-3.5 py-2.5"
              style={{ animationDelay: '-6s' }}
            >
              <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
                Currently
              </p>
              <p className="text-[0.8125rem] font-semibold text-ink">
                {portfolio.experience[0]?.company ?? '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.625rem] tracking-[0.28em] text-subtle uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-4 animate-scan bg-brand-accent" />
        </span>
      </div>
    </section>
  );
}
