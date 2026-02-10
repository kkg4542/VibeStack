import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  const dryRun = process.argv.includes("--dry-run");
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

  const updates = tools.map((tool) => ({
    id: tool.id,
    title: tool.title,
    prevDescription: tool.description,
    nextDescription: buildDescription(tool),
  }));

  if (dryRun) {
    console.log(`Dry run: ${updates.length} tools`);
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
