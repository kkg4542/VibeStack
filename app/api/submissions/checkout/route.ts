import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { z } from "zod";
import { validateBodySize } from "@/lib/body-size";

import { checkoutSchema } from "@/lib/validations/forms";

const PRICE_IDS: Record<string, string | undefined> = {
  priority: process.env.STRIPE_SUBMISSION_PRIORITY_PRICE_ID,
  premium: process.env.STRIPE_SUBMISSION_PREMIUM_PRICE_ID,
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
    // Validate request body size
    const { valid: sizeValid, response: sizeResponse } = validateBodySize(request, "/api/submissions");
    if (!sizeValid && sizeResponse) {
      return sizeResponse;
    }

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
    const baseUrl = getBaseUrl(request);

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

