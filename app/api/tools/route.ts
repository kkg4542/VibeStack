import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      slug,
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

    // 필수 필드 검증
    if (!slug || !title || !description || !category || !pricing || !websiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // slug 중복 확인
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (existingTool) {
      return NextResponse.json(
        { error: "Tool with this slug already exists" },
        { status: 409 }
      );
    }

    // 도구 생성
    const tool = await prisma.tool.create({
      data: {
        slug,
        title,
        description,
        category,
        pricing,
        websiteUrl,
        affiliateUrl,
        features: features || [],
        color: color || "text-foreground",
        bgGradient: bgGradient || "from-transparent to-transparent",
      },
    });

    return NextResponse.json(
      { message: "Tool created successfully", tool },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tool:", error);
    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
}
