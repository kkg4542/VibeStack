/**
 * One-off: set a tool's affiliateUrl.
 *
 * Usage (pass DB creds inline so it hits Supabase, not the .env localhost):
 *
 *   DATABASE_URL="postgresql://postgres.gvecbfigfftjznmzmjvt:PW@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1" \
 *   DIRECT_URL="postgresql://postgres.gvecbfigfftjznmzmjvt:PW@aws-1-us-east-1.pooler.supabase.com:5432/postgres" \
 *   npx tsx scripts/set-affiliate.ts <slug> <affiliateUrl>
 *
 * Example:
 *   ... npx tsx scripts/set-affiliate.ts elevenlabs https://try.elevenlabs.io/quo7piadqh49
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [slug, affiliateUrl] = process.argv.slice(2);

  if (!slug || !affiliateUrl) {
    console.error("Usage: npx tsx scripts/set-affiliate.ts <slug> <affiliateUrl>");
    process.exit(1);
  }

  const updated = await prisma.tool.update({
    where: { slug },
    data: { affiliateUrl },
  });

  console.log(`✅ ${updated.title} (${updated.slug})`);
  console.log(`   affiliateUrl → ${updated.affiliateUrl}`);
}

main()
  .catch((e) => {
    console.error("❌ Failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
