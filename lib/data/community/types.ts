import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Cache durations
export const CACHE_1MIN = 60;
export const CACHE_5MIN = 300;
export const CACHE_1HOUR = 3600;

export interface CommunityStackWithDetails {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  isFeatured: boolean;
  featuredOrder: number;
  viewCount: number;
  saveCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  curator: {
    id: string;
    name: string | null;
    image: string | null;
  };
  tools: {
    id: string;
    name: string;
    slug: string;
    category: string;
    pricing: string;
  }[];
  forkedFrom: {
    id: string;
    name: string;
  } | null;
}

export interface CommunityStackFilters {
  search?: string;
  sortBy?: 'popular' | 'newest' | 'mostSaved' | 'mostViewed';
  timeRange?: 'all' | 'week' | 'month' | 'year';
}

type CommunityStackQueryResult = Prisma.CommunityStackGetPayload<{
  include: {
    curator: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    tools: {
      select: {
        id: true;
        title: true;
        slug: true;
        category: true;
        pricing: true;
      };
    };
    forkedFrom: {
      select: {
        id: true;
        name: true;
      };
    };
    _count: {
      select: {
        likes: true;
        savedBy: true;
      };
    };
  };
}>;

// Helper function to convert Prisma CommunityStack to CommunityStackWithDetails
export function mapToCommunityStackWithDetails(stack: CommunityStackQueryResult): CommunityStackWithDetails {
  return {
    id: stack.id,
    name: stack.name,
    description: stack.description,
    isPublic: stack.isPublic,
    isFeatured: stack.isFeatured,
    featuredOrder: stack.featuredOrder,
    viewCount: stack.viewCount,
    saveCount: stack._count?.savedBy || 0,
    likeCount: stack._count?.likes || 0,
    createdAt: stack.createdAt,
    updatedAt: stack.updatedAt,
    curator: {
      id: stack.curator.id,
      name: stack.curator.name,
      image: stack.curator.image,
    },
    tools: stack.tools.map((tool) => ({
      id: tool.id,
      name: tool.title,
      slug: tool.slug,
      category: tool.category,
      pricing: tool.pricing,
    })),
    forkedFrom: stack.forkedFrom ? {
      id: stack.forkedFrom.id,
      name: stack.forkedFrom.name,
    } : null,
  };
}
