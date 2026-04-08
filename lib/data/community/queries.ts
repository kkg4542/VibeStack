import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CommunityStackWithDetails, CommunityStackFilters, mapToCommunityStackWithDetails, CACHE_5MIN } from "./types";

export const getCommunityStacks = unstable_cache(
  async (filters: CommunityStackFilters = {}, limit: number = 20, offset: number = 0): Promise<{
    stacks: CommunityStackWithDetails[];
    totalCount: number;
  }> => {
    const { search, sortBy = 'popular', timeRange = 'all' } = filters;

    // Build where clause
    const where: Prisma.CommunityStackWhereInput = {
      isPublic: true,
    };

    // Apply search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { curator: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // Apply time range filter
    if (timeRange !== 'all') {
      const now = new Date();
      let startDate = new Date();
      switch (timeRange) {
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
      }
      where.createdAt = { gte: startDate };
    }

    // Build orderBy
    let orderBy: Prisma.CommunityStackOrderByWithRelationInput = {};
    switch (sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'mostSaved':
        orderBy = { savedBy: { _count: 'desc' } };
        break;
      case 'mostViewed':
        orderBy = { viewCount: 'desc' };
        break;
      case 'popular':
      default:
        // For popularity, we'll fetch and sort manually
        orderBy = { createdAt: 'desc' };
        break;
    }

    // Fetch stacks with counts
    const stacks = await prisma.communityStack.findMany({
      where,
      include: {
        curator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tools: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            pricing: true,
          },
        },
        forkedFrom: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            savedBy: true,
          },
        },
      },
      orderBy,
      take: limit,
      skip: offset,
    });

    // For popular sorting, we need to calculate score and sort manually
    let sortedStacks = stacks;
    if (sortBy === 'popular') {
      sortedStacks = stacks.sort((a, b) => {
        const scoreA = (a._count?.likes || 0) * 3 + (a._count?.savedBy || 0) * 2 + a.viewCount;
        const scoreB = (b._count?.likes || 0) * 3 + (b._count?.savedBy || 0) * 2 + b.viewCount;
        return scoreB - scoreA;
      });
    }

    // Get total count
    const totalCount = await prisma.communityStack.count({ where });

    return {
      stacks: sortedStacks.map(mapToCommunityStackWithDetails),
      totalCount,
    };
  },
  ['community-stacks'],
  { revalidate: CACHE_5MIN }
);

// Get featured community stacks
export const getFeaturedCommunityStacks = unstable_cache(
  async (limit: number = 6): Promise<CommunityStackWithDetails[]> => {
    const stacks = await prisma.communityStack.findMany({
      where: {
        isFeatured: true,
        isPublic: true,
      },
      include: {
        curator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tools: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            pricing: true,
          },
        },
        forkedFrom: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            savedBy: true,
          },
        },
      },
      orderBy: {
        featuredOrder: 'asc',
      },
      take: limit,
    });

    return stacks.map(mapToCommunityStackWithDetails);
  },
  ['featured-community-stacks'],
  { revalidate: CACHE_5MIN }
);

// Get a single community stack by ID
export const getCommunityStackById = unstable_cache(
  async (id: string): Promise<CommunityStackWithDetails | null> => {
    const stack = await prisma.communityStack.findUnique({
      where: { id },
      include: {
        curator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tools: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            pricing: true,
          },
        },
        forkedFrom: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            savedBy: true,
          },
        },
      },
    });

    if (!stack) return null;

    return mapToCommunityStackWithDetails(stack);
  },
  ['community-stack-detail'],
  { revalidate: CACHE_5MIN }
);

// Get community stacks by user
export const getUserCommunityStacks = unstable_cache(
  async (userId: string): Promise<CommunityStackWithDetails[]> => {
    const stacks = await prisma.communityStack.findMany({
      where: {
        curatorId: userId,
      },
      include: {
        curator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tools: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            pricing: true,
          },
        },
        forkedFrom: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            savedBy: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return stacks.map(mapToCommunityStackWithDetails);
  },
  ['user-community-stacks'],
  { revalidate: CACHE_5MIN }
);
