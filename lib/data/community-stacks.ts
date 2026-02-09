import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// Cache durations
const CACHE_1MIN = 60;
const CACHE_5MIN = 300;
const CACHE_1HOUR = 3600;

export interface CommunityStackWithDetails {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  isFeatured: boolean;
  featuredOrder: number;
  viewCount: number;
  saveCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  curator: {
    id: string;
    name: string | null;
    image: string | null;
  };
  tools: {
    id: string;
    name: string;
    slug: string;
    category: string;
    pricing: string;
  }[];
  forkedFrom: {
    id: string;
    name: string;
  } | null;
}

export interface CommunityStackFilters {
  search?: string;
  sortBy?: 'popular' | 'newest' | 'mostSaved' | 'mostViewed';
  timeRange?: 'all' | 'week' | 'month' | 'year';
}

// Get all public community stacks with filtering and sorting
export const getCommunityStacks = unstable_cache(
  async (filters: CommunityStackFilters = {}, limit: number = 20, offset: number = 0): Promise<{
    stacks: CommunityStackWithDetails[];
    totalCount: number;
  }> => {
    const { search, sortBy = 'popular', timeRange = 'all' } = filters;

    // Build where clause
    const where: any = {
      isPublic: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (timeRange !== 'all') {
      const now = new Date();
      let startDate = now;
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

    // Build order by
    let orderBy: any = {};
    switch (sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'mostSaved':
        orderBy = { saveCount: 'desc' };
        break;
      case 'mostViewed':
        orderBy = { viewCount: 'desc' };
        break;
      case 'popular':
      default:
        orderBy = [
          { likeCount: 'desc' },
          { saveCount: 'desc' },
          { viewCount: 'desc' },
        ];
        break;
    }

    // Get total count for pagination
    const totalCount = await prisma.communityStack.count({ where });

    // Get stacks
    const stacks = await prisma.communityStack.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy,
      take: limit,
      skip: offset,
    });

    // For now, we need to fetch tools separately since CommunityStack doesn't have a direct relation
    // In a real implementation, you'd have a CommunityStackTool join table
    const stacksWithTools: CommunityStackWithDetails[] = stacks.map((stack) => ({
      id: stack.id,
      name: stack.name,
      description: stack.description,
      isPublic: stack.isPublic,
      isFeatured: stack.isFeatured,
      featuredOrder: stack.featuredOrder,
      viewCount: stack.viewCount,
      saveCount: stack.saveCount,
      likeCount: stack.likeCount,
      createdAt: stack.createdAt,
      updatedAt: stack.updatedAt,
      curator: {
        id: stack.user.id,
        name: stack.user.name,
        image: stack.user.image,
      },
      tools: [], // Will be populated when we add CommunityStackTool relation
      forkedFrom: null, // Will be populated when we add fork functionality
    }));

    return { stacks: stacksWithTools, totalCount };
  },
  ['community-stacks'],
  { revalidate: CACHE_5MIN }
);

