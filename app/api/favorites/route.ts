import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Favorites API contract
 *
 *   GET    /api/favorites            -> FavoriteWithTool[] (raw array; each row has
 *                                       `toolId` = DB id and `tool.slug`)
 *   POST   /api/favorites            body { toolId?, toolSlug? }
 *   DELETE /api/favorites            body { toolId?, toolSlug? }
 *
 * `toolId` may be the tool's DB id OR its slug; `toolSlug` is slug only. The
 * client sends `toolSlug` (slugs are what it knows). At least one is required.
 *
 *   POST   201 new row | 200 already favorited (idempotent) | 400 bad input |
 *          401 | 404 unknown tool
 *   DELETE 200 { success, removed } (removed may be 0: idempotent) | 400 | 401 |
 *          404 unknown tool
 */

const ToolRefSchema = z
  .object({
    toolId: z.string().trim().min(1).max(200).optional(),
    toolSlug: z.string().trim().min(1).max(200).optional(),
  })
  .refine((v) => v.toolId || v.toolSlug, {
    message: "toolId or toolSlug is required",
  });

type ToolRef = z.infer<typeof ToolRefSchema>;

async function parseToolRef(
  request: Request
): Promise<{ ok: true; ref: ToolRef } | { ok: false; response: NextResponse }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
    };
  }
  const parsed = ToolRefSchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Tool ID or slug is required" },
        { status: 400 }
      ),
    };
  }
  return { ok: true, ref: parsed.data };
}

/** Resolve a DB id or slug to a tool id. Returns null when no tool matches. */
async function resolveToolId(ref: ToolRef): Promise<string | null> {
  if (ref.toolId) {
    const byId = await prisma.tool.findUnique({
      where: { id: ref.toolId },
      select: { id: true },
    });
    if (byId) return byId.id;
    // `toolId` may be a slug (the client only knows slugs).
    const bySlugAsId = await prisma.tool.findUnique({
      where: { slug: ref.toolId },
      select: { id: true },
    });
    if (bySlugAsId) return bySlugAsId.id;
  }
  if (ref.toolSlug) {
    const bySlug = await prisma.tool.findUnique({
      where: { slug: ref.toolSlug },
      select: { id: true },
    });
    if (bySlug) return bySlug.id;
  }
  return null;
}

// GET /api/favorites - Get user's favorites
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: { tool: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// POST /api/favorites - Add tool to favorites (idempotent)
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const parsed = await parseToolRef(request);
    if (!parsed.ok) return parsed.response;

    const toolId = await resolveToolId(parsed.ref);
    if (!toolId) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const existing = await prisma.favorite.findUnique({
      where: { userId_toolId: { userId, toolId } },
      include: { tool: true },
    });
    if (existing) {
      return NextResponse.json(existing, { status: 200 });
    }

    try {
      const favorite = await prisma.favorite.create({
        data: { userId, toolId },
        include: { tool: true },
      });
      return NextResponse.json(favorite, { status: 201 });
    } catch (error) {
      // Lost a race with a concurrent add of the same tool: still a success.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const raced = await prisma.favorite.findUnique({
          where: { userId_toolId: { userId, toolId } },
          include: { tool: true },
        });
        if (raced) return NextResponse.json(raced, { status: 200 });
      }
      throw error;
    }
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites - Remove tool from favorites (idempotent)
export async function DELETE(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = await parseToolRef(request);
    if (!parsed.ok) return parsed.response;

    const toolId = await resolveToolId(parsed.ref);
    if (!toolId) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const { count } = await prisma.favorite.deleteMany({
      where: {
        userId: session.user.id,
        toolId,
      },
    });

    return NextResponse.json({ success: true, removed: count });
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
