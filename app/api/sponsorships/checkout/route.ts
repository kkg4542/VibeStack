import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { SponsorshipPlacements } from "@/lib/sponsorships";
import { formatZodError } from "@/lib/api-utils";
import { getClientIp, limitOrRespond, routeRateLimits } from "@/lib/route-rate-limit";
import { checkoutConfigErrorResponse, getCheckoutBaseUrl } from "@/lib/checkout-base-url";

const PRICE_IDS: Record<string, string | undefined> = {
  [SponsorshipPlacements.newsletter]:
    process.env.STRIPE_NEWSLETTER_SPONSOR_PRICE_ID,
  [SponsorshipPlacements.featuredSpotlight]:
    process.env.STRIPE_FEATURED_SPOTLIGHT_PRICE_ID,
  [SponsorshipPlacements.sidebarAd]:
    process.env.STRIPE_SIDEBAR_AD_PRICE_ID,
};

const PLACEMENTS = Object.values(SponsorshipPlacements) as [string, ...string[]];

/**
 * Every field below is copied into Stripe metadata and, once the session
 * completes, into the Sponsorship row lib/stripe-events.ts upserts — where
 * sponsorUrl becomes a link we render. Stripe caps a metadata value at 500
 * characters, so nothing here may exceed that. Empty strings are accepted as
 * "not provided", matching what an HTML form sends for a blank field.
 */
const httpUrl = z
  .string()
  .trim()
  .max(500)
  .url("Must be a valid URL")
  .refine((value) => /^https?:\/\//i.test(value), "URL must start with http:// or https://");

const sponsorshipCheckoutSchema = z.object({
  placement: z.enum(PLACEMENTS, { message: "Invalid placement" }),
  toolSlug: z.string().trim().max(100).optional(),
  sponsorName: z.string().trim().max(100).optional(),
  sponsorUrl: z.union([z.literal(""), httpUrl]).optional(),
  sponsorEmail: z
    .union([z.literal(""), z.string().trim().max(254).email("Invalid email address")])
    .optional(),
  sponsorCopy: z.string().trim().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const limited = await limitOrRespond(
      `sponsorship-checkout:${getClientIp(request)}`,
      routeRateLimits.sponsorshipCheckout
    );
    if (limited) return limited;

    const body = await request.json().catch(() => null);
    const parsed = sponsorshipCheckoutSchema.safeParse(body);
    if (!parsed.success) {
      const details = formatZodError(parsed.error);
      return NextResponse.json(
        {
          error: details.some((d) => d.field === "placement") ? "Invalid placement" : "Validation failed",
          details,
        },
        { status: 400 }
      );
    }

    const { placement, toolSlug, sponsorName, sponsorUrl, sponsorEmail, sponsorCopy } = parsed.data;

    const priceId = PRICE_IDS[placement];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid placement" }, { status: 400 });
    }

    // toolSlug is optional — advertisers shouldn't need to know an internal
    // slug to pay. If they provide a valid one we link it now; otherwise the
    // tool is attached later from the admin sponsorship view.
    let toolId: string | null = null;
    if (toolSlug) {
      const tool = await prisma.tool.findUnique({ where: { slug: toolSlug } });
      if (tool) {
        toolId = tool.id;
      }
    }

    const baseUrl = getCheckoutBaseUrl(request);
    if (!baseUrl) {
      return checkoutConfigErrorResponse();
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: sponsorEmail || undefined,
      success_url: `${baseUrl}/sponsor?success=1`,
      cancel_url: `${baseUrl}/sponsor?canceled=1`,
      metadata: {
        type: "sponsorship",
        placement,
        toolSlug: toolId ? toolSlug || "" : "",
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
