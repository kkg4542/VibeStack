import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { validateBodySize } from "@/lib/body-size";
import { getClientIp, limitOrRespond, routeRateLimits } from "@/lib/route-rate-limit";
import { checkoutConfigErrorResponse, getCheckoutBaseUrl } from "@/lib/checkout-base-url";

import { checkoutSchema } from "@/lib/validations/forms";

const PRICE_IDS: Record<string, string | undefined> = {
  priority: process.env.STRIPE_SUBMISSION_PRIORITY_PRICE_ID,
  premium: process.env.STRIPE_SUBMISSION_PREMIUM_PRICE_ID,
};

export async function POST(request: NextRequest) {
  try {
    // Validate request body size
    const { valid: sizeValid, response: sizeResponse } = validateBodySize(request, "/api/submissions");
    if (!sizeValid && sizeResponse) {
      return sizeResponse;
    }

    // Per-IP: each call creates a Submission row (and, for paid tiers, a
    // Stripe Checkout session), so an unthrottled loop fills both.
    const limited = await limitOrRespond(
      `submission-checkout:${getClientIp(request)}`,
      routeRateLimits.submissionCheckout
    );
    if (limited) return limited;

    const body = await request.json();

    // Zod validation
    const validationResult = checkoutSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { toolName, description, websiteUrl, category, pricing, email, tier } = validationResult.data;

    const amount =
      tier === "free" ? 0 : tier === "priority" ? 4900 : 14900;

    // Resolved before the row is written so a misconfigured deploy does not
    // leave a pending_payment submission behind for a checkout that never opens.
    const baseUrl = tier === "free" ? null : getCheckoutBaseUrl(request);
    if (tier !== "free" && !baseUrl) {
      return checkoutConfigErrorResponse();
    }

    const submission = await prisma.submission.create({
      data: {
        toolName,
        description,
        websiteUrl,
        category,
        pricing,
        email: email.toLowerCase().trim(),
        tier,
        amount,
        status: tier === "free" ? "pending" : "pending_payment",
      },
    });

    if (tier === "free") {
      return NextResponse.json({
        success: true,
        submissionId: submission.id,
        submitted: true,
      });
    }

    const priceId = PRICE_IDS[tier];
    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price ID not configured for this tier" },
        { status: 500 }
      );
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: submission.email,
      success_url: `${baseUrl}/submit-tool?success=1&submission=${submission.id}`,
      cancel_url: `${baseUrl}/submit-tool?canceled=1&submission=${submission.id}`,
      metadata: {
        submissionId: submission.id,
        tier,
        type: "submission",
        toolName: submission.toolName,
      },
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create submission checkout" },
      { status: 500 }
    );
  }
}

