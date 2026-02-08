import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, toolSlug, metadata } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Create or update email capture
    const capture = await prisma.emailCapture.upsert({
      where: {
        email_source: {
          email: email.toLowerCase().trim(),
          source: source || "exit_intent",
        },
      },
      update: {
        toolSlug: toolSlug || null,
        metadata: metadata || null,
      },
      create: {
        email: email.toLowerCase().trim(),
        source: source || "exit_intent",
        toolSlug: toolSlug || null,
        metadata: metadata || null,
      },
    });

    return NextResponse.json({ success: true, captureId: capture.id });
  } catch (error) {
    console.error("Error capturing email:", error);
    return NextResponse.json(
      { error: "Failed to capture email" },
      { status: 500 }
    );
  }
}