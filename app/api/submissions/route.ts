import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateBodySize } from "@/lib/body-size";
import { checkHoneypotFromBody, createHoneypotResponse } from "@/lib/honeypot";
import { getClientIp, limitOrRespond, routeRateLimits } from "@/lib/route-rate-limit";

import { submissionSchema } from "@/lib/validations/forms";

/**
 * Legacy free-only submission endpoint. The site's form posts to
 * /api/submissions/checkout, which prices the tier server-side and holds paid
 * tiers at "pending_payment" until Stripe confirms. This route used to accept
 * the client's `tier` and `amount` and write "pending" regardless, which let a
 * premium listing reach the admin approve button without any payment. It now
 * only ever creates a free submission: any client-sent tier/amount is ignored.
 */
export async function POST(request: NextRequest) {
  try {
    // Validate request body size
    const { valid, response } = validateBodySize(request, "/api/submissions");
    if (!valid && response) {
      return response;
    }

    // Check honeypot field (bots will fill this, humans won't)
    const honeypotCheck = await checkHoneypotFromBody(request);
    if (!honeypotCheck.valid) {
      return createHoneypotResponse();
    }

    const limited = await limitOrRespond(
      `submissions:${getClientIp(request)}`,
      routeRateLimits.submission
    );
    if (limited) return limited;

    const body = await request.json();

    // Zod validation
    const validationResult = submissionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // tier and amount are deliberately not destructured: never trust them.
    const { toolName, description, websiteUrl, category, pricing, email } = validationResult.data;

    const submission = await prisma.submission.create({
      data: {
        toolName,
        description,
        websiteUrl,
        category,
        pricing,
        email: email.toLowerCase().trim(),
        tier: "free",
        amount: 0,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: "Submission created successfully"
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}
