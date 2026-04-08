import { prisma } from "@/lib/prisma";
import { mapToCommunityStackWithDetails } from "./types";

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
