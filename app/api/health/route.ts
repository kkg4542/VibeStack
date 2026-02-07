import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { createErrorResponse } from "@/lib/api-utils";

export async function GET() {
  try {
    // Runtime에 환경변수 직접 확인
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return NextResponse.json({
        status: "error",
        message: "Database configuration error",
      }, { status: 500 });
    }

    // PrismaClient에 datasourceUrl 직접 전달
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });

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
