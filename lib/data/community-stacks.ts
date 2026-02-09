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

// Mock data for community stacks
const mockCommunityStacks: CommunityStackWithDetails[] = [
  {
    id: "cs_001",
    name: "AI Content Creator Suite",
    description: "Perfect combination of tools for creating viral content with AI assistance. Includes writing, image generation, and video editing.",
    isPublic: true,
    isFeatured: true,
    featuredOrder: 1,
    viewCount: 3420,
    saveCount: 128,
    likeCount: 89,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    curator: {
      id: "user_001",
      name: "Sarah Chen",
      image: null,
    },
    tools: [],
    forkedFrom: null,
  },
  {
    id: "cs_002",
    name: "Developer Productivity Stack",
    description: "My go-to tools for shipping code faster. AI-powered coding assistants, documentation generators, and deployment automation.",
    isPublic: true,
    isFeatured: true,
    featuredOrder: 2,
    viewCount: 2890,
    saveCount: 95,
    likeCount: 72,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    curator: {
      id: "user_002",
      name: "Alex Rodriguez",
      image: null,
    },
    tools: [],
    forkedFrom: null,
  },
  {
    id: "cs_003",
    name: "Design System Starter",
    description: "Everything you need to build a scalable design system. From component libraries to asset management.",
    isPublic: true,
    isFeatured: false,
    featuredOrder: 0,
    viewCount: 1850,
    saveCount: 64,
    likeCount: 45,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    curator: {
      id: "user_003",
      name: "Maya Patel",
      image: null,
    },
    tools: [],
    forkedFrom: null,
  },
  {
    id: "cs_004",
    name: "Solo Founder Toolkit",
    description: "The exact stack I used to launch my SaaS to $10k MRR in 3 months. No-code, low-code, and AI tools that actually work.",
    isPublic: true,
    isFeatured: true,
    featuredOrder: 3,
    viewCount: 5210,
    saveCount: 234,
    likeCount: 156,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    curator: {
      id: "user_004",
      name: "James Wilson",
      image: null,
    },
    tools: [],
    forkedFrom: null,
  },
  {
    id: "cs_005",
    name: "Data Science Pipeline",
    description: "Complete workflow for data cleaning, analysis, visualization, and model training. Used by our data science team daily.",
    isPublic: true,
    isFeatured: false,
    featuredOrder: 0,
    viewCount: 1230,
    saveCount: 42,
    likeCount: 28,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    curator: {
      id: "user_005",
      name: "Emily Zhang",
      image: null,
    },
    tools: [],
    forkedFrom: null,
  },
  {
    id: "cs_006",
    name: "Marketing Automation Flow",
    description: "Automate your entire marketing funnel from lead capture to nurture campaigns. Saves 20+ hours per week.",
    isPublic: true,
    isFeatured: false,
    featuredOrder: 0,
    viewCount: 2150,
    saveCount: 78,
    likeCount: 53,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28"),
    curator: {
      id: "user_006",
      name: "David Kim",
      image: null,
    },
    tools: [],
    forkedFrom: null,
  },
];

// Get all public community stacks with filtering and sorting
export const getCommunityStacks = unstable_cache(
  async (filters: CommunityStackFilters = {}, limit: number = 20, offset: number = 0): Promise<{
    stacks: CommunityStackWithDetails[];
    totalCount: number;
  }> => {
    const { search, sortBy = 'popular', timeRange = 'all' } = filters;

    let filteredStacks = [...mockCommunityStacks];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredStacks = filteredStacks.filter(
        stack => 
          stack.name.toLowerCase().includes(searchLower) ||
          stack.description?.toLowerCase().includes(searchLower) ||
          stack.curator.name?.toLowerCase().includes(searchLower)
      );
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
      filteredStacks = filteredStacks.filter(stack => stack.createdAt >= startDate);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filteredStacks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'mostSaved':
        filteredStacks.sort((a, b) => b.saveCount - a.saveCount);
        break;
      case 'mostViewed':
        filteredStacks.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'popular':
      default:
        filteredStacks.sort((a, b) => {
          const scoreA = a.likeCount * 3 + a.saveCount * 2 + a.viewCount;
          const scoreB = b.likeCount * 3 + b.saveCount * 2 + b.viewCount;
          return scoreB - scoreA;
        });
        break;
    }

    const totalCount = filteredStacks.length;
    const stacks = filteredStacks.slice(offset, offset + limit);

    return { stacks, totalCount };
  },
  ['community-stacks'],
  { revalidate: CACHE_5MIN }
);

