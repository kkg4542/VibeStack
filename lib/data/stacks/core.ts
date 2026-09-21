import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { StackWithMetrics } from "./types";
import { CACHE_5MIN } from "./constants";
import { RETIRED_TOOL_SLUGS, isRetiredTool } from "@/lib/tools-db";

/**
 * Retired tools are held back at *read* time rather than deleted from the
 * database (see RETIRED_TOOL_SLUGS in lib/tools-db.ts), so the `Tool` rows are
 * still joinable and every read path that turns one into something public has
 * to drop them itself — a new query added here without this filter puts a dead
 * vendor straight back on the homepage.
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
 * A stack is a combination, so a row that has fewer than two publishable tools
 * left is not one any more and is dropped rather than shown as a list of one.
 * This is the same call lib/stacks.ts already made by hand: retiring Supermaven
 * left "The Efficiency Stack" (Supermaven + Cursor) with only Cursor, so it was
 * removed there and /stack/efficiency is 301'd in next.config.ts. Dropping it
 * here too keeps the DB-backed homepage from linking to a stack page that no
 * longer exists.
 *
 * Note this runs after the query's `take`, so a filtered list can come back
 * shorter than the requested limit. That is the right trade: padding would mean
 * over-fetching on every call to cover a case that currently affects one row.
 */
const MIN_STACK_TOOLS = 2;

function hasEnoughTools(stack: StackWithMetrics): boolean {
  return stack.tools.length >= MIN_STACK_TOOLS;
}

// Get featured stacks with metrics
export const getFeaturedStacks = unstable_cache(
  async (limit: number = 6): Promise<StackWithMetrics[]> => {
    // Get featured stacks with highest popularity scores
    let stacks: any[] = [];
    try {
      stacks = await prisma.stack.findMany({
        where: {
          // Use stacks that have metrics data
          stackMetrics: {
            isNot: null,
          },
        },
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
        take: limit,
        orderBy: {
          stackMetrics: {
            popularityScore: 'desc',
          },
        },
      });
    } catch (error) {
      console.error("Failed to fetch featured stacks from database:", error);
    }

    // If no stacks with metrics exist, fall back to id-based selection
    if (stacks.length === 0) {
      let fallbackStacks: any[] = [];
      try {
        fallbackStacks = await prisma.stack.findMany({
          where: {
            idField: {
              // Fallback featured set used only when no stack has metrics
              // yet. power-pair is included so it gets the same homepage
              // inbound link magic-wand and product-designer already get.
              in: ["10x-engineer", "product-designer", "magic-wand", "power-pair"],
            },
          },
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
          },
          take: limit,
        });
      } catch (error) {
        console.error("Failed to fetch fallback stacks from database:", error);
      }

      return fallbackStacks
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
          // No fabricated engagement — the card hides metrics when null.
          metrics: null,
          curator: null,
        }))
        .filter(hasEnoughTools);
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
        } : null,
        curator: null,
      }))
      .filter(hasEnoughTools);
  },
  ["featured-stacks"],
  { revalidate: CACHE_5MIN }
);

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
