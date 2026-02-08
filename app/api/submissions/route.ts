import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolName, description, websiteUrl, category, pricing, email, tier, amount } = body;

    // Validation
    if (!toolName || !description || !websiteUrl || !category || !pricing || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        toolName,
        description,
        websiteUrl,
        category,
        pricing,
        email: email.toLowerCase().trim(),
        tier: tier || "free",
        amount: amount || 0,
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