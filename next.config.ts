import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isLocalCheck = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_APP_URL?.includes('localhost');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isLocalCheck,
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  // Environment variables that need to be exposed to the browser should be prefixed with NEXT_PUBLIC_
  // DATABASE_URL should NOT be exposed to the client - it's server-side only

  // Resolve lockfile warning
  outputFileTracingRoot: __dirname,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "connect-src 'self' https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.ingest.sentry.io https://sentry.io",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              "media-src 'self'",
              "child-src 'self'",
              !isLocalCheck ? "upgrade-insecure-requests" : ""
            ].filter(Boolean).join('; ')
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          ...(!isLocalCheck ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }] : []),
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), microphone=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
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
  sourcemaps: {
    disable: !hasSentryToken,
  },
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

const configWithPWA = withAnalyzer(withPWA(nextConfig));

export default hasSentryToken
  ? withSentryConfig(configWithPWA, sentryConfig)
  : configWithPWA;
