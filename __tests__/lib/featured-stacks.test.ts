import { describe, it, expect, vi } from "vitest";

// core.ts imports the Prisma client and next/cache at module scope. The
// function under test is pure, so both are stubbed out rather than exercised.
vi.mock("@/lib/prisma", () => ({ prisma: {} }));
vi.mock("next/cache", () => ({
  unstable_cache: (fn: unknown) => fn,
}));

import { resolveFeaturedStacks } from "@/lib/data/stacks/core";
import type { FeaturedStackRanking } from "@/lib/data/stacks/types";
import { stacks } from "@/lib/stacks";

const CURATED_IDS = stacks.map((stack) => stack.id);

/**
 * Stand-in for getTools(): slug + title is all the resolver reads. Built from
 * the curated stacks themselves rather than from lib/tools.ts, which is only
 * the offline fallback array — coupling this fixture to it would let a stack
 * added here mask a gap in that array instead of exercising the resolver
 * against a source guaranteed to cover every referenced slug.
 */
const allTools = [...new Set(stacks.flatMap((stack) => stack.tools))].map((slug) => ({
  slug,
  title: slug,
}));

function ranking(ids: string[]): FeaturedStackRanking[] {
  return ids.map((id) => ({ id, metrics: null }));
}

describe("resolveFeaturedStacks", () => {
  it("only ever returns ids that lib/stacks.ts defines", () => {
    // /stack/[stackId] sets dynamicParams = false, so anything outside
    // lib/stacks.ts is a hard 404 when linked. These four are real rows in the
    // Stack table with no curated counterpart.
    const dbOnlyIds = [
      "efficiency",
      "indie-builder-stack",
      "product-team-stack",
      "research-writing-stack",
    ];

    const resolved = resolveFeaturedStacks(ranking([...dbOnlyIds, ...CURATED_IDS]), allTools, 6);

    expect(resolved.length).toBeGreaterThan(0);
    for (const stack of resolved) {
      expect(CURATED_IDS).toContain(stack.id);
    }
  });

  it("drops every unknown id, however many there are", () => {
    expect(resolveFeaturedStacks(ranking(["nope", "also-nope"]), allTools, 6)).toEqual([]);
  });

  it("renders the same content /stack/<id> renders", () => {
    const resolved = resolveFeaturedStacks(ranking(CURATED_IDS), allTools, CURATED_IDS.length);

    for (const card of resolved) {
      const curated = stacks.find((stack) => stack.id === card.id)!;
      expect(card.name).toBe(curated.name);
      expect(card.description).toBe(curated.description);
      expect(card.totalPrice).toBe(curated.totalPrice);
      expect(card.icon).toBe(curated.icon);
      expect(card.tools.map((tool) => tool.slug)).toEqual(curated.tools);
    }

    // Nothing was silently dropped: every curated stack made it onto a card.
    expect(resolved.map((card) => card.id)).toEqual(CURATED_IDS);
  });

  it("drops tools that are not in the live directory", () => {
    // getTools() already excludes retired tools, so an unresolvable slug is how
    // a retired tool reaches this function.
    const withoutLinear = allTools.filter((tool) => tool.slug !== "linear");
    const resolved = resolveFeaturedStacks(ranking(["10x-engineer"]), withoutLinear, 6);

    // 10x-engineer is devin-ai + linear; losing one leaves a single tool, which
    // is not a stack any more.
    expect(resolved).toEqual([]);
  });

  it("honours the limit and preserves the ranking order", () => {
    const resolved = resolveFeaturedStacks(ranking(["power-pair", "magic-wand", "learner"]), allTools, 2);
    expect(resolved.map((stack) => stack.id)).toEqual(["power-pair", "magic-wand"]);
  });
});
