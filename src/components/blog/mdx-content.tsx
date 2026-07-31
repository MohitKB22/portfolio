import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import { mdxOptions } from '@/lib/mdx';

const components: MDXComponents = {
  a: ({ href = '', children, ...props }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    );
  },
};

/** Server-rendered MDX with syntax highlighting, GFM and heading anchors. */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-portfolio">
      <MDXRemote source={source} components={components} options={mdxOptions} />
    </div>
  );
}
