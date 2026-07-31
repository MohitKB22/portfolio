import { portfolio } from '@/data';

export const siteConfig = {
  name: portfolio.seo.siteName,
  title: portfolio.seo.defaultTitle,
  titleTemplate: portfolio.seo.titleTemplate,
  description: portfolio.seo.description,
  keywords: portfolio.seo.keywords,
  locale: portfolio.seo.locale,
  twitter: portfolio.seo.twitterHandle,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohitbarse.vercel.app').replace(/\/$/, ''),
  author: {
    name: portfolio.profile.name,
    email: portfolio.profile.email,
    github: 'https://github.com/MohitKB22',
    linkedin: 'https://www.linkedin.com/in/mohit-b-9a997b301/',
    leetcode: 'https://leetcode.com/u/Mohit_Barse/',
  },
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? '',
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  },
} as const;

export const isEmailJsConfigured =
  Boolean(siteConfig.emailjs.serviceId) &&
  Boolean(siteConfig.emailjs.templateId) &&
  Boolean(siteConfig.emailjs.publicKey);
