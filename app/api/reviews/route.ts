import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CreateReviewSchema } from "@/lib/schemas";
import { validateRequest, createErrorResponse, createSuccessResponse, formatZodError } from "@/lib/api-utils";
import { NextRequest } from "next/server";
import { validateBodySize } from "@/lib/body-size";
import { limitOrRespond, routeRateLimits } from "@/lib/route-rate-limit";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const toolId = searchParams.get("toolId");
  const toolSlug = searchParams.get("toolSlug");

  if (!toolId && !toolSlug) {
    return createErrorResponse("Tool ID or slug is required", 400);
  }

  try {
    let toolIdToQuery = toolId;

    if (toolSlug && !toolId) {
      const tool = await prisma.tool.findUnique({
        where: { slug: toolSlug },
        select: { id: true },
      });

      if (!tool) {
        return createErrorResponse("Tool not found", 404);
      }

      toolIdToQuery = tool.id;
    }

    const reviews = await prisma.review.findMany({
      where: { toolId: toolIdToQuery! },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return createSuccessResponse(reviews);
  } catch (error) {
    return createErrorResponse("Failed to fetch reviews", 500);
  }
}

export async function POST(request: NextRequest) {
  // Validate request body size
  const { valid, response } = validateBodySize(request, request.nextUrl.pathname);
  if (!valid && response) {
    return response;
  }

  const session = await auth();

  if (!session || !session.user) {
    return createErrorResponse("Unauthorized", 401);
  }

  // Per user, not per IP: the write is attributed to the account, and the
  // one-review-per-tool rule below is what a throwaway-account loop works around.
  const limited = await limitOrRespond(
    `review-create:${session.user.id ?? session.user.email ?? "anonymous"}`,
    routeRateLimits.reviewCreate
  );
  if (limited) return limited;

  try {
    const body = await request.json();

    const validation = validateRequest(CreateReviewSchema, body);

    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, formatZodError(validation.error));
    }

    const { toolSlug, rating, content } = validation.data;

    // Check if tool exists
    const tool = await prisma.tool.findUnique({
      where: { slug: toolSlug },
    });

    if (!tool) {
      return createErrorResponse("Tool not found", 404);
    }

    // Check if user already reviewed this tool
    const existingReview = await prisma.review.findFirst({
      where: {
        toolId: tool.id,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return createErrorResponse("You have already reviewed this tool", 409);
    }

    const review = await prisma.review.create({
      data: {
        toolId: tool.id,
        rating,
        content,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return createSuccessResponse(review, 201);
  } catch (error) {
    return createErrorResponse("Failed to create review", 500);
  }
}
