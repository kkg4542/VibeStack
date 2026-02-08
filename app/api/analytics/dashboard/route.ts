import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get date range from query params
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get affiliate click stats
    const clickStats = await prisma.affiliateClick.groupBy({
      by: ["toolSlug", "toolName"],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get daily click counts
    const dailyClicks = await prisma.affiliateClick.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Get A/B test variant stats
    const abStats = await prisma.affiliateClick.groupBy({
      by: ["abVariant"],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get email capture stats
    const emailStats = await prisma.emailCapture.groupBy({
      by: ["source"],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get total counts
    const totalClicks = await prisma.affiliateClick.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    const totalEmails = await prisma.emailCapture.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    return NextResponse.json({
      totalClicks,
      totalEmails,
      clickStats: clickStats.map((stat) => ({
        toolSlug: stat.toolSlug,
        toolName: stat.toolName,
        clicks: stat._count.id,
      })),
      dailyClicks: dailyClicks.map((day) => ({
        date: day.createdAt.toISOString().split("T")[0],
        clicks: day._count.id,
      })),
      abStats: abStats.map((stat) => ({
        variant: stat.abVariant || "none",
        clicks: stat._count.id,
      })),
      emailStats: emailStats.map((stat) => ({
        source: stat.source,
        count: stat._count.id,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}