import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { validateBodySize, createBodySizeExceededResponse } from "@/lib/body-size";
import { checkHoneypotFromBody, createHoneypotResponse } from "@/lib/honeypot";

import { submissionSchema } from "@/lib/validations/forms";

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

    const body = await request.json();
    
    // Zod validation
    const validationResult = submissionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { toolName, description, websiteUrl, category, pricing, email, tier, amount } = validationResult.data;

    // Create submission
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
        status: "pending",
      },
    });

    return NextResponse.json({ 
      success: true, 
      submissionId: submission.id,
      message: "Submission created successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}