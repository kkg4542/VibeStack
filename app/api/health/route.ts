import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/lib/api-utils";

export async function GET() {
  try {

    // 데이터베이스 연결 테스트
    const toolsCount = await prisma.tool.count();
    const stacksCount = await prisma.stack.count();
    const blogCount = await prisma.blogPost.count();

    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      message: "Database connected successfully",
      data: {
        tools: toolsCount,
        stacks: stacksCount,
        blogPosts: blogCount,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return createErrorResponse(
      "Database connection failed",
      500,
      { error: error instanceof Error ? error.message : "Unknown error" }
    );
  }
}
