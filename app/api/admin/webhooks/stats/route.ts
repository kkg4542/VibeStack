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
        const failed = events.filter(e => e.status === "failed").length;
        const successRate = total > 0 ? processed / total : 0;

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
                failed,
                successRate: Math.round(successRate * 1000) / 1000,
            },
            byType,
            recentFailures,
        });
    } catch (error) {
        console.error("Error fetching webhook stats:", error);
        return createErrorResponse("Failed to fetch webhook stats", 500);
    }
}
