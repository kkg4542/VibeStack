import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { formatZodError } from "@/lib/api-utils";
import { getClientIp, limitOrRespond, routeRateLimits } from "@/lib/route-rate-limit";

const httpUrl = z
  .string()
  .max(2048)
  .url()
  .refine((value) => /^https?:\/\//i.test(value), "URL must use http or https");

/**
 * toolName and url are still accepted so older clients keep validating, but
 * neither is stored: both are taken from the tool row below, the same way
 * app/go/[slug]/route.ts derives its destination. Storing the client's copy
 * let anyone write arbitrary names and links into the admin dashboard.
 */
const affiliateClickSchema = z.object({
  toolSlug: z.string().trim().min(1).max(100),
  toolName: z.string().max(200).optional(),
  url: httpUrl.optional(),
  abVariant: z.enum(["A", "B", "C"]).nullable().optional(),
});

function truncate(value: string | null, max: number): string | undefined {
  return value ? value.slice(0, max) : undefined;
}

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request);
    const limited = await limitOrRespond(
      `affiliate-click:${ipAddress}`,
      routeRateLimits.affiliateClick
    );
    if (limited) return limited;

    const body = await request.json().catch(() => null);
    const parsed = affiliateClickSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(parsed.error) },
        { status: 400 }
      );
    }

    const { toolSlug, abVariant } = parsed.data;

    // Find the tool by slug
    const tool = await prisma.tool.findUnique({
      where: { slug: toolSlug },
    });

    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
    }

    // Request metadata, capped so a padded header can't bloat the table.
    const userAgent = truncate(request.headers.get("user-agent"), 512);
    const referrer = truncate(request.headers.get("referer"), 2048);

    const click = await prisma.affiliateClick.create({
      data: {
        toolId: tool.id,
        toolSlug: tool.slug,
        toolName: tool.title,
        url: tool.affiliateUrl || tool.websiteUrl,
        userAgent,
        referrer,
        ipAddress: ipAddress === "unknown" ? undefined : ipAddress,
        abVariant: abVariant ?? null,
      },
    });

    return NextResponse.json({ success: true, clickId: click.id });
  } catch (error) {
    console.error("Error tracking affiliate click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}
