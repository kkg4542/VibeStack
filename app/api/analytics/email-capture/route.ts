import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { formatZodError } from "@/lib/api-utils";
import { getClientIp, limitOrRespond, routeRateLimits } from "@/lib/route-rate-limit";

/**
 * The sources the UI actually sends: components/ui/ExitIntentPopup.tsx
 * ("exit_intent") and components/landing/QuizLeadCapture.tsx ("quiz"). The
 * dashboard groups by this column, so a free-form string let any caller mint
 * new rows in the admin's source breakdown. Add a value here when a new
 * capture point ships.
 */
const EMAIL_CAPTURE_SOURCES = ["exit_intent", "quiz"] as const;

const emailCaptureSchema = z.object({
  email: z.string().trim().max(254).email("Valid email required"),
  source: z.enum(EMAIL_CAPTURE_SOURCES).optional(),
  toolSlug: z.string().trim().max(100).nullable().optional(),
  // Callers send a JSON.stringify'd object; stored as an opaque string.
  metadata: z.string().max(2000).nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const limited = await limitOrRespond(
      `email-capture:${getClientIp(request)}`,
      routeRateLimits.emailCapture
    );
    if (limited) return limited;

    const body = await request.json().catch(() => null);
    const parsed = emailCaptureSchema.safeParse(body);
    if (!parsed.success) {
      const details = formatZodError(parsed.error);
      return NextResponse.json(
        {
          error: details.some((d) => d.field === "email") ? "Valid email required" : "Validation failed",
          details,
        },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();
    const source = parsed.data.source ?? "exit_intent";
    const toolSlug = parsed.data.toolSlug || null;
    const metadata = parsed.data.metadata || null;

    // Create or update email capture
    const capture = await prisma.emailCapture.upsert({
      where: {
        email_source: { email, source },
      },
      update: { toolSlug, metadata },
      create: { email, source, toolSlug, metadata },
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
