'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { Post } from '@/lib/blog';
import { PostCard } from './post-card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function BlogIndex({
  posts,
  categories,
}: {
  posts: Post[];
  categories: { name: string; count: number }[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== 'All' && post.category !== category) return false;
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle)) ||
        post.content.toLowerCase().includes(needle)
      );
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter posts by category"
          className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-line bg-[var(--panel)] p-1.5"
        >
          {[{ name: 'All', count: posts.length }, ...categories].map((entry) => (
            <button
              key={entry.name}
              type="button"
              role="tab"
              aria-selected={category === entry.name}
              onClick={() => setCategory(entry.name)}
              className={cn(
                'relative rounded-xl px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300',
                category === entry.name ? 'text-brand-accent' : 'text-muted hover:text-ink',
              )}
            >
              {category === entry.name ? (
                <motion.span
                  layoutId="blog-filter-pill"
                  className="absolute inset-0 rounded-xl bg-brand/15 shadow-[inset_0_0_0_1px_rgba(45,124,255,0.35)]"
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                />
              ) : null}
              <span className="relative">
                {entry.name}
                <span className="ml-1.5 font-mono text-[0.625rem] text-subtle">{entry.count}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="h-11 pl-11"
          />
        </div>
      </div>

      <p className="mt-5 text-xs text-subtle" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? (
        <div className="card-surface mt-8 px-6 py-16 text-center">
          <p className="text-sm text-muted">No articles match that search yet.</p>
        </div>
      ) : null}
    </div>
  );
}
