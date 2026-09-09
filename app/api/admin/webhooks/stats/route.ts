import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createErrorResponse, createSuccessResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const hours = parseInt(searchParams.get("hours") || "24");

        const cutoffDate = new Date(Date.now() - hours * 60 * 60 * 1000);

        // Get all events since cutoff
        const events = await prisma.webhookEvent.findMany({
            where: {
                createdAt: { gte: cutoffDate },
            },
            orderBy: { createdAt: "desc" },
        });

        // Calculate summary stats
        const total = events.length;
        const processed = events.filter(e => e.status === "processed").length;
        const skipped = events.filter(e => e.status === "skipped").length;
        const failed = events.filter(e => e.status === "failed").length;
        // Measured against failures, not against "processed". An event type we
        // have no case for is recorded "skipped", and skipping is not failing:
        // our Stripe endpoint subscribes to more types than the nine we handle,
        // so a processed/total rate reported a sinking success rate on a day
        // where nothing went wrong.
        const successRate = total > 0 ? (total - failed) / total : 0;

        // Group by event type
        const byType: Record<string, { count: number; failed: number }> = {};
        events.forEach(event => {
            if (!byType[event.type]) {
                byType[event.type] = { count: 0, failed: 0 };
            }
            byType[event.type].count++;
            if (event.status === "failed") {
                byType[event.type].failed++;
            }
        });

        // Get recent failures
        const recentFailures = events
            .filter(e => e.status === "failed")
            .slice(0, 10)
            .map(e => ({
                eventId: e.eventId,
                type: e.type,
                error: e.error,
                createdAt: e.createdAt,
            }));

        return createSuccessResponse({
            summary: {
                total,
                processed,
                skipped,
                failed,
                successRate: Math.round(successRate * 1000) / 1000,
            },
            byType,
            recentFailures,
        });
  } catch (error) {
    return createErrorResponse("Failed to fetch webhook stats", 500);
  }
}
