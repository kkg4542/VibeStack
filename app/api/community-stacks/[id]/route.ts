import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  getCommunityStackById,
  updateCommunityStack,
  deleteCommunityStack,
  incrementCommunityStackView,
} from '@/lib/data/community-stacks';

// GET /api/community-stacks/[id] - Get a specific community stack
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stack = await getCommunityStackById(id);

    if (!stack) {
      return NextResponse.json(
        { error: 'Stack not found' },
        { status: 404 }
      );
    }

    // Check if stack is public or user owns it
    const session = await auth();
    if (!stack.isPublic && stack.curator.id !== session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Increment view count (fire and forget)
    incrementCommunityStackView(id).catch(console.error);

    return NextResponse.json({ stack });
  } catch (error) {
    console.error('Error fetching community stack:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community stack' },
      { status: 500 }
    );
  }
}

// PATCH /api/community-stacks/[id] - Update a community stack
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, isPublic } = body;

    // Validate input
    if (name && name.length > 100) {
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

    const stack = await updateCommunityStack(id, session.user.id, {
      name,
      description,
      isPublic,
    });

    return NextResponse.json({ stack });
  } catch (error) {
    console.error('Error updating community stack:', error);
    
    if (error instanceof Error && error.message === 'Stack not found or unauthorized') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update community stack' },
      { status: 500 }
    );
  }
}

// DELETE /api/community-stacks/[id] - Delete a community stack
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await deleteCommunityStack(id, session.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting community stack:', error);
    
    if (error instanceof Error && error.message === 'Stack not found or unauthorized') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete community stack' },
      { status: 500 }
    );
  }
}
