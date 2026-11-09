import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSubmissionApprovedEmail } from "@/lib/emails";
import { requireAdminMutation } from "@/lib/admin-guard";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * A paid tier is granted by createToolFromSubmission from `submission.tier`,
 * so approving one here must be backed by a real payment. Stripe is the only
 * thing that records one: lib/stripe-events.ts (checkout.session.completed)
 * sets `paymentId` and status "approved" in the same transaction. "paid" is a
 * legacy status the admin list still styles. Anything else on a paid tier —
 * "pending_payment" (checkout never finished), "failed" (session expired or
 * payment failed), "refunded" — has no payment behind it.
 */
function hasConfirmedPayment(submission: { status: string; paymentId: string | null }): boolean {
  if (submission.status === "refunded") return false;
  return Boolean(submission.paymentId) || submission.status === "paid";
}

export async function POST(request: NextRequest, { params }: Props) {
  const denied = await requireAdminMutation(request);
  if (denied) return denied;

  const { id } = await params;

  const submission = await prisma.submission.findUnique({
    where: { id },
  });

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  if (submission.status !== "approved") {
    if (submission.tier !== "free" && !hasConfirmedPayment(submission)) {
      return NextResponse.json(
        {
          error:
            `This is a "${submission.tier}" submission with no confirmed Stripe payment ` +
            `(status "${submission.status}"). Approving it would grant the paid tier for free.`,
          code: "PAYMENT_REQUIRED",
          submissionId: submission.id,
          tier: submission.tier,
          status: submission.status,
        },
        { status: 402 }
      );
    }

    await createToolFromSubmission(submission);
    await prisma.submission.update({
      where: { id },
      data: { status: "approved" },
    });
    try {
      await sendSubmissionApprovedEmail({
        to: submission.email,
        toolName: submission.toolName,
        tier: submission.tier,
        websiteUrl: submission.websiteUrl,
      });
    } catch (error) {
      console.error("Failed to send approval email:", error);
    }
  }

  return NextResponse.redirect(new URL("/admin/submissions", request.url));
}
