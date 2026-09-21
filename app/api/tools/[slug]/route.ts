import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/lib/api-utils";
import { isRetiredTool } from "@/lib/tools-db";
import { auth } from "@/auth";

interface Props {
  params: Promise<{ slug: string }>;
}

// GET - 특정 도구 조회
export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { slug } = await params;

    // Retired tools are filtered at *read* time rather than deleted from the
    // database (see RETIRED_TOOL_SLUGS in lib/tools-db.ts), so the row is still
    // here and every read path has to exclude it itself. The row exists but the
    // resource is unpublished, and the rest of the site already answers that
    // way — getToolBySlug() returns null and /tool/[slug] is 301'd in
    // next.config.ts — so the API answers "not found" rather than handing out a
    // record that no listing contains. The admin write paths below are
    // deliberately untouched, so the retirement stays reversible.
    if (isRetiredTool(slug)) {
      return createErrorResponse("Tool not found", 404);
    }

    const tool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!tool) {
      return createErrorResponse("Tool not found", 404);
    }

    return NextResponse.json({ tool });
  } catch (error) {
    console.error("Error fetching tool:", error);
    return createErrorResponse("Failed to fetch tool", 500);
  }
}

// PUT - 도구 수정 (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: Props
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const { slug } = await params;
    const body = await request.json();

    const {
      title,
      description,
      category,
      pricing,
      websiteUrl,
      affiliateUrl,
      features,
      color,
      bgGradient,
    } = body;

    // 도구 존재 확인
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!existingTool) {
      return createErrorResponse("Tool not found", 404);
    }

    // 도구 수정
    const tool = await prisma.tool.update({
      where: { slug },
      data: {
        title,
        description,
        category,
        pricing,
        websiteUrl,
        affiliateUrl,
        features: features || [],
        color,
        bgGradient,
      },
    });

    return NextResponse.json(
      { message: "Tool updated successfully", tool }
    );
  } catch (error) {
    console.error("Error updating tool:", error);
    return createErrorResponse("Failed to update tool", 500);
  }
}

// DELETE - 도구 삭제 (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const { slug } = await params;

    // 도구 존재 확인
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!existingTool) {
      return createErrorResponse("Tool not found", 404);
    }

    // 도구 삭제
    await prisma.tool.delete({
      where: { slug },
    });

    return NextResponse.json(
      { message: "Tool deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting tool:", error);
    return createErrorResponse("Failed to delete tool", 500);
  }
}
