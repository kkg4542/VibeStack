/**
 * One-off cleanup:
 *  1) Fix the fabricated title "Gemini 3 Pro" → "Gemini Code Assist"
 *     (slug gemini-code-assist is Google's real product).
 *  2) Remove legacy duplicate tools, re-pointing their stack relations to the
 *     canonical slug first (handling the StackTool unique constraint).
 *
 * Run with the real Supabase creds (inline or via a correct .env):
 *   npx tsx scripts/cleanup-tools.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// legacy slug → canonical slug
const DUPLICATES: Record<string, string> = {
  devin: "devin-ai",
  windsurf: "windsurf-ide",
  "replit-ai": "replit",
  v0: "v0-by-vercel",
};

async function main() {
  // 1) Fix fabricated Gemini name
  const gemini = await prisma.tool.findUnique({ where: { slug: "gemini-code-assist" } });
  if (gemini && gemini.title !== "Gemini Code Assist") {
    await prisma.tool.update({
      where: { slug: "gemini-code-assist" },
      data: { title: "Gemini Code Assist" },
    });
    console.log(`✏️  Renamed "${gemini.title}" → "Gemini Code Assist"`);
  }

  // 2) Merge & delete duplicates
  for (const [legacySlug, canonicalSlug] of Object.entries(DUPLICATES)) {
    const legacy = await prisma.tool.findUnique({ where: { slug: legacySlug } });
    const canonical = await prisma.tool.findUnique({ where: { slug: canonicalSlug } });

    if (!legacy) {
      console.log(`• ${legacySlug}: already gone, skipping`);
      continue;
    }
    if (!canonical) {
      console.log(`⚠️  ${legacySlug}: canonical ${canonicalSlug} not found — skipping (won't orphan)`);
      continue;
    }

    // Re-point stack relations, respecting the (stackId, toolId) unique constraint.
    const links = await prisma.stackTool.findMany({ where: { toolId: legacy.id } });
    for (const link of links) {
      const clash = await prisma.stackTool.findFirst({
        where: { stackId: link.stackId, toolId: canonical.id },
      });
      if (clash) {
        // Canonical already in this stack → drop the duplicate link.
        await prisma.stackTool.delete({ where: { id: link.id } });
      } else {
        await prisma.stackTool.update({
          where: { id: link.id },
          data: { toolId: canonical.id },
        });
      }
    }

    // Carry over an affiliate link only if the canonical has none and the
    // legacy one looks like a real tracking link (not just the bare site).
    if (!canonical.affiliateUrl && legacy.affiliateUrl && legacy.affiliateUrl !== canonical.websiteUrl) {
      await prisma.tool.update({
        where: { id: canonical.id },
        data: { affiliateUrl: legacy.affiliateUrl },
      });
      console.log(`   ↳ migrated affiliateUrl to ${canonicalSlug}`);
    }

    await prisma.tool.delete({ where: { id: legacy.id } });
    console.log(`🗑️  Deleted duplicate "${legacy.title}" (${legacySlug}) → kept ${canonicalSlug} (re-pointed ${links.length} stack link(s))`);
  }

  const remaining = await prisma.tool.count();
  console.log(`\n✅ Done. Tools remaining: ${remaining}`);
}

main()
  .catch((e) => {
    console.error("❌ Failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
