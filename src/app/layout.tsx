import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import { portfolio } from '@/data';
import { siteConfig } from '@/lib/site';
import { personJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Backdrop } from '@/components/ui/backdrop';
import { JsonLd } from '@/components/ui/json-ld';
import { ScrollProgress } from '@/components/motion/scroll-progress';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: siteConfig.titleTemplate },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: portfolio.profile.name, url: siteConfig.url }],
  creator: portfolio.profile.name,
  publisher: portfolio.profile.name,
  applicationName: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${siteConfig.url}/rss.xml` },
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [{ url: '/api/og', width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f8fd' },
    { media: '(prefers-color-scheme: dark)', color: '#050a14' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Applies a saved theme before first paint, so a reload never flashes
          the wrong palette. Light is the default for everyone; only an explicit
          choice via the navbar toggle switches to dark. The OS setting is
          deliberately not consulted — "default to light" should mean light even
          on a machine configured for dark mode.

          `suppressHydrationWarning` on <html> is required and intentional: this
          script mutates the element's class list before React hydrates, so the
          server markup and the client DOM differ by exactly that attribute. The
          suppression applies only to this element's own attributes.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-svh antialiased">
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Backdrop />

        <Providers>
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
