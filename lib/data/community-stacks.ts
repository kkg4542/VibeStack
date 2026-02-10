import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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

type CommunityStackQueryResult = Prisma.CommunityStackGetPayload<{
  include: {
    curator: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    tools: {
      select: {
        id: true;
        title: true;
        slug: true;
        category: true;
        pricing: true;
      };
    };
    forkedFrom: {
      select: {
        id: true;
        name: true;
      };
    };
    _count: {
      select: {
        likes: true;
        savedBy: true;
      };
    };
  };
}>;

// Helper function to convert Prisma CommunityStack to CommunityStackWithDetails
function mapToCommunityStackWithDetails(stack: CommunityStackQueryResult): CommunityStackWithDetails {
  return {
    id: stack.id,
    name: stack.name,
    description: stack.description,
    isPublic: stack.isPublic,
    isFeatured: stack.isFeatured,
    featuredOrder: stack.featuredOrder,
    viewCount: stack.viewCount,
    saveCount: stack._count?.savedBy || 0,
    likeCount: stack._count?.likes || 0,
    createdAt: stack.createdAt,
    updatedAt: stack.updatedAt,
    curator: {
      id: stack.curator.id,
      name: stack.curator.name,
      image: stack.curator.image,
    },
    tools: stack.tools.map((tool) => ({
      id: tool.id,
      name: tool.title,
      slug: tool.slug,
      category: tool.category,
      pricing: tool.pricing,
    })),
    forkedFrom: stack.forkedFrom ? {
      id: stack.forkedFrom.id,
      name: stack.forkedFrom.name,
    } : null,
  };
}

// Get all public community stacks with filtering and sorting
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

// Create a new community stack
export async function createCommunityStack(data: {
  userId: string;
  name: string;
  description?: string;
  toolIds: string[];
  isPublic?: boolean;
}) {
  const { userId, name, description, toolIds, isPublic = true } = data;

  const newStack = await prisma.communityStack.create({
    data: {
      name,
      description,
      isPublic,
      curatorId: userId,
      tools: {
        connect: toolIds.map(id => ({ id })),
      },
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
      _count: {
        select: {
          likes: true,
          savedBy: true,
        },
      },
    },
  });

  return mapToCommunityStackWithDetails({
    ...newStack,
    forkedFrom: null
  });
}

// Update a community stack
export async function updateCommunityStack(
  id: string,
  userId: string,
  data: {
    name?: string;
    description?: string;
    isPublic?: boolean;
    toolIds?: string[];
  }
) {
  // Verify ownership
  const existingStack = await prisma.communityStack.findFirst({
    where: {
      id,
      curatorId: userId,
    },
  });

  if (!existingStack) {
    throw new Error('Stack not found or unauthorized');
  }

  const { toolIds, ...updateData } = data;

  const updatedStack = await prisma.communityStack.update({
    where: { id },
    data: {
      ...updateData,
      ...(toolIds && {
        tools: {
          set: toolIds.map(id => ({ id })),
        },
      }),
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
      _count: {
        select: {
          likes: true,
          savedBy: true,
        },
      },
    },
  });

  return mapToCommunityStackWithDetails(updatedStack as any);
}

// Delete a community stack
export async function deleteCommunityStack(id: string, userId: string) {
  // Verify ownership
  const existingStack = await prisma.communityStack.findFirst({
    where: {
      id,
      curatorId: userId,
    },
  });

  if (!existingStack) {
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
      viewCount: {
        increment: 1,
      },
    },
  });
}

// Toggle like
export async function toggleCommunityStackLike(stackId: string, userId: string) {
  // Check if like already exists
  const existingLike = await prisma.communityStackLike.findUnique({
    where: {
      stackId_userId: {
        stackId,
        userId,
      },
    },
  });

  if (existingLike) {
    // Unlike
    await prisma.communityStackLike.delete({
      where: {
        stackId_userId: {
          stackId,
          userId,
        },
      },
    });
    return { liked: false };
  } else {
    // Like
    await prisma.communityStackLike.create({
      data: {
        stackId,
        userId,
      },
    });
    return { liked: true };
  }
}

// Check if user has liked a stack
export async function hasUserLikedStack(stackId: string, userId: string): Promise<boolean> {
  const like = await prisma.communityStackLike.findUnique({
    where: {
      stackId_userId: {
        stackId,
        userId,
      },
    },
  });

  return !!like;
}

// Save stack to user's collection
export async function saveCommunityStack(stackId: string, userId: string) {
  // Check if already saved
  const existingSave = await prisma.userSavedStack.findUnique({
    where: {
      stackId_userId: {
        stackId,
        userId,
      },
    },
  });

  if (existingSave) {
    // Unsave
    await prisma.userSavedStack.delete({
      where: {
        stackId_userId: {
          stackId,
          userId,
        },
      },
    });
    return { saved: false };
  } else {
    // Save
    await prisma.userSavedStack.create({
      data: {
        stackId,
        userId,
      },
    });
    return { saved: true };
  }
}

// Check if user has saved a stack
export async function hasUserSavedStack(stackId: string, userId: string): Promise<boolean> {
  const saved = await prisma.userSavedStack.findUnique({
    where: {
      stackId_userId: {
        stackId,
        userId,
      },
    },
  });

  return !!saved;
}

// Get saved stacks for a user
export async function getSavedStacksForUser(userId: string): Promise<CommunityStackWithDetails[]> {
  const savedStacks = await prisma.userSavedStack.findMany({
    where: {
      userId,
    },
    include: {
      stack: {
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
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return savedStacks.map((saved: any) => mapToCommunityStackWithDetails(saved.stack));
}

// Fork a community stack
export async function forkCommunityStack(stackId: string, userId: string) {
  const originalStack = await prisma.communityStack.findUnique({
    where: { id: stackId },
    include: {
      tools: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!originalStack) {
    throw new Error('Original stack not found');
  }

  const forkedStack = await prisma.communityStack.create({
    data: {
      name: `${originalStack.name} (Fork)`,
      description: originalStack.description,
      isPublic: true,
      isFeatured: false,
      featuredOrder: 0,
      curatorId: userId,
      forkedFromId: originalStack.id,
      tools: {
        connect: originalStack.tools.map((tool: any) => ({ id: tool.id })),
      },
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
  });

  return mapToCommunityStackWithDetails(forkedStack);
}
