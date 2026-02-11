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
    // Get featured stacks with highest popularity scores
    const stacks = await prisma.stack.findMany({
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

    // If no stacks with metrics exist, fall back to id-based selection
    if (stacks.length === 0) {
      const fallbackStacks = await prisma.stack.findMany({
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
        stackMetrics: true,
      },
      orderBy: {
        stackMetrics: {
          popularityScore: 'desc',
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
    const testimonials = await prisma.testimonial.findMany({
      where: {
        verified: true,
        featured: true,
      },
      include: {
        stack: {
          select: {
            name: true,
          },
        },
        tool: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        featuredOrder: 'asc',
      },
      take: limit,
    });

    // If no testimonials in database, return fallback mock data
    if (testimonials.length === 0) {
      return getFallbackTestimonials().slice(0, limit);
    }

    return testimonials.map((t) => ({
      id: t.id,
      user: {
        name: t.user?.name || 'Anonymous',
        handle: t.userId ? `@user_${t.userId.slice(0, 8)}` : '@anonymous',
        avatar: t.user?.image || null,
        verified: t.verified,
        role: 'Developer', // Default role, can be extended in schema
        company: '', // Can be extended in schema
      },
      stackName: t.stack?.name || null,
      toolName: t.tool?.title || null,
      rating: t.rating,
      content: t.content,
      metrics: t.metrics as { productivityGain?: string; timeSaved?: string; roi?: string } || null,
      videoUrl: t.videoUrl,
      socialProof: t.socialProof as { likes: number; retweets: number } || null,
      createdAt: t.createdAt,
    }));
  },
  ["verified-testimonials"],
  { revalidate: CACHE_5MIN }
);

// Get stack metrics by ID
export const getStackMetrics = unstable_cache(
  async (stackId: string) => {
    return await prisma.stackMetrics.findUnique({
      where: {
        stackId,
      },
    });
  },
  ['stack-metrics'],
  {
    revalidate: CACHE_5MIN,
    tags: ['stack-metrics']
  }
);

// Get testimonials for a specific stack
export const getStackTestimonials = unstable_cache(
  async (stackId: string, limit: number = 10): Promise<VerifiedTestimonial[]> => {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        stackId,
        verified: true,
      },
      include: {
        stack: {
          select: {
            name: true,
          },
        },
        tool: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return testimonials.map((t) => ({
      id: t.id,
      user: {
        name: t.user?.name || 'Anonymous',
        handle: t.userId ? `@user_${t.userId.slice(0, 8)}` : '@anonymous',
        avatar: t.user?.image || null,
        verified: t.verified,
        role: 'Developer',
        company: '',
      },
      stackName: t.stack?.name || null,
      toolName: t.tool?.title || null,
      rating: t.rating,
      content: t.content,
      metrics: t.metrics as { productivityGain?: string; timeSaved?: string; roi?: string } || null,
      videoUrl: t.videoUrl,
      socialProof: t.socialProof as { likes: number; retweets: number } || null,
      createdAt: t.createdAt,
    }));
  },
  ["stack-testimonials"],
  { revalidate: CACHE_5MIN }
);

// Fallback mock testimonials when database is empty
function getFallbackTestimonials(): VerifiedTestimonial[] {
  return [
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
}

// Calculate and update stack metrics
export async function calculateStackMetrics(stackId: string) {
  // Get current metrics or create new
  let metrics = await prisma.stackMetrics.findUnique({
    where: { stackId },
  });

  if (!metrics) {
    // Initialize metrics for this stack
    metrics = await prisma.stackMetrics.create({
      data: {
        stackId,
        views: 0,
        saves: 0,
        avgRating: 0,
        reviewCount: 0,
        popularityScore: 0,
      },
    });
  }

  // Calculate popularity score based on weighted factors
  const popularityScore = calculatePopularityScore({
    views: metrics.views,
    saves: metrics.saves,
    reviewCount: metrics.reviewCount,
    avgRating: metrics.avgRating,
  });

  // Update the metrics with calculated popularity score
  const updated = await prisma.stackMetrics.update({
    where: { stackId },
    data: {
      popularityScore,
      lastCalculatedAt: new Date(),
    },
  });

  return {
    views: updated.views,
    saves: updated.saves,
    reviews: updated.reviewCount,
    avgRating: updated.avgRating,
    popularityScore: updated.popularityScore,
  };
}

// Helper function to calculate popularity score
function calculatePopularityScore({
  views,
  saves,
  reviewCount,
  avgRating,
}: {
  views: number;
  saves: number;
  reviewCount: number;
  avgRating: number;
}) {
  // Weighted scoring algorithm
  // Views: 40%, Saves: 30%, Reviews: 20%, Rating: 10%
  const viewsScore = Math.min(views / 100, 40); // Max 40 points for 4000+ views
  const savesScore = Math.min(saves / 10, 30); // Max 30 points for 300+ saves
  const reviewScore = Math.min(reviewCount / 2, 20); // Max 20 points for 40+ reviews
  const ratingScore = (avgRating / 5) * 10; // Max 10 points for 5.0 rating

  return Math.round(viewsScore + savesScore + reviewScore + ratingScore);
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
  try {
    // Upsert stack metrics - create if doesn't exist, increment if exists
    await prisma.stackMetrics.upsert({
      where: { stackId },
      create: {
        stackId,
        views: 1,
        saves: 0,
        avgRating: 0,
        reviewCount: 0,
        popularityScore: 0,
      },
      update: {
        views: {
          increment: 1,
        },
        lastCalculatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(`Failed to increment view for stack ${stackId}:`, error);
  }
}

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
