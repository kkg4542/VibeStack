import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

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
    const body = await request.json();
    const { toolName, description, websiteUrl, category, pricing, email, tier } = body;

    if (!toolName || !description || !websiteUrl || !category || !pricing || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedTier = tier || "free";
    const amount =
      normalizedTier === "free" ? 0 : normalizedTier === "priority" ? 4900 : 14900;

    const submission = await prisma.submission.create({
      data: {
        toolName,
        description,
        websiteUrl,
        category,
        pricing,
        email: email.toLowerCase().trim(),
        tier: normalizedTier,
        amount,
        status: normalizedTier === "free" ? "pending" : "pending_payment",
      },
    });

    if (normalizedTier === "free") {
      return NextResponse.json({
        success: true,
        submissionId: submission.id,
        submitted: true,
      });
    }

    const priceId = PRICE_IDS[normalizedTier];
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
        tier: normalizedTier,
        type: "submission",
      },
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Error creating submission checkout:", error);
    return NextResponse.json(
      { error: "Failed to create submission checkout" },
      { status: 500 }
    );
  }
}
