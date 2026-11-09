import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import {
  getCommunityStacks,
  createCommunityStack,
  CommunityStackFilters,
} from '@/lib/data/community-stacks';
import { validateBodySize } from '@/lib/body-size';
import { prisma } from '@/lib/prisma';
import { formatZodError } from '@/lib/api-utils';
import { limitOrRespond, routeRateLimits } from '@/lib/route-rate-limit';

const createStackSchema = z.object({
  name: z
    .string({ message: 'Name and at least one tool are required' })
    .trim()
    .min(1, 'Name and at least one tool are required')
    .max(100, 'Stack name must be 100 characters or less'),
  description: z
    .string()
    .max(1000, 'Description must be 1000 characters or less')
    .optional(),
  toolIds: z
    .array(z.string().trim().min(1, 'Invalid tool id').max(100, 'Invalid tool id'), {
      message: 'Name and at least one tool are required',
    })
    .min(1, 'Name and at least one tool are required')
    .max(20, 'A stack can have at most 20 tools'),
  isPublic: z.boolean().optional(),
});

// GET /api/community-stacks - List community stacks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse filters
    const filters: CommunityStackFilters = {
      search: searchParams.get('search') || undefined,
      sortBy: (searchParams.get('sortBy') as CommunityStackFilters['sortBy']) || 'popular',
      timeRange: (searchParams.get('timeRange') as CommunityStackFilters['timeRange']) || 'all',
    };

    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const { stacks, totalCount } = await getCommunityStacks(filters, limit, offset);

    return NextResponse.json({
      stacks,
      totalCount,
      hasMore: offset + stacks.length < totalCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch community stacks' },
      { status: 500 }
    );
  }
}

// POST /api/community-stacks - Create a new community stack
export async function POST(request: NextRequest) {
  // Validate request body size
  const { valid, response } = validateBodySize(request, request.nextUrl.pathname);
  if (!valid && response) {
    return response;
  }

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const limited = await limitOrRespond(
      `community-stack-create:${session.user.id}`,
      routeRateLimits.communityStackCreate
    );
    if (limited) return limited;

    const body = await request.json().catch(() => null);
    const parsed = createStackSchema.safeParse(body);
    if (!parsed.success) {
      // app/submit-stack/page.tsx shows `error` verbatim, so lead with the
      // first human-readable message rather than a generic label.
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || 'Invalid stack',
          details: formatZodError(parsed.error),
        },
        { status: 400 }
      );
    }

    const { name, description, isPublic } = parsed.data;
    const toolIds = [...new Set(parsed.data.toolIds)];

    // A bad id used to surface as a generic 500 from Prisma's connect.
    const found = await prisma.tool.findMany({
      where: { id: { in: toolIds } },
      select: { id: true },
    });
    if (found.length !== toolIds.length) {
      const known = new Set(found.map((t) => t.id));
      const unknownToolIds = toolIds.filter((id) => !known.has(id));
      return NextResponse.json(
        {
          error: 'One or more selected tools no longer exist. Remove them and try again.',
          unknownToolIds,
        },
        { status: 400 }
      );
    }

    const stack = await createCommunityStack({
      userId: session.user.id,
      name,
      description,
      toolIds,
      isPublic: isPublic ?? true,
    });

    return NextResponse.json({ stack }, { status: 201 });
  } catch (error) {
    console.error('Error creating community stack:', error);
    return NextResponse.json(
      { error: 'Failed to create community stack' },
      { status: 500 }
    );
  }
}
