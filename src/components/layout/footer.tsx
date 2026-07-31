import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { portfolio } from '@/data';
import { SocialByName } from '@/components/ui/icons';
import { AvailabilityPill } from '@/components/ui/availability-pill';
import { BackToTop } from './back-to-top';

const { profile, navigation, social } = portfolio;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/45 to-transparent" />

      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl border border-brand/35 bg-gradient-to-br from-brand/25 to-violet/15 font-display text-sm font-bold">
                {profile.initials}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-semibold">{profile.name}</span>
                <span className="text-xs text-subtle">{profile.title}</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted">{profile.tagline}</p>

            <div className="flex flex-wrap items-center gap-3">
              <AvailabilityPill />
              <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
                <MapPin className="size-3.5" aria-hidden />
                {profile.location}
              </span>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
              Navigate
            </h2>
            <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-brand-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
              Elsewhere
            </h2>
            <ul className="space-y-2.5">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target={item.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-accent"
                  >
                    <SocialByName name={item.icon} className="size-3.5" />
                    {item.name}
                    <ArrowUpRight className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-subtle">
            © {year} {profile.name}. Built with Next.js, TypeScript &amp; Three.js.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/rss.xml"
              className="text-xs text-subtle transition-colors hover:text-brand-accent"
            >
              RSS
            </a>
            <a
              href="/sitemap.xml"
              className="text-xs text-subtle transition-colors hover:text-brand-accent"
            >
              Sitemap
            </a>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
