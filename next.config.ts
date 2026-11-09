import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isLocalCheck = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_APP_URL?.includes('localhost');
// Next.js dev (webpack) evaluates modules via eval(); without 'unsafe-eval' the client
// bundle is blocked by CSP and the app never hydrates. Production builds never need it.
const isDev = process.env.NODE_ENV === 'development';

// next-pwa: use dynamic require wrapped for ESM compatibility
// TODO: Migrate to @serwist/next for full ESM support
let withPWA: (config: NextConfig) => NextConfig;
try {
  withPWA = require('next-pwa')({
    dest: 'public',
    disable: isLocalCheck,
    register: true,
    skipWaiting: true,
  });
} catch {
  withPWA = (config: NextConfig) => config;
}

const nextConfig: NextConfig = {
  // Hide technology stack from attackers
  poweredByHeader: false,
  // Environment variables that need to be exposed to the browser should be prefixed with NEXT_PUBLIC_
  // DATABASE_URL should NOT be exposed to the client - it's server-side only

  // Resolve lockfile warning
  outputFileTracingRoot: __dirname,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'radix-ui', 'sonner', 'zod'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.vibestack.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // Superseded by the programmatic /best/[category] template
      {
        source: '/best-ai-coding-tools-2025',
        destination: '/best/coding',
        permanent: true,
      },
      // Consolidated duplicate blog posts (Aug 2026). The content was merged into
      // the canonical posts below; /blog/[slug] uses dynamicParams: false, so these
      // URLs would hard-404 without these redirects.
      {
        source: '/blog/zk-ai-enterprise-adoption',
        destination: '/blog/zero-knowledge-ai',
        permanent: true,
      },
      {
        source: '/blog/local-ai-on-device-future',
        destination: '/blog/local-llm-llama4',
        permanent: true,
      },
      // Galileo AI was acquired by Google and folded into Stitch (usegalileo.ai
      // now redirects to stitch.withgoogle.com), so it was retired from the
      // directory (see RETIRED_TOOL_SLUGS in lib/tools-db.ts). /tool/[slug] and
      // /compare/[slug] both use dynamicParams: false, so these already-indexed
      // URLs would hard-404 without these redirects.
      {
        source: '/tool/galileo-ai',
        destination: '/best/design',
        permanent: true,
      },
      {
        source: '/compare/midjourney-vs-galileo-ai',
        destination: '/tool/midjourney',
        permanent: true,
      },
      // Sora is being discontinued (openai.com/sora now redirects to OpenAI's
      // help center article on the shutdown: web/app end 2026-04-26, API ends
      // 2026-09-24). Windsurf was rebranded Devin Desktop after Cognition's
      // acquisition (codeium.com/windsurf and windsurf.com both land on
      // devin.ai/desktop). Supermaven was acquired by Anysphere and folded into
      // Cursor Tab (vendor blog: "Sunsetting Supermaven", 2025-11-21). All three
      // are retired from the directory (see RETIRED_TOOL_SLUGS in
      // lib/tools-db.ts); /tool/[slug] and /compare/[slug] both use
      // dynamicParams: false, so these already-indexed URLs would hard-404
      // without these redirects.
      {
        source: '/tool/openai-sora',
        destination: '/best/design',
        permanent: true,
      },
      {
        source: '/tool/windsurf-ide',
        destination: '/tool/devin-ai',
        permanent: true,
      },
      {
        source: '/tool/supermaven',
        destination: '/tool/cursor',
        permanent: true,
      },
      {
        source: '/compare/cursor-vs-windsurf-ide',
        destination: '/tool/cursor',
        permanent: true,
      },
      {
        source: '/compare/github-copilot-vs-windsurf-ide',
        destination: '/tool/github-copilot',
        permanent: true,
      },
      {
        source: '/compare/bolt-new-vs-windsurf-ide',
        destination: '/tool/bolt-new',
        permanent: true,
      },
      {
        source: '/compare/cursor-vs-supermaven',
        destination: '/tool/cursor',
        permanent: true,
      },
      {
        source: '/compare/github-copilot-vs-supermaven',
        destination: '/tool/github-copilot',
        permanent: true,
      },
      {
        source: '/compare/midjourney-vs-openai-sora',
        destination: '/tool/midjourney',
        permanent: true,
      },
      // The Efficiency Stack was Supermaven + Cursor. Retiring Supermaven left
      // it a one-tool "stack", so it was dropped from lib/stacks.ts rather than
      // published as a list of one. /stack/[stackId] uses dynamicParams: false
      // and /stack/efficiency was in the sitemap, so it needs a redirect for the
      // same reason the tool and compare URLs above do.
      //
      // It points at /best/coding rather than another stack. What defined the
      // Efficiency Stack was "fast and free", and no surviving stack carries
      // that: Power Pair was the nearest shape, but Gemini Code Assist retired
      // its free individual tier on 2026-06-18, and the Learner Stack is free
      // but framed for beginners. /best/coding answers the actual question —
      // which coding tools cost nothing — and names the ones that still do.
      {
        source: '/stack/efficiency',
        destination: '/best/coding',
        permanent: true,
      },
    ];
  },
  async headers() {
    // Shared security headers applied to all routes
    const securityHeaders = [
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-ancestors 'self'",
          "form-action 'self' https://checkout.stripe.com",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com`,
          // GA4 does not post to www.google-analytics.com. Observed in a clean
          // browser on production: every /g/collect beacon went to
          // analytics.google.com (and, for Google Signals, www.google.com and
          // stats.g.doubleclick.net), all refused by this directive, so not a
          // single page_view was recorded. The wildcard also covers the
          // regional endpoints (region1.google-analytics.com and friends).
          //
          // The Signals/ads hosts are left out on purpose. They carry
          // advertising and cross-site remarketing traffic, not the analytics
          // this site actually reads, so blocking them costs us nothing and
          // keeps the policy narrow. If GA4 reports are ever missing
          // demographics data, that is why — widen this deliberately, not by
          // pasting in whatever the console complains about.
          "connect-src 'self' https://api.stripe.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.ingest.sentry.io https://sentry.io",
          "frame-src https://js.stripe.com https://hooks.stripe.com",
          "worker-src 'self' blob:",
          "manifest-src 'self'",
          "media-src 'self'",
          "child-src 'self'",
          !isLocalCheck ? "upgrade-insecure-requests" : ""
        ].filter(Boolean).join('; ')
      },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ...(!isLocalCheck ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : []),
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      // COEP set to 'credentialless' to allow external resources (Google Fonts, Unsplash)
      { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
    ];

    return [
      // Static assets: immutable long-term cache
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Optimized images: cache with revalidation
      {
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // API routes: no caching + security headers
      {
        source: '/api/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      // All other routes: short cache with security headers
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      // Non-page assets: keep them out of Google's index.
      // These are crawled but can never be indexed as pages, so they linger forever in
      // Search Console's "Crawled - currently not indexed" report. X-Robots-Tag: noindex
      // tells Google to drop them. Social crawlers (X/Facebook/LinkedIn/Slack) ignore
      // X-Robots-Tag and still fetch the image, so OG cards are unaffected.
      // NOTE: Next.js applies *every* matching headers() rule, so these are additive on
      // top of the security + cache headers above (no key collisions).
      ...['/opengraph-image', '/tool/:slug/opengraph-image', '/blog/:slug/opengraph-image', '/stack/:stackId/opengraph-image', '/favicon.ico', '/manifest.json'].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      })),
    ];
  },
};

const hasSentryToken = !!process.env.SENTRY_AUTH_TOKEN;

const sentryConfig = {
  org: "vibestack",
  project: "vibestack-web",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  // Reduce trace sampling in production to control Sentry costs
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  sourcemaps: {
    disable: !hasSentryToken,
  },
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

const configWithPWA = withAnalyzer(withPWA(nextConfig));

export default hasSentryToken
  ? withSentryConfig(configWithPWA, sentryConfig)
  : configWithPWA;
