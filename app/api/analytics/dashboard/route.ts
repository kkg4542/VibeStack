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

    // Get top pages by affiliate clicks (referrer), normalized to path
    const referrerRaw = await prisma.affiliateClick.groupBy({
      by: ["referrer"],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Only our own pages get a path label. An external referrer collapsed to
    // its pathname would masquerade as one of our routes — google.com/ would
    // read as the homepage — so those are bucketed by host instead.
    const OWN_HOSTS = new Set(["usevibestack.com", "www.usevibestack.com", "localhost"]);

    const referrerCounts = new Map<string, number>();
    for (const row of referrerRaw) {
      let label = "(direct/unknown)";
      if (row.referrer) {
        try {
          const url = new URL(row.referrer);
          label = OWN_HOSTS.has(url.hostname)
            ? url.pathname || "/"
            : `(external: ${url.hostname})`;
        } catch {
          label = "(direct/unknown)";
        }
      }
      referrerCounts.set(label, (referrerCounts.get(label) || 0) + row._count.id);
    }

    const referrerStats = Array.from(referrerCounts.entries())
      .map(([path, clicks]) => ({ path, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 20);

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
      referrerStats,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}