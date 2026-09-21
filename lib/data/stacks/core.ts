import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { FeaturedStack, FeaturedStackRanking, StackMetricsSummary, StackWithMetrics } from "./types";
import { CACHE_5MIN } from "./constants";
import { RETIRED_TOOL_SLUGS, isRetiredTool } from "@/lib/tools-db";
import { getStackById, stacks as curatedStacks } from "@/lib/stacks";
import type { ToolData } from "@/lib/tool-types";

/**
 * Retired tools are held back at *read* time rather than deleted from the
 * database (see RETIRED_TOOL_SLUGS in lib/tools-db.ts), so the `Tool` rows are
 * still joinable and every read path that turns one into something public has
 * to drop them itself — a new query added here without this filter puts a dead
 * vendor straight back in front of readers.
 *
 * Applied twice on purpose: in the Prisma `where` so the `take` below spends
 * its budget on tools we will actually publish, and again in
 * {@link mapStackTools} so the mapping is safe regardless of how the rows were
 * fetched.
 */
const EXCLUDE_RETIRED_TOOLS = {
  tool: { slug: { notIn: [...RETIRED_TOOL_SLUGS] } },
};

const STACK_TOOL_SELECT = {
  id: true,
  title: true,
  slug: true,
  category: true,
  pricing: true,
};

type StackToolRow = {
  tool: { id: string; title: string; slug: string; category: string; pricing: string };
};

function mapStackTools(stackTools: StackToolRow[]): StackWithMetrics["tools"] {
  return stackTools
    .filter((st) => st.tool && !isRetiredTool(st.tool.slug))
    .map((st) => ({
      id: st.tool.id,
      name: st.tool.title,
      slug: st.tool.slug,
      category: st.tool.category,
      pricing: st.tool.pricing,
    }));
}

/**
 * A stack is a combination, so one that has fewer than two publishable tools
 * left is not one any more and is dropped rather than shown as a list of one.
 * This is the same call lib/stacks.ts already made by hand: retiring Supermaven
 * left "The Efficiency Stack" (Supermaven + Cursor) with only Cursor, so it was
 * removed there and /stack/efficiency is 301'd in next.config.ts.
 */
const MIN_STACK_TOOLS = 2;

function hasEnoughTools(stack: StackWithMetrics): boolean {
  return stack.tools.length >= MIN_STACK_TOOLS;
}

/**
 * ---------------------------------------------------------------------------
 * Featured stacks: content from `lib/stacks.ts`, ranking from the database
 * ---------------------------------------------------------------------------
 *
 * The two stack sources have different jobs and neither may do the other's:
 *
 *   lib/stacks.ts   what a stack *is*  — name, blurb, price, tools, workflow.
 *                   Read by /stack/[stackId], the sitemap, /search, /favorites,
 *                   /compare/[slug] and the SEO link components.
 *   DB `Stack`      how a stack is *doing* — views, saves, ratings. Read for
 *                   metrics, testimonials and insights.
 *
 * This module used to select featured stacks by reading `name`, `description`,
 * `tools` and `workflow` straight off the `Stack` rows, which meant the
 * homepage and /stack/<id> rendered two different descriptions of the same
 * stack (the homepage advertised three tools for 10x-engineer; the page itself
 * showed two). The functions below fix that by splitting the job in half:
 * {@link getFeaturedStackRanking} returns *identifiers in metric order* and
 * nothing else, and {@link resolveFeaturedStacks} turns those identifiers back
 * into content using `lib/stacks.ts`. The homepage can therefore only ever show
 * what /stack/<id> shows.
 *
 * It also makes a 404 link structurally impossible. `Stack` rows exist that
 * have no counterpart in `lib/stacks.ts` (created through the old admin form
 * before stacks became code-only), and /stack/[stackId] sets
 * `dynamicParams = false`, so linking one of those ids from the homepage is a
 * hard 404. Resolution drops any id `lib/stacks.ts` does not know, and every
 * field of the returned card — including its `id` — comes from the resolved
 * curated stack, so the link target cannot be an id the route does not serve.
 * The stale rows are left alone in the database on purpose: metrics, view
 * counts and testimonials hang off them.
 */

/**
 * Order used before engagement data has anything to say — every
 * `popularityScore` is 0 until stack pages start being viewed, so without an
 * explicit order the "ranking" would be whatever the database felt like
 * returning. These four keep the featured slots they had when the fallback in
 * the previous implementation hardcoded them.
 */
const DEFAULT_FEATURED_ORDER = ["10x-engineer", "product-designer", "magic-wand", "power-pair"];

/**
 * Every curated stack is a featured candidate: the default four first, then the
 * rest in `lib/stacks.ts` order. Ranking over the full curated set rather than
 * over "stacks that happen to have a StackMetrics row" matters — metrics rows
 * are created lazily by incrementStackView(), so a query restricted to them
 * would have shrunk the homepage to a single card the first time one visitor
 * opened one stack page.
 */
const FEATURED_CANDIDATE_IDS: string[] = [
  ...DEFAULT_FEATURED_ORDER.filter((id) => curatedStacks.some((stack) => stack.id === id)),
  ...curatedStacks.map((stack) => stack.id).filter((id) => !DEFAULT_FEATURED_ORDER.includes(id)),
];

