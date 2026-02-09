import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { SponsorshipPlacements } from "@/lib/sponsorships";

const PRICE_IDS: Record<string, string | undefined> = {
  [SponsorshipPlacements.newsletter]:
    process.env.STRIPE_NEWSLETTER_SPONSOR_PRICE_ID,
  [SponsorshipPlacements.featuredSpotlight]:
    process.env.STRIPE_FEATURED_SPOTLIGHT_PRICE_ID,
  [SponsorshipPlacements.sidebarAd]:
    process.env.STRIPE_SIDEBAR_AD_PRICE_ID,
};

function getBaseUrl(request: NextRequest): string {
  return (
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { placement, toolSlug, sponsorName, sponsorUrl, sponsorEmail, sponsorCopy } = body;

    if (!placement || !PRICE_IDS[placement]) {
      return NextResponse.json({ error: "Invalid placement" }, { status: 400 });
    }

    let toolId: string | null = null;
    if (placement !== SponsorshipPlacements.newsletter && !toolSlug) {
      return NextResponse.json(
        { error: "toolSlug is required for this placement" },
        { status: 400 }
      );
    }
    if (toolSlug) {
      const tool = await prisma.tool.findUnique({ where: { slug: toolSlug } });
      if (!tool) {
        return NextResponse.json({ error: "Tool not found" }, { status: 404 });
      }
      toolId = tool.id;
    }

    const stripe = getStripe();
    const baseUrl = getBaseUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: PRICE_IDS[placement]!, quantity: 1 }],
      customer_email: sponsorEmail || undefined,
      success_url: `${baseUrl}/newsletter?success=1`,
      cancel_url: `${baseUrl}/newsletter?canceled=1`,
      metadata: {
        type: "sponsorship",
        placement,
        toolSlug: toolSlug || "",
        sponsorName: sponsorName || "",
        sponsorUrl: sponsorUrl || "",
        sponsorEmail: sponsorEmail || "",
        sponsorCopy: sponsorCopy || "",
        toolId: toolId || "",
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Sponsorship checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create sponsorship checkout" },
      { status: 500 }
    );
  }
}