// Get featured community stacks
export const getFeaturedCommunityStacks = unstable_cache(
  async (limit: number = 6): Promise<CommunityStackWithDetails[]> => {
    return mockCommunityStacks
      .filter(stack => stack.isFeatured)
      .sort((a, b) => a.featuredOrder - b.featuredOrder)
      .slice(0, limit);
  },
  ['featured-community-stacks'],
  { revalidate: CACHE_5MIN }
);

// Get a single community stack by ID
export const getCommunityStackById = unstable_cache(
  async (id: string): Promise<CommunityStackWithDetails | null> => {
    return mockCommunityStacks.find(stack => stack.id === id) || null;
  },
  ['community-stack-detail'],
  { revalidate: CACHE_5MIN }
);

// Get community stacks by user
export const getUserCommunityStacks = unstable_cache(
  async (userId: string): Promise<CommunityStackWithDetails[]> => {
    return mockCommunityStacks
      .filter(stack => stack.curator.id === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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

  // In a real implementation, this would create a database record
  // For now, just return a mock response
  const newStack: CommunityStackWithDetails = {
    id: `cs_${Date.now()}`,
    name,
    description: description || null,
    isPublic,
    isFeatured: false,
    featuredOrder: 0,
    viewCount: 0,
    saveCount: 0,
    likeCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    curator: {
      id: userId,
      name: 'Anonymous',
      image: null,
    },
    tools: [],
    forkedFrom: null,
  };

  return newStack;
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
  // In a real implementation, this would update the database
  const stack = mockCommunityStacks.find(s => s.id === id);
  
  if (!stack) {
    throw new Error('Stack not found or unauthorized');
  }

  if (stack.curator.id !== userId) {
    throw new Error('Stack not found or unauthorized');
  }

  return { ...stack, ...data, updatedAt: new Date() };
}

// Delete a community stack
export async function deleteCommunityStack(id: string, userId: string) {
  const stack = mockCommunityStacks.find(s => s.id === id);

  if (!stack) {
    throw new Error('Stack not found or unauthorized');
  }

  if (stack.curator.id !== userId) {
    throw new Error('Stack not found or unauthorized');
  }

  // In a real implementation, this would delete from database
  return true;
}

// Increment view count
export async function incrementCommunityStackView(stackId: string) {
  // In a real implementation, this would update the database
  console.log(`View incremented for community stack: ${stackId}`);
}

// Toggle like
export async function toggleCommunityStackLike(stackId: string, userId: string) {
  // TODO: Implement with a separate CommunityStackLike table
  console.log(`Toggle like for stack ${stackId} by user ${userId}`);
  return { liked: true };
}

// Save stack to user's collection
export async function saveCommunityStack(stackId: string, userId: string) {
  // TODO: Implement with a separate UserSavedStack table
  console.log(`Stack ${stackId} saved by user ${userId}`);
  return { saved: true };
}

// Fork a community stack
export async function forkCommunityStack(stackId: string, userId: string) {
  const originalStack = mockCommunityStacks.find(s => s.id === stackId);

  if (!originalStack) {
    throw new Error('Original stack not found');
  }

  const forkedStack: CommunityStackWithDetails = {
    ...originalStack,
    id: `cs_${Date.now()}`,
    name: `${originalStack.name} (Fork)`,
    curator: {
      id: userId,
      name: 'Anonymous',
      image: null,
    },
    viewCount: 0,
    saveCount: 0,
    likeCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    forkedFrom: {
      id: originalStack.id,
      name: originalStack.name,
    },
  };

  return forkedStack;
}
