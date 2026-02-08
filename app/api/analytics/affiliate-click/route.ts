import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolSlug, toolName, url, abVariant } = body;

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

    // Get request metadata
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || undefined;
    
    // Get IP address (handle proxies)
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : undefined;

    // Create click record
    const click = await prisma.affiliateClick.create({
      data: {
        toolId: tool.id,
        toolSlug,
        toolName,
        url,
        userAgent,
        referrer,
        ipAddress,
        abVariant: abVariant || null,
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