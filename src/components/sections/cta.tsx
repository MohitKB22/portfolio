import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { portfolio } from '@/data';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { Magnetic } from '@/components/motion/magnetic';

export function CallToAction() {
  const { profile, contact } = portfolio;

  return (
    <section className="container-page">
      <Reveal>
        <div className="card-surface relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(45,124,255,0.16),transparent_70%)]"
          />
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">{contact.heading}</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              {contact.subheading}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.18}>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start a conversation <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="secondary">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" /> {profile.email}
                </a>
              </Button>
            </div>

            <p className="mt-6 text-xs text-subtle">{contact.responseTime}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
