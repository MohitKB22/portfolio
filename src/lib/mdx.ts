import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const mdxOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark-default',
          keepBackground: false,
          defaultLang: { block: 'text', inline: 'text' },
        },
      ],
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
    ],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

/** Extracts `##`/`###` headings from raw MDX for the table of contents. */
export function extractHeadings(source: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  let inFence = false;

  for (const line of source.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match?.[1] || !match[2]) continue;

    const text = match[2].replace(/[*_`]/g, '').trim();
    headings.push({
      level: match[1].length,
      text,
      id: text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-'),
    });
  }
  return headings;
}
