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

    // If no testimonials in database, return fallback mock data
    if (testimonials.length === 0) {
      return getFallbackTestimonials().slice(0, limit);
    }

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

// Fallback mock testimonials when database is empty
function getFallbackTestimonials(): VerifiedTestimonial[] {
  return [
    {
      id: "1",
      user: {
        name: "Sarah Chen",
        handle: "@sarahchen_dev",
        avatar: null,
        verified: true,
        role: "Senior Developer",
        company: "TechCorp",
      },
      stackName: "10x Engineer",
      toolName: null,
      rating: 5,
      content: "VibeStack helped me discover tools that 3x'd my productivity. The curated selection is incredible!",
      metrics: {
        productivityGain: "3x",
        timeSaved: "15h/week",
        roi: "$3000/mo",
      },
      videoUrl: null,
      socialProof: {
        likes: 42,
        retweets: 12,
      },
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      user: {
        name: "Alex Rodriguez",
        handle: "@arod_tech",
        avatar: null,
        verified: true,
        role: "Product Manager",
        company: "StartupXYZ",
      },
      stackName: "Product Designer",
      toolName: null,
      rating: 5,
      content: "Best collection of AI tools in one place. Saves me hours of research every week.",
      metrics: {
        productivityGain: "2.5x",
        timeSaved: "10h/week",
        roi: "$2000/mo",
      },
      videoUrl: null,
      socialProof: {
        likes: 28,
        retweets: 8,
      },
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      user: {
        name: "Maya Patel",
        handle: "@mayap_codes",
        avatar: null,
        verified: true,
        role: "Tech Lead",
        company: "DevStudio",
      },
      stackName: "Magic Wand",
      toolName: null,
      rating: 5,
      content: "The stack builder feature is genius. Found the perfect combo of tools for our team.",
      metrics: {
        productivityGain: "4x",
        timeSaved: "20h/week",
        roi: "$5000/mo",
      },
      videoUrl: null,
      socialProof: {
        likes: 56,
        retweets: 18,
      },
      createdAt: new Date("2024-02-01"),
    },
  ];
}