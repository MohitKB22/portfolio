import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { extractHeadings } from '@/lib/mdx';
import { buildMetadata } from '@/lib/seo';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';
import { portfolio } from '@/data';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/ui/json-ld';
import { MdxContent } from '@/components/blog/mdx-content';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareLinks } from '@/components/blog/share-links';
import { PostCard } from '@/components/blog/post-card';
import { CallToAction } from '@/components/sections/cta';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: 'Article not found', noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(slug, 3);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          date: post.date,
          slug: post.slug,
          tags: post.tags,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />

      <article className="pt-32 sm:pt-36">
        <header className="container-page">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-subtle transition-colors hover:text-brand-accent"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> All articles
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="md">
              {post.category}
            </Badge>
            {post.featured ? <Badge variant="teal">Featured</Badge> : null}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
              <span>{portfolio.profile.name}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden /> {post.readingTime}
              </span>
              <span aria-hidden>·</span>
              <span>{post.wordCount} words</span>
            </div>
            <ShareLinks title={post.title} url={url} />
          </div>
        </header>

        <div className="container-page mt-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div className="min-w-0">
              <MdxContent source={post.content} />

              <ul className="mt-14 flex flex-wrap gap-1.5 border-t border-line pt-8">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline" size="md">
                      #{tag}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="container-page mt-28">
            <h2 className="font-display text-xl font-semibold text-ink">Related reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((entry) => (
                <PostCard key={entry.slug} post={entry} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-28">
          <CallToAction />
        </div>
      </article>
    </>
  );
}
