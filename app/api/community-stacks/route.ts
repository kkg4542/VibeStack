import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  getCommunityStacks,
  createCommunityStack,
  CommunityStackFilters,
} from '@/lib/data/community-stacks';
import { validateBodySize } from '@/lib/body-size';

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

    const body = await request.json();
    const { name, description, toolIds, isPublic } = body;

    // Validate required fields
    if (!name || !toolIds || toolIds.length === 0) {
      return NextResponse.json(
        { error: 'Name and at least one tool are required' },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Stack name must be 100 characters or less' },
        { status: 400 }
      );
    }

    if (description && description.length > 1000) {
      return NextResponse.json(
        { error: 'Description must be 1000 characters or less' },
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
