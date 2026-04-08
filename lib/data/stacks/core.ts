import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { StackWithMetrics } from "./types";
import { CACHE_5MIN } from "./constants";

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
            include: {
              tool: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  category: true,
                  pricing: true,
                },
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
              in: ["10x-engineer", "product-designer", "magic-wand"],
            },
          },
          include: {
            stackTools: {
              include: {
                tool: {
                  select: {
                    id: true,
                    title: true,
                    slug: true,
                    category: true,
                    pricing: true,
                  },
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

      return fallbackStacks.map((stack) => ({
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
        tools: stack.stackTools.map((st: { tool: { id: string; title: string; slug: string; category: string; pricing: string } }) => ({
          id: st.tool.id,
          name: st.tool.title,
          slug: st.tool.slug,
          category: st.tool.category,
          pricing: st.tool.pricing,
        })),
        metrics: {
          views: 1200,
          saves: 45,
          avgRating: 4.5,
          reviewCount: 23,
          popularityScore: 85,
        },
        curator: null,
      }));
    }

    return stacks.map((stack) => ({
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
      tools: stack.stackTools.map((st: { tool: { id: string; title: string; slug: string; category: string; pricing: string } }) => ({
        id: st.tool.id,
        name: st.tool.title,
        slug: st.tool.slug,
        category: st.tool.category,
        pricing: st.tool.pricing,
      })),
      metrics: stack.stackMetrics ? {
        views: stack.stackMetrics.views,
        saves: stack.stackMetrics.saves,
        avgRating: stack.stackMetrics.avgRating,
        reviewCount: stack.stackMetrics.reviewCount,
        popularityScore: stack.stackMetrics.popularityScore,
      } : null,
      curator: null,
    }));
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
            include: {
              tool: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  category: true,
                  pricing: true,
                },
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

    return stacks.map((stack) => ({
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
      tools: stack.stackTools.map((st: { tool: { id: string; title: string; slug: string; category: string; pricing: string } }) => ({
        id: st.tool.id,
        name: st.tool.title,
        slug: st.tool.slug,
        category: st.tool.category,
        pricing: st.tool.pricing,
      })),
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
    }));
  },
  ["popular-stacks"],
  { revalidate: CACHE_5MIN }
);