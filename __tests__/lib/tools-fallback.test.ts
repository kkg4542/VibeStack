import { describe, it, expect, vi } from "vitest";

// tools-db.ts imports the Prisma client and next/cache at module scope. The
// value under test here is the plain export (RETIRED_TOOL_SLUGS), so both
// are stubbed out rather than exercised, matching featured-stacks.test.ts.
vi.mock("@/lib/prisma", () => ({ prisma: {} }));
vi.mock("next/cache", () => ({
  unstable_cache: (fn: unknown) => fn,
}));

import { tools } from "@/lib/tools";
import { stacks } from "@/lib/stacks";
import { RETIRED_TOOL_SLUGS } from "@/lib/tools-db";

const fallbackSlugs = new Set(tools.map((tool) => tool.slug));

describe("lib/tools.ts fallback array", () => {
  it("has an entry for every slug a curated stack references", () => {
    // getTools() falls back to this array during a DB outage. Any slug a
    // stack references but this array lacks would render as a missing tool
    // on /stack/[stackId] the moment the database goes down.
    const referencedSlugs = new Set(stacks.flatMap((stack) => stack.tools));

    for (const slug of referencedSlugs) {
      expect(fallbackSlugs.has(slug)).toBe(true);
    }
  });

  it("resolves every curated stack to its full tool count against the fallback array", () => {
    // The real invariant: it's not enough for each slug to exist somewhere in
    // the fallback array — every stack must resolve to the *same number* of
    // tools it declares, or a stack silently degrades (e.g. a two-tool stack
    // rendering as a one-tool "stack") when the fallback is the data source.
    for (const stack of stacks) {
      const resolvedCount = stack.tools.filter((slug) => fallbackSlugs.has(slug)).length;
      expect(resolvedCount, `stack "${stack.id}" lost tools when resolved against lib/tools.ts`).toBe(
        stack.tools.length
      );
    }
  });

  it("never includes a retired tool", () => {
    // A retired tool reaching the fallback would resurrect a dead product
    // (e.g. a discontinued or acquired tool) during a database outage.
    for (const slug of fallbackSlugs) {
      expect(RETIRED_TOOL_SLUGS.has(slug)).toBe(false);
    }
  });
});
