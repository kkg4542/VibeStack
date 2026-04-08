import { prisma } from "@/lib/prisma";
import { CommunityStackWithDetails, mapToCommunityStackWithDetails } from "./types";

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
