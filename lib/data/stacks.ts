import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// Cache durations
const CACHE_1MIN = 60;
const CACHE_5MIN = 300;
const CACHE_1HOUR = 3600;

export interface StackWithMetrics {
  id: string;
  idField: string;
  name: string;
  description: string | null;
  longDescription: string | null;
  totalPrice: string | null;
  tags: string[];
  idealFor: string[];
  workflow: string[];
  icon: string | null;
  color: string | null;
  tools: {
    id: string;
    name: string;
    slug: string;
    category: string;
    pricing: string;
  }[];
  metrics: {
    views: number;
    saves: number;
    avgRating: number;
    reviewCount: number;
    popularityScore: number;
  } | null;
  curator: {
    name: string;
    image: string | null;
    role: string;
  } | null;
}

// Get featured stacks with metrics
export const getFeaturedStacks = unstable_cache(
  async (limit: number = 6): Promise<StackWithMetrics[]> => {
    const stacks = await prisma.stack.findMany({
      where: {
        // For now, we'll use a specific list of featured stacks
        // Later this can be based on metrics or manual curation
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

    // Get metrics for each stack (mock implementation until schema is migrated)
    const metricsMap = new Map<string, {
      views: number;
      saves: number;
      avgRating: number;
      reviewCount: number;
      popularityScore: number;
    }>();

    // Add some mock metrics for demonstration
    stacks.forEach((stack, index) => {
      metricsMap.set(stack.id, {
        views: 1200 + index * 300,
        saves: 45 + index * 12,
        avgRating: 4.5 + index * 0.1,
        reviewCount: 23 + index * 5,
        popularityScore: 85 + index * 5,
      });
    });

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
      metrics: metricsMap.get(stack.id) || null,
      curator: null, // Will be populated when we have curator data
    }));
  },
  ["featured-stacks"],
  { revalidate: CACHE_5MIN }
);

// Get popular stacks sorted by metrics
export const getPopularStacks = unstable_cache(
  async (limit: number = 10): Promise<StackWithMetrics[]> => {
    const stacks = await prisma.stack.findMany({
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
      },
    });

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
      metrics: {
        views: 1000,
        saves: 50,
        avgRating: 4.5,
        reviewCount: 25,
        popularityScore: 80,
      },
      curator: null,
    }));
  },
  ["popular-stacks"],
  { revalidate: CACHE_5MIN }
);

export interface VerifiedTestimonial {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string | null;
    verified: boolean;
    role: string;
    company: string;
  };
  stackName: string | null;
  toolName: string | null;
  rating: number;
  content: string;
  metrics: {
    productivityGain?: string;
    timeSaved?: string;
    roi?: string;
  } | null;
  videoUrl: string | null;
  socialProof: {
    likes: number;
    retweets: number;
  } | null;
  createdAt: Date;
}

// Get verified testimonials for display
export const getVerifiedTestimonials = unstable_cache(
  async (limit: number = 6): Promise<VerifiedTestimonial[]> => {
    // TODO: Implement with actual database after migration
    // For now, return mock data
    const mockTestimonials: VerifiedTestimonial[] = [
      {
        id: "1",
        user: {
          name: "Sarah Chen",
          handle: "@sarahchen_dev",
          avatar: null,
          verified: true,
          role: "Senior Developer",
          company: "TechCorp",
        },
        stackName: "10x Engineer",
        toolName: null,
        rating: 5,
        content: "VibeStack helped me discover tools that 3x'd my productivity. The curated selection is incredible!",
        metrics: {
          productivityGain: "3x",
          timeSaved: "15h/week",
          roi: "$3000/mo",
        },
        videoUrl: null,
        socialProof: {
          likes: 42,
          retweets: 12,
        },
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        user: {
          name: "Alex Rodriguez",
          handle: "@arod_tech",
          avatar: null,
          verified: true,
          role: "Product Manager",
          company: "StartupXYZ",
        },
        stackName: "Product Designer",
        toolName: null,
        rating: 5,
        content: "Best collection of AI tools in one place. Saves me hours of research every week.",
        metrics: {
          productivityGain: "2.5x",
          timeSaved: "10h/week",
          roi: "$2000/mo",
        },
        videoUrl: null,
        socialProof: {
          likes: 28,
          retweets: 8,
        },
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "3",
        user: {
          name: "Maya Patel",
          handle: "@mayap_codes",
          avatar: null,
          verified: true,
          role: "Tech Lead",
          company: "DevStudio",
        },
        stackName: "Magic Wand",
        toolName: null,
        rating: 5,
        content: "The stack builder feature is genius. Found the perfect combo of tools for our team.",
        metrics: {
          productivityGain: "4x",
          timeSaved: "20h/week",
          roi: "$5000/mo",
        },
        videoUrl: null,
        socialProof: {
          likes: 56,
          retweets: 18,
        },
        createdAt: new Date("2024-02-01"),
      },
    ];

    return mockTestimonials.slice(0, limit);
  },
  ["verified-testimonials"],
  { revalidate: CACHE_5MIN }
);

// Get testimonials for a specific stack
export const getStackTestimonials = unstable_cache(
  async (stackId: string, limit: number = 10): Promise<VerifiedTestimonial[]> => {
    // TODO: Implement with actual database after migration
    // For now, return filtered mock data
    const allTestimonials = await getVerifiedTestimonials();
    return allTestimonials.slice(0, limit);
  },
  ["stack-testimonials"],
  { revalidate: CACHE_5MIN }
);

// Calculate and update stack metrics
export async function calculateStackMetrics(stackId: string) {
  // TODO: Implement with actual database after migration
  // For now, return mock data
  return {
    views: 1200,
    saves: 45,
    reviews: 23,
    avgRating: 4.5,
    popularityScore: 85,
  };
}

// Get stack insights for data visualization
export interface StackInsights {
  adoptionTrend: {
    month: string;
    users: number;
  }[];
  avgTimeSaved: string;
  avgCostSaved: string;
  productivityBoost: number;
  toolPopularity: {
    toolId: string;
    toolName: string;
    usage: number;
  }[];
}

export const getStackInsights = unstable_cache(
  async (stackId: string): Promise<StackInsights> => {
    // TODO: Implement with actual database after migration
    // For now, return mock data with realistic values
    
    // Get tool popularity from StackTool usage
    const stackTools = await prisma.stackTool.findMany({
      where: { stackId },
      include: {
        tool: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    const toolPopularity = stackTools.map((st, index) => ({
      toolId: st.tool.id,
      toolName: st.tool.title,
      usage: 100 - index * 10, // Decreasing usage for each tool
    }));

    // Mock adoption trend data
    const mockTrend = [
      { month: "Aug", users: 120 },
      { month: "Sep", users: 180 },
      { month: "Oct", users: 250 },
      { month: "Nov", users: 320 },
      { month: "Dec", users: 410 },
      { month: "Jan", users: 520 },
    ];

    return {
      adoptionTrend: mockTrend,
      avgTimeSaved: "15h",
      avgCostSaved: "$2500",
      productivityBoost: 3.2,
      toolPopularity,
    };
  },
  ["stack-insights"],
  { revalidate: CACHE_1HOUR }
);

// Increment stack view count
export async function incrementStackView(stackId: string) {
  // TODO: Implement with actual database after migration
  // For now, this is a no-op
  console.log(`View incremented for stack: ${stackId}`);
}

// Save a stack to user's collection
export async function saveStack(userId: string, stackId: string) {
  // This would create a CommunityStack record
  // Implementation depends on your save logic
}
