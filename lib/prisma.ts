import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** True while `next build` is prerendering (set by Next.js in the build workers). */
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

/**
 * Build-phase connection settings.
 *
 * Runtime (Vercel serverless) keeps `connection_limit=1` from DATABASE_URL:
 * every lambda instance is its own client, so one connection each is what keeps
 * the Supabase pooler from being exhausted.
 *
 * `next build` is the opposite shape — a handful of long-lived worker processes
 * prerendering ~190 routes concurrently. A pool of 1 per worker means
 * concurrent renders queue behind a single connection and lose with Prisma
 * P2024. The read is already memoized per worker (lib/tools-db.ts), so this is
 * headroom rather than the fix: a small bump plus a longer queue timeout so a
 * burst waits instead of failing. Deliberately modest — DATABASE_URL points at
 * Supabase's transaction pooler (pgbouncer, port 6543), which multiplexes many
 * client connections onto a small server-side pool, but that server-side pool
 * is still finite on the lower tiers.
 */
const BUILD_CONNECTION_LIMIT = 5;
const BUILD_POOL_TIMEOUT_SECONDS = 30;

function withBuildPoolSettings(rawUrl: string): string {
  if (!rawUrl || !isBuildPhase) return rawUrl;
  try {
    const parsed = new URL(rawUrl);
    parsed.searchParams.set('connection_limit', String(BUILD_CONNECTION_LIMIT));
    parsed.searchParams.set('pool_timeout', String(BUILD_POOL_TIMEOUT_SECONDS));
    return parsed.toString();
  } catch {
    // Unparseable URL — leave it alone and let Prisma report the real problem.
    return rawUrl;
  }
}

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL || '';
  if (url && !url.includes('pgbouncer=')) {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}pgbouncer=true`;
  }
  url = withBuildPoolSettings(url);

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
    datasources: {
      db: {
        url,
      },
    },
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Always pin the client on globalThis, not just in development. Next.js compiles
// each route into its own server bundle, so this module can be evaluated several
// times inside one process — without a process-wide singleton that means several
// PrismaClients, each with its own pool, all competing for the same database.
// (In dev this also survives hot reload; in serverless `globalThis` is per
// instance, so behaviour there is unchanged.)
globalForPrisma.prisma = prisma;

// Note: Graceful shutdown handlers (SIGINT, SIGTERM, beforeExit) are
// intentionally omitted — they don't work in Edge Runtime or serverless
// environments (Vercel), and can accumulate during development hot reload.
// Prisma Client manages connection pool cleanup automatically.
