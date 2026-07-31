'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { portfolio } from '@/data';
import { useScrollState } from '@/hooks/use-scroll-state';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SocialByName } from '@/components/ui/icons';
import { ThemeToggle } from './theme-toggle';
import { Magnetic } from '@/components/motion/magnetic';

const { navigation, profile, social } = portfolio;

export function Navbar() {
  const pathname = usePathname();
  const { scrolled } = useScrollState(20);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-2.5' : 'py-4',
        )}
      >
        <div className="container-page">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500',
              scrolled
                ? 'glass shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)]'
                : 'border border-transparent bg-transparent',
            )}
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 rounded-lg"
              aria-label={`${profile.name} — home`}
            >
              <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-brand/35 bg-gradient-to-br from-brand/25 to-violet/15">
                <span className="font-display text-sm font-bold tracking-tight text-ink">
                  {profile.initials}
                </span>
                <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-white/25 to-transparent transition-transform duration-700 group-hover:translate-y-full" />
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="font-display text-[0.9375rem] font-semibold text-ink">
                  {profile.firstName} <span className="text-brand-accent">{profile.lastName}</span>
                </span>
                <span className="text-[0.625rem] tracking-[0.18em] text-subtle uppercase">
                  {profile.title}
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-[0.8125rem] font-medium transition-colors',
                      isActive(item.href) ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <ThemeToggle />

              <div className="hidden items-center gap-1 md:flex">
                {social
                  .filter((item) => item.icon !== 'mail')
                  .map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.name}
                      className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:border-brand/45 hover:text-ink"
                    >
                      <SocialByName name={item.icon} className="size-[15px]" />
                    </a>
                  ))}
              </div>

              <Magnetic strength={0.15} className="hidden sm:inline-flex">
                <Button asChild size="sm" className="rounded-xl">
                  <a href={profile.resumePath} download>
                    Resume <Download className="size-3.5" />
                  </a>
                </Button>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid size-10 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-brand/45 lg:hidden"
              >
                {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-night/85 backdrop-blur-lg"
            />
            <motion.nav
              aria-label="Mobile"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="shadow-lift absolute inset-x-4 top-24 rounded-3xl border border-line bg-surface/95 p-3"
            >
              <ul className="flex flex-col">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 text-[0.9375rem] font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-brand/12 text-brand-accent'
                          : 'text-muted hover:bg-[var(--panel-2)] hover:text-ink',
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-[0.625rem] text-subtle">0{index + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-2 border-t border-line p-2 pt-4">
                {social
                  .filter((item) => item.icon !== 'mail')
                  .map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.name}
                      className="grid size-10 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-brand/45 hover:text-ink"
                    >
                      <SocialByName name={item.icon} className="size-4" />
                    </a>
                  ))}
                <ThemeToggle className="size-10 rounded-xl" />
                <Button asChild size="sm" className="ml-auto rounded-xl">
                  <a href={profile.resumePath} download>
                    Resume <Download className="size-3.5" />
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
