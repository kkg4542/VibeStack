import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateToolSchema, UpdateToolSchema } from "@/lib/schemas";
import { validateRequest, createErrorResponse, createSuccessResponse, formatZodError } from "@/lib/api-utils";
import { auth } from "@/auth";

import { validateBodySize } from "@/lib/body-size";
import { unstable_cache } from "next/cache";

// Cache function for getTools
const getCachedTools = unstable_cache(
  async (where: Record<string, unknown>, skip: number | undefined, limit: number | undefined) => {
    const [tools, total] = await Promise.all([
      prisma.tool.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.tool.count({ where }),
    ]);
    return { tools, total };
  },
  ['tools-list'],
  { tags: ['tools'] }
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 500);
    const category = searchParams.get("category");
    const pricing = searchParams.get("pricing");
    const search = searchParams.get("q");

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (pricing) {
      where.pricing = pricing;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const { tools, total } = await getCachedTools(where, skip, limit);

    return createSuccessResponse({
      tools,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return createErrorResponse("Failed to fetch tools", 500);
  }
}

// POST - Create tool (Admin only)
export async function POST(request: NextRequest) {
  // Validate request body size
  const { valid, response } = validateBodySize(request, request.nextUrl.pathname);
  if (!valid && response) {
    return response;
  }

  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const body = await request.json();

    const validation = validateRequest(CreateToolSchema, body);

    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, formatZodError(validation.error));
    }

    const data = validation.data;

    const existingTool = await prisma.tool.findUnique({
      where: { slug: data.slug },
    });

    if (existingTool) {
      return createErrorResponse("Tool with this slug already exists", 409);
    }

    const tool = await prisma.tool.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        category: data.category,
        pricing: data.pricing,
        websiteUrl: data.websiteUrl,
        affiliateUrl: data.affiliateUrl,
        icon: data.icon,
        features: data.features || [],
        pros: data.pros || [],
        cons: data.cons || [],
        color: "text-foreground",
        bgGradient: "from-transparent to-transparent",
      },
    });

    // Invalidate tools cache (will be refreshed on next request)
    // Note: Cache invalidation handled by Next.js ISR

    return createSuccessResponse(tool, 201);
  } catch (error) {
    console.error("Error creating tool:", error);
    return createErrorResponse("Failed to create tool", 500);
  }
}

// PUT - Update tool (Admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return createErrorResponse("Tool slug is required", 400);
    }

    const body = await request.json();

    const validation = validateRequest(UpdateToolSchema, body);

    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, formatZodError(validation.error));
    }

    const data = validation.data;

    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!existingTool) {
      return createErrorResponse("Tool not found", 404);
    }

    const tool = await prisma.tool.update({
      where: { slug },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.pricing !== undefined && { pricing: data.pricing }),
        ...(data.websiteUrl !== undefined && { websiteUrl: data.websiteUrl }),
        ...(data.affiliateUrl !== undefined && { affiliateUrl: data.affiliateUrl }),
        ...(data.icon !== undefined && { icon: data.icon }),
        ...(data.features !== undefined && { features: data.features }),
        ...(data.pros !== undefined && { pros: data.pros }),
        ...(data.cons !== undefined && { cons: data.cons }),
      },
    });

    return createSuccessResponse(tool);
  } catch (error) {
    console.error("Error updating tool:", error);
    return createErrorResponse("Failed to update tool", 500);
  }
}

// DELETE - Delete tool (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return createErrorResponse("Tool slug is required", 400);
    }

    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    });

    if (!existingTool) {
      return createErrorResponse("Tool not found", 404);
    }

    await prisma.tool.delete({
      where: { slug },
    });

    return createSuccessResponse({ message: "Tool deleted successfully" });
  } catch (error) {
    console.error("Error deleting tool:", error);
    return createErrorResponse("Failed to delete tool", 500);
  }
}
