import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { VerifiedTestimonial } from "./types";
import { CACHE_5MIN } from "./constants";

// Get verified testimonials for display
export const getVerifiedTestimonials = unstable_cache(
  async (limit: number = 6): Promise<VerifiedTestimonial[]> => {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        verified: true,
        featured: true,
      },
      include: {
        stack: {
          select: {
            name: true,
          },
        },
        tool: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        featuredOrder: 'asc',
      },
      take: limit,
    });

    // No fabricated fallbacks — show only real, verified testimonials.
    // When the table is empty the section is hidden by the caller.
    return testimonials.map((t) => ({
      id: t.id,
      user: {
        name: t.user?.name || 'Anonymous',
        handle: t.userId ? `@user_${t.userId.slice(0, 8)}` : '@anonymous',
        avatar: t.user?.image || null,
        verified: t.verified,
        role: 'Developer', // Default role, can be extended in schema
        company: '', // Can be extended in schema
      },
      stackName: t.stack?.name || null,
      toolName: t.tool?.title || null,
      rating: t.rating,
      content: t.content,
      metrics: t.metrics as { productivityGain?: string; timeSaved?: string; roi?: string } || null,
      videoUrl: t.videoUrl,
      socialProof: t.socialProof as { likes: number; retweets: number } || null,
      createdAt: t.createdAt,
    }));
  },
  ["verified-testimonials"],
  { revalidate: CACHE_5MIN }
);

// Get testimonials for a specific stack
export const getStackTestimonials = unstable_cache(
  async (stackId: string, limit: number = 10): Promise<VerifiedTestimonial[]> => {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        stackId,
        verified: true,
      },
      include: {
        stack: {
          select: {
            name: true,
          },
        },
        tool: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return testimonials.map((t) => ({
      id: t.id,
      user: {
        name: t.user?.name || 'Anonymous',
        handle: t.userId ? `@user_${t.userId.slice(0, 8)}` : '@anonymous',
        avatar: t.user?.image || null,
        verified: t.verified,
        role: 'Developer',
        company: '',
      },
      stackName: t.stack?.name || null,
      toolName: t.tool?.title || null,
      rating: t.rating,
      content: t.content,
      metrics: t.metrics as { productivityGain?: string; timeSaved?: string; roi?: string } || null,
      videoUrl: t.videoUrl,
      socialProof: t.socialProof as { likes: number; retweets: number } || null,
      createdAt: t.createdAt,
    }));
  },
  ["stack-testimonials"],
  { revalidate: CACHE_5MIN }
);
