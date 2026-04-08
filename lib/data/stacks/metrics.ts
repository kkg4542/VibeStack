import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { StackInsights } from "./types";
import { CACHE_5MIN, CACHE_1HOUR } from "./constants";

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