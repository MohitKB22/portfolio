import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Post } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className="card-surface glow-ring group relative flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="brand">{post.category}</Badge>
        {post.featured || featured ? <Badge variant="teal">Featured</Badge> : null}
      </div>

      <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-ink transition-colors duration-300 group-hover:text-brand-accent">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
          <span className="absolute inset-0" aria-hidden />
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-muted">{post.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {post.tags.slice(0, 4).map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" aria-hidden /> {post.readingTime}
          </span>
        </div>
        <ArrowUpRight className="size-4 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-accent" />
      </div>
    </article>
  );
}
