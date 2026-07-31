import { getAllPosts, getCategories } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { PageHeader } from '@/components/layout/page-header';
import { BlogIndex } from '@/components/blog/blog-index';
import { CallToAction } from '@/components/sections/cta';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata = buildMetadata({
  title: 'Blog',
  path: '/blog',
  description:
    'Long-form writing on RAG architecture, LLM evaluation, AI guardrails, multi-agent systems and the parts of production machine learning that are not machine learning.',
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Blog', href: '/blog' }])} />

      <PageHeader
        eyebrow="Writing"
        title="Notes from"
        accent="building AI systems"
        description={`${posts.length} long-form articles on the architecture decisions that decide whether an AI feature survives production.`}
        breadcrumbs={[{ name: 'Blog', href: '/blog' }]}
      />

      <div className="flex flex-col gap-28 pt-12 pb-8 sm:gap-32">
        <section className="container-page">
          <BlogIndex posts={posts} categories={categories} />
        </section>
        <CallToAction />
      </div>
    </>
  );
}
