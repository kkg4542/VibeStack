import { prisma } from "@/lib/prisma";

export const SponsorshipPlacements = {
  newsletter: "newsletter",
  featuredSpotlight: "featured_spotlight",
  sidebarAd: "sidebar_ad",
} as const;

export type SponsorshipPlacement =
  (typeof SponsorshipPlacements)[keyof typeof SponsorshipPlacements];

export async function getActiveSponsorship(placement: SponsorshipPlacement) {
  return prisma.sponsorship.findFirst({
    where: {
      placement,
      status: "active",
      currentPeriodEnd: {
        gte: new Date(),
      },
    },
    include: {
      tool: true,
    },
    orderBy: {
      currentPeriodEnd: "desc",
    },
  });
}
