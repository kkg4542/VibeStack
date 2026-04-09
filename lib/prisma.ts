import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL || '';
  if (url && !url.includes('pgbouncer=')) {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}pgbouncer=true`;
  }

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

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Note: Graceful shutdown handlers (SIGINT, SIGTERM, beforeExit) are
// intentionally omitted — they don't work in Edge Runtime or serverless
// environments (Vercel), and can accumulate during development hot reload.
// Prisma Client manages connection pool cleanup automatically.
