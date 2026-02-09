import { prisma } from "@/lib/prisma";
import type { Submission, Tool } from "@prisma/client";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Update signature to accept optional transaction client
export async function createToolFromSubmission(
  submission: Submission,
  tx?: any // Using any to avoid complex type matching, or import Prisma.TransactionClient
): Promise<Tool> {
  const db = tx || prisma;

  const existingByUrl = await db.tool.findFirst({
    where: { websiteUrl: submission.websiteUrl },
  });
  if (existingByUrl) return existingByUrl;

  const baseSlug = slugify(submission.toolName);
  let slug = baseSlug || `tool-${submission.id.slice(0, 6)}`;
  let suffix = 2;

  // Note: db should have findUnique
  while (await db.tool.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const isFeatured = submission.tier === "premium";

  return db.tool.create({
    data: {
      slug,
      title: submission.toolName,
      description: submission.description,
      category: submission.category,
      pricing: submission.pricing,
      websiteUrl: submission.websiteUrl,
      features: [],
      pros: [],
      cons: [],
      tier: submission.tier,
      isFeatured,
      // Default values required by schema if not optional
      bgGradient: "from-transparent to-transparent",
      color: "text-foreground",
    },
  });
}