/**
 * The curated stack ids, ordered by popularity score (highest first), ties
 * broken by {@link FEATURED_CANDIDATE_IDS} order so the result is stable while
 * every score is still 0.
 *
 * Returns identifiers and metrics only — no copy. Feed the result to
 * {@link resolveFeaturedStacks}.
 */
export const getFeaturedStackRanking = unstable_cache(
  async (): Promise<FeaturedStackRanking[]> => {
    const metricsByStackId = new Map<string, StackMetricsSummary>();

    try {
      const rows = await prisma.stack.findMany({
        select: {
          idField: true,
          stackMetrics: {
            select: {
              views: true,
              saves: true,
              avgRating: true,
              reviewCount: true,
              popularityScore: true,
            },
          },
        },
      });

      for (const row of rows) {
        if (row.stackMetrics) metricsByStackId.set(row.idField, row.stackMetrics);
      }
    } catch (error) {
      // A metrics outage costs the ranking, not the section: every candidate
      // keeps a null metrics object and DEFAULT_FEATURED_ORDER decides.
      console.error("Failed to fetch stack metrics for the featured ranking:", error);
    }

    return FEATURED_CANDIDATE_IDS.map((id, index) => ({
      id,
      index,
      metrics: metricsByStackId.get(id) ?? null,
    }))
      .sort(
        (a, b) =>
          (b.metrics?.popularityScore ?? 0) - (a.metrics?.popularityScore ?? 0) || a.index - b.index
      )
      .map(({ id, metrics }) => ({ id, metrics }));
  },
  ["featured-stack-ranking"],
  { revalidate: CACHE_5MIN }
);

/**
 * Turns the ranking into renderable cards.
 *
 * Pure and synchronous: callers already hold both inputs, and keeping it out of
 * the cached function is what lets the tool directory stay live.
 *
 * @param ranking  from {@link getFeaturedStackRanking}.
 * @param allTools the live tool directory, i.e. `getTools()`. Tool *names* are
 *   resolved through it rather than stored anywhere, which means retired tools
 *   disappear from these cards for free: `getTools()` already excludes them, so
 *   an unresolvable slug is simply dropped.
 * @param limit    how many cards to return. Applied *after* filtering, so a
 *   stack that lost tools costs the section a card's worth of ranking rather
 *   than a card.
 */
export function resolveFeaturedStacks(
  ranking: FeaturedStackRanking[],
  allTools: Pick<ToolData, "slug" | "title">[],
  limit: number = 6
): FeaturedStack[] {
  const titleBySlug = new Map(allTools.map((tool) => [tool.slug, tool.title]));
  const featured: FeaturedStack[] = [];

  for (const entry of ranking) {
    if (featured.length >= limit) break;

    // The filter that makes a 404 link impossible: ids the curated file does
    // not define (DB-only rows) resolve to undefined and are skipped.
    const stack = getStackById(entry.id);
    if (!stack) continue;

    const tools = stack.tools
      .map((slug) => {
        const name = titleBySlug.get(slug);
        return name ? { slug, name } : null;
      })
      .filter((tool): tool is { slug: string; name: string } => tool !== null);

    if (tools.length < MIN_STACK_TOOLS) continue;

    featured.push({
      // Every field below comes from the curated stack, never from `entry`, so
      // the card and /stack/<id> cannot disagree.
      id: stack.id,
      name: stack.name,
      description: stack.description,
      totalPrice: stack.totalPrice,
      tags: stack.tags,
      icon: stack.icon,
      tools,
      metrics: entry.metrics,
      curator: stack.curatedBy
        ? { name: stack.curatedBy.name, role: stack.curatedBy.role }
        : null,
    });
  }

  return featured;
}

// Get popular stacks sorted by metrics
export const getPopularStacks = unstable_cache(
  async (limit: number = 10): Promise<StackWithMetrics[]> => {
    let stacks: any[] = [];
    try {
      stacks = await prisma.stack.findMany({
        take: limit,
        include: {
          stackTools: {
            where: EXCLUDE_RETIRED_TOOLS,
            include: {
              tool: {
                select: STACK_TOOL_SELECT,
              },
            },
            take: 5,
          },
          stackMetrics: true,
        },
        orderBy: {
          stackMetrics: {
            popularityScore: 'desc',
          },
        },
      });
    } catch (error) {
      console.error("Failed to fetch popular stacks from database:", error);
    }

    return stacks
      .map((stack) => ({
        id: stack.id,
        idField: stack.idField,
        name: stack.name,
        description: stack.description,
        longDescription: stack.longDescription,
        totalPrice: stack.totalPrice,
        tags: stack.tags,
        idealFor: stack.idealFor,
        workflow: stack.workflow,
        icon: stack.icon,
        color: stack.color,
        tools: mapStackTools(stack.stackTools),
        metrics: stack.stackMetrics ? {
          views: stack.stackMetrics.views,
          saves: stack.stackMetrics.saves,
          avgRating: stack.stackMetrics.avgRating,
          reviewCount: stack.stackMetrics.reviewCount,
          popularityScore: stack.stackMetrics.popularityScore,
        } : {
          views: 0,
          saves: 0,
          avgRating: 0,
          reviewCount: 0,
          popularityScore: 0,
        },
        curator: null,
      }))
      .filter(hasEnoughTools);
  },
  ["popular-stacks"],
  { revalidate: CACHE_5MIN }
);
