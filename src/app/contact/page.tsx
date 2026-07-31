import { Calendar, Mail, MapPin, Phone } from 'lucide-react';
import { portfolio } from '@/data';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';
import { PageHeader } from '@/components/layout/page-header';
import { ContactForm } from '@/components/sections/contact-form';
import { CopyButton } from '@/components/ui/copy-button';
import { AvailabilityPill } from '@/components/ui/availability-pill';
import { SocialByName } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/ui/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';

export const metadata = buildMetadata({
  title: 'Contact',
  path: '/contact',
  description:
    'Get in touch with Mohit Barse about AI/ML Engineer roles, LLM and RAG engineering work, or open-source collaboration. Usually replies within 24 hours.',
});

const { profile, contact, social } = portfolio;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Contact', href: '/contact' }])} />

      <PageHeader
        eyebrow="Contact"
        title={contact.heading.replace("Let's build something ", "Let's build something ")}
        description={contact.subheading}
        breadcrumbs={[{ name: 'Contact', href: '/contact' }]}
      />

      <div className="container-page pt-12 pb-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          {/* Form */}
          <Reveal>
            <div className="card-surface p-7 sm:p-9">
              <h2 className="font-display text-lg font-semibold text-ink">Send a message</h2>
              <p className="mt-1.5 text-[0.8125rem] text-muted">
                Fields marked * are required. Nothing is stored beyond the email itself.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="space-y-6">
            <Reveal direction="left">
              <div className="card-surface p-6">
                <AvailabilityPill />
                <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
                  {profile.availability.detail}
                </p>

                <dl className="mt-6 space-y-4 border-t border-line pt-5">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden />
                    <div className="min-w-0">
                      <dt className="text-[0.625rem] tracking-wider text-subtle uppercase">
                        Email
                      </dt>
                      <dd className="mt-0.5 truncate text-[0.8125rem] text-ink">
                        <a href={`mailto:${profile.email}`} className="hover:text-brand-accent">
                          {profile.email}
                        </a>
                      </dd>
                      <CopyButton value={profile.email} label="Copy email" className="mt-2.5" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden />
                    <div>
                      <dt className="text-[0.625rem] tracking-wider text-subtle uppercase">
                        Phone
                      </dt>
                      <dd className="mt-0.5 text-[0.8125rem] text-ink">
                        <a
                          href={`tel:${profile.phone.replace(/\s/g, '')}`}
                          className="hover:text-brand-accent"
                        >
                          {profile.phone}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden />
                    <div>
                      <dt className="text-[0.625rem] tracking-wider text-subtle uppercase">
                        Location
                      </dt>
                      <dd className="mt-0.5 text-[0.8125rem] text-ink">{profile.location}</dd>
                      <dd className="mt-0.5 text-xs text-subtle">{profile.timezone}</dd>
                    </div>
                  </div>
                </dl>

                {siteConfig.calendly ? (
                  <Button asChild variant="secondary" className="mt-6 w-full">
                    <a href={siteConfig.calendly} target="_blank" rel="noreferrer noopener">
                      <Calendar className="size-4" /> Book a call
                    </a>
                  </Button>
                ) : null}
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.06}>
              <div className="card-surface p-6">
                <h2 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
                  Good reasons to write
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {contact.topics.map((topic) => (
                    <li key={topic}>
                      <Badge variant="brand" size="md">
                        {topic}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="card-surface p-6">
                <h2 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
                  Elsewhere
                </h2>
                <ul className="mt-4 space-y-2">
                  {social.map((entry) => (
                    <li key={entry.name}>
                      <a
                        href={entry.url}
                        target={entry.url.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noreferrer noopener"
                        className="group flex items-center gap-3 rounded-xl border border-line bg-[var(--panel)] p-3 transition-colors hover:border-brand/35"
                      >
                        <span className="grid size-8 place-items-center rounded-lg border border-line text-muted transition-colors group-hover:text-brand-accent">
                          <SocialByName name={entry.icon} className="size-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.8125rem] font-medium text-ink">
                            {entry.name}
                          </span>
                          <span className="block truncate text-xs text-subtle">{entry.handle}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <Button asChild className="mt-5 w-full">
                  <a href={profile.resumePath} download>
                    Download resume
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
