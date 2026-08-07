/* ============================================================================
 * !!! DO NOT RUN THIS TO "REFRESH" DESCRIPTIONS. !!!
 *
 * buildDescription() below generates filler copy of the form
 *   "<Title> is an ai <category> tool built for practical workflows.
 *    Core capabilities include A, B, C."
 * A previous run of this script wrote that filler into Tool.description for 9
 * tools and it shipped to production, where it became the <meta name=
 * "description"> on /tool/{slug} and the Overview lede on /compare/{slug}.
 * Cleaning that up took a manual copy pass — see
 * scripts/fix-placeholder-tool-descriptions.mjs.
 *
 * This file is kept only as a bootstrap for tools that have NO description at
 * all. Two guards were added so it can never clobber human-written copy again:
 *   1. Dry run is the default; writes require --apply.
 *   2. A row is skipped unless its current description is empty or is itself
 *      one of this script's placeholders.
 * Do not remove those guards. If you need better descriptions, write them by
 * hand.
 * ==========================================================================*/
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Matches copy previously emitted by buildDescription(). */
const PLACEHOLDER_PATTERN =
  /\bis an ai [a-z0-9 .+/-]+ tool built for practical workflows\./i;

/** True only for rows that are safe to overwrite: empty or already filler. */
function isSafeToOverwrite(description) {
  const current = (description || "").trim();
  if (current.length === 0) return true;
  return PLACEHOLDER_PATTERN.test(current);
}

function normalizeCategory(category) {
  if (!category) return "productivity";
  const trimmed = category.trim();
  if (/ai/i.test(trimmed)) return trimmed;
  return `AI ${trimmed}`;
}

function pickFeatures(features, max) {
  const clean = (features || [])
    .map((f) => (f || "").trim())
    .filter((f) => f.length > 0);
  const unique = [];
  for (const f of clean) {
    if (!unique.includes(f)) unique.push(f);
  }
  return unique.slice(0, max);
}

function buildDescription(tool) {
  const category = normalizeCategory(tool.category);
  const features = pickFeatures(tool.features, 3);
  const base = `${tool.title} is an ${category.toLowerCase()} tool built for practical workflows.`;
  if (features.length >= 2) {
    return `${base} Core capabilities include ${features.join(", ")}.`;
  }
  if (features.length === 1) {
    return `${base} Core capability: ${features[0]}.`;
  }
  return `${base} It focuses on getting results without unnecessary complexity.`;
}

async function main() {
  // Writes require an explicit --apply. Plain `node scripts/...` is a preview.
  const dryRun = !process.argv.includes("--apply");
  const tools = await prisma.tool.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      features: true,
      pricing: true,
      description: true,
    },
    orderBy: { title: "asc" },
  });

  // GUARD: never touch a tool that already has real, human-written copy.
  const protectedTools = tools.filter((tool) => !isSafeToOverwrite(tool.description));
  const updates = tools
    .filter((tool) => isSafeToOverwrite(tool.description))
    .map((tool) => ({
      id: tool.id,
      title: tool.title,
      prevDescription: tool.description,
      nextDescription: buildDescription(tool),
    }));

  console.log(
    `Protected ${protectedTools.length} tool(s) with human-written descriptions (untouched).`
  );

  if (dryRun) {
    console.log(`Dry run: ${updates.length} tool(s) eligible. Pass --apply to write.`);
    updates.slice(0, 10).forEach((u) => {
      console.log(`- ${u.title}`);
      console.log(`  before: ${u.prevDescription}`);
      console.log(`  after:  ${u.nextDescription}`);
    });
    return;
  }

  let updated = 0;
  for (const u of updates) {
    if (u.prevDescription === u.nextDescription) continue;
    await prisma.tool.update({
      where: { id: u.id },
      data: { description: u.nextDescription },
    });
    updated += 1;
  }

  console.log(`Updated ${updated} tool descriptions.`);
}

main()
  .catch((error) => {
    console.error("Failed to rewrite tool descriptions:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
