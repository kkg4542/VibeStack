// Facts about a stack that can be derived from real tool data. The /build page
// used to show hand-typed price ranges ("$0-30/mo", "$40+/mo") that nothing in
// the data backed up; this only reports what each tool's own `pricing` field
// says ("Free" | "Freemium" | "Paid" | "Enterprise").

interface ToolWithPricing {
  slug: string;
  pricing?: string | null;
}

/**
 * How many of the stack's tools offer a free plan (pricing "Free" or
 * "Freemium"). Returns null until every slug resolves to a loaded tool, so a
 * partial load never shows a misleading count.
 */
export function countToolsWithFreePlan(
  slugs: readonly string[],
  tools: readonly ToolWithPricing[]
): number | null {
  if (slugs.length === 0) return null;
  let free = 0;
  for (const slug of slugs) {
    const tool = tools.find((t) => t.slug === slug);
    if (!tool || !tool.pricing) return null;
    const pricing = tool.pricing.toLowerCase();
    if (pricing === "free" || pricing === "freemium") free += 1;
  }
  return free;
}

/** "All have a free plan" / "1 with a free plan" / "No free plan". */
export function freePlanLabel(freeCount: number, total: number): string {
  if (freeCount === 0) return "No free plan";
  if (freeCount === total) return total === 1 ? "Has a free plan" : "All have a free plan";
  return `${freeCount} of ${total} with a free plan`;
}
