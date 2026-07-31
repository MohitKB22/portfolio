import type { Metadata } from 'next';
import { siteConfig } from './site';

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  tags,
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`;
  const resolvedTitle = title ? siteConfig.titleTemplate.replace('%s', title) : siteConfig.title;
  const ogImage =
    image ??
    `/api/og?title=${encodeURIComponent(title ?? 'AI/ML Engineer')}&subtitle=${encodeURIComponent(
      description.slice(0, 120),
    )}`;

  return {
    title: title ?? siteConfig.title,
    description,
    keywords: [...siteConfig.keywords, ...(tags ?? [])],
    alternates: { canonical: url, types: { 'application/rss+xml': `${siteConfig.url}/rss.xml` } },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      creator: siteConfig.twitter,
      images: [ogImage],
    },
  };
}
