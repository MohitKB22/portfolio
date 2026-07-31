import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  images: {
    formats: ['image/avif', 'image/webp'],
    // The UI ships no remote images — the identity mark and project previews are
    // drawn in CSS. Kept for anyone who adds screenshots under public/images.
    remotePatterns: [{ protocol: 'https', hostname: 'raw.githubusercontent.com' }],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [{ source: '/cv', destination: '/Mohit_Barse_Resume.pdf', permanent: false }];
  },
};

export default nextConfig;