// Get featured community stacks
export const getFeaturedCommunityStacks = unstable_cache(
  async (limit: number = 6): Promise<CommunityStackWithDetails[]> => {
    const stacks = await prisma.communityStack.findMany({
      where: {
        isPublic: true,
        isFeatured: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: [
        { featuredOrder: 'asc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    return stacks.map((stack) => ({
      id: stack.id,
      name: stack.name,
      description: stack.description,
      isPublic: stack.isPublic,
      isFeatured: stack.isFeatured,
      featuredOrder: stack.featuredOrder,
      viewCount: stack.viewCount,
      saveCount: stack.saveCount,
      likeCount: stack.likeCount,
      createdAt: stack.createdAt,
      updatedAt: stack.updatedAt,
      curator: {
        id: stack.user.id,
        name: stack.user.name,
        image: stack.user.image,
      },
      tools: [],
      forkedFrom: null,
    }));
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
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!stack) return null;

    return {
      id: stack.id,
      name: stack.name,
      description: stack.description,
      isPublic: stack.isPublic,
      isFeatured: stack.isFeatured,
      featuredOrder: stack.featuredOrder,
      viewCount: stack.viewCount,
      saveCount: stack.saveCount,
      likeCount: stack.likeCount,
      createdAt: stack.createdAt,
      updatedAt: stack.updatedAt,
      curator: {
        id: stack.user.id,
        name: stack.user.name,
        image: stack.user.image,
      },
      tools: [],
      forkedFrom: null,
    };
  },
  ['community-stack-detail'],
  { revalidate: CACHE_5MIN }
);

// Get community stacks by user
export const getUserCommunityStacks = unstable_cache(
  async (userId: string): Promise<CommunityStackWithDetails[]> => {
    const stacks = await prisma.communityStack.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return stacks.map((stack) => ({
      id: stack.id,
      name: stack.name,
      description: stack.description,
      isPublic: stack.isPublic,
      isFeatured: stack.isFeatured,
      featuredOrder: stack.featuredOrder,
      viewCount: stack.viewCount,
      saveCount: stack.saveCount,
      likeCount: stack.likeCount,
      createdAt: stack.createdAt,
      updatedAt: stack.updatedAt,
      curator: {
        id: stack.user.id,
        name: stack.user.name,
        image: stack.user.image,
      },
      tools: [],
      forkedFrom: null,
    }));
  },
  ['user-community-stacks'],
  { revalidate: CACHE_5MIN }
);

// Create a new community stack
export async function createCommunityStack(data: {
  userId: string;
  name: string;
  description?: string;
  toolIds: string[];
  isPublic?: boolean;
}) {
  const { userId, name, description, toolIds, isPublic = true } = data;

  const stack = await prisma.communityStack.create({
    data: {
      userId,
      name,
      description,
      isPublic,
    },
  });

  return stack;
}

// Update a community stack
export async function updateCommunityStack(
  id: string,
  userId: string,
  data: {
    name?: string;
    description?: string;
    isPublic?: boolean;
  }
) {
  // Verify ownership
  const existing = await prisma.communityStack.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new Error('Stack not found or unauthorized');
  }

  const stack = await prisma.communityStack.update({
    where: { id },
    data,
  });

  return stack;
}

// Delete a community stack
export async function deleteCommunityStack(id: string, userId: string) {
  // Verify ownership
  const existing = await prisma.communityStack.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new Error('Stack not found or unauthorized');
  }

  await prisma.communityStack.delete({
    where: { id },
  });

  return true;
}

// Increment view count
export async function incrementCommunityStackView(stackId: string) {
  await prisma.communityStack.update({
    where: { id: stackId },
    data: {
      viewCount: { increment: 1 },
    },
  });
}

// Toggle like
export async function toggleCommunityStackLike(stackId: string, userId: string) {
  // TODO: Implement with a separate CommunityStackLike table
  // For now, just increment/decrement the count
  console.log(`Toggle like for stack ${stackId} by user ${userId}`);
  return { liked: true };
}

// Save stack to user's collection
export async function saveCommunityStack(stackId: string, userId: string) {
  // TODO: Implement with a separate UserSavedStack table
  await prisma.communityStack.update({
    where: { id: stackId },
    data: {
      saveCount: { increment: 1 },
    },
  });
  return { saved: true };
}

// Fork a community stack
export async function forkCommunityStack(stackId: string, userId: string) {
  const originalStack = await prisma.communityStack.findUnique({
    where: { id: stackId },
  });

  if (!originalStack) {
    throw new Error('Original stack not found');
  }

  const forkedStack = await prisma.communityStack.create({
    data: {
      userId,
      name: `${originalStack.name} (Fork)`,
      description: originalStack.description,
      forkedFromId: stackId,
      isPublic: true,
    },
  });

  return forkedStack;
}
