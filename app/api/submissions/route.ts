import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const submissionSchema = z.object({
  toolName: z.string().min(2).max(100),
  description: z.string().min(10).max(2000),
  websiteUrl: z.string().url(),
  category: z.string().min(1),
  pricing: z.string().min(1),
  email: z.string().email(),
  tier: z.enum(["free", "priority", "premium"]).default("free"),
  amount: z.number().default(0),
});

export async function POST(request: NextRequest) {
  try {
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
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}