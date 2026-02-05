import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const tool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ tool });
  } catch (error) {
    console.error("Error fetching tool:", error);
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    );
  }
}

// PUT - 도구 수정
export async function PUT(
  request: NextRequest,
  { params }: Props
) {
  try {
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
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
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
    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}

// DELETE - 도구 삭제
export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { slug } = await params;

    // 도구 존재 확인
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!existingTool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
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
    return NextResponse.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
}
