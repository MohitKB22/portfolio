'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

/**
 * Light/dark switch. Light is the default; the choice is persisted and applied
 * before first paint by the inline script in `app/layout.tsx`, so there is no
 * flash of the wrong theme on reload.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      // Private browsing or storage disabled — the toggle still works for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={cn(
        'grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand/45 hover:text-ink',
        className,
      )}
    >
      {mounted && theme === 'dark' ? (
        <Sun className="size-[15px]" aria-hidden />
      ) : (
        <Moon className="size-[15px]" aria-hidden />
      )}
    </button>
  );
}
