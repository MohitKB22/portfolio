import { portfolio, projects } from '@/data';
import { siteConfig } from './site';

const { profile } = portfolio;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.title,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    image: `${siteConfig.url}${profile.avatar}`,
    url: siteConfig.url,
    sameAs: portfolio.social.filter((s) => s.icon !== 'mail').map((s) => s.url),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nagpur',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    knowsLanguage: profile.languages,
    knowsAbout: portfolio.skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
    alumniOf: portfolio.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
      address: e.location,
    })),
    hasCredential: portfolio.certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      url: c.url,
    })),
    worksFor: portfolio.experience
      .filter((e) => e.current)
      .map((e) => ({ '@type': 'Organization', name: e.company })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en',
    author: { '@type': 'Person', name: profile.name, url: siteConfig.url },
  };
}

export function projectsCollectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects',
    url: `${siteConfig.url}/projects`,
    hasPart: projects.map((p) => ({
      '@type': 'SoftwareSourceCode',
      name: p.title,
      description: p.tagline,
      codeRepository: p.github,
      programmingLanguage: p.stack[0] ?? 'Python',
      url: `${siteConfig.url}/projects/${p.slug}`,
    })),
  };
}

export function projectJsonLd(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    codeRepository: project.github,
    programmingLanguage: project.stack,
    author: { '@type': 'Person', name: profile.name, url: siteConfig.url },
    url: `${siteConfig.url}/projects/${project.slug}`,
    dateCreated: project.year,
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: profile.name, url: siteConfig.url },
    publisher: { '@type': 'Person', name: profile.name, url: siteConfig.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
    url: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}
