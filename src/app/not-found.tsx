import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolio } from '@/data';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span className="grid size-16 place-items-center rounded-2xl border border-brand/30 bg-brand/10 text-brand-accent">
        <Compass className="size-7" aria-hidden />
      </span>
      <p className="mt-8 font-mono text-sm tracking-[0.28em] text-subtle uppercase">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
        This page <span className="text-gradient-brand">does not exist</span>
      </h1>
      <p className="mt-5 max-w-md text-[0.9375rem] text-muted">
        The link may be outdated, or the page moved. Everything worth reading is one of these:
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/projects">Browse projects</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/blog">Read the blog</Link>
        </Button>
      </div>

      <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-subtle">
        {portfolio.navigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition-colors hover:text-brand-accent">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
