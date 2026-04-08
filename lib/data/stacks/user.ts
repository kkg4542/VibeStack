import { prisma } from "@/lib/prisma";
import { StackWithMetrics } from "./types";

// Save/unsave a stack to user's collection
export async function toggleSaveStack(userId: string, stackId: string) {
  try {
    // Check if already saved using findFirst instead of findUnique
    const existing = await prisma.userSavedStack.findFirst({
      where: {
        userId,
        stackId,
      },
    });

    if (existing) {
      // Unsave - delete the record
      await prisma.userSavedStack.delete({
        where: {
          id: existing.id,
        },
      });

      // Decrement saves count
      await prisma.stackMetrics.update({
        where: { stackId },
        data: {
          saves: {
            decrement: 1,
          },
        },
      });

      return { saved: false };
    } else {
      // Save - create new record
      await prisma.userSavedStack.create({
        data: {
          userId,
          stackId,
        },
      });

      // Increment saves count
      await prisma.stackMetrics.upsert({
        where: { stackId },
        create: {
          stackId,
          views: 0,
          saves: 1,
          avgRating: 0,
          reviewCount: 0,
          popularityScore: 0,
        },
        update: {
          saves: {
            increment: 1,
          },
        },
      });

      return { saved: true };
    }
  } catch (error) {
    console.error(`Failed to toggle save for stack ${stackId}:`, error);
    throw error;
  }
}

// Get user's saved community stacks
export async function getUserSavedCommunityStacks(userId: string) {
  try {
    const savedStacks = await prisma.userSavedStack.findMany({
      where: { userId },
      include: {
        stack: {
          include: {
            tools: {
              select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                pricing: true,
              },
            },
            curator: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return savedStacks.map((saved) => ({
      id: saved.stack.id,
      name: saved.stack.name,
      description: saved.stack.description,
      isPublic: saved.stack.isPublic,
      isFeatured: saved.stack.isFeatured,
      viewCount: saved.stack.viewCount,
      saveCount: saved.stack.saveCount,
      likeCount: saved.stack.likeCount,
      tools: saved.stack.tools.map((tool: { id: string; title: string; slug: string; category: string; pricing: string }) => ({
        id: tool.id,
        name: tool.title,
        slug: tool.slug,
        category: tool.category,
        pricing: tool.pricing,
      })),
      curator: saved.stack.curator ? {
        name: saved.stack.curator.name,
        image: saved.stack.curator.image,
      } : null,
      savedAt: saved.createdAt,
    }));
  } catch (error) {
    console.error(`Failed to get saved stacks for user ${userId}:`, error);
    return [];
  }
}