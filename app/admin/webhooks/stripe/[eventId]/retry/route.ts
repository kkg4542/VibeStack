import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSubmissionApprovedEmail, sendSubmissionFailedEmail } from "@/lib/emails";
import { sendSlackAlert } from "@/lib/alerts";

interface Props {
  params: Promise<{ eventId: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  const { eventId } = await params;
  const stripe = getStripe();

  try {
    let event;
    try {
      event = await stripe.events.retrieve(eventId);
    } catch (err) {
      console.warn("Stripe retrieve failed, falling back to database payload", err);
      const storedEvent = await prisma.webhookEvent.findUnique({
        where: { eventId },
      });
      if (storedEvent && storedEvent.payload) {
        event = JSON.parse(storedEvent.payload);
      } else {
        throw err;
      }
    }

    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: "received", error: null },
    });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as {
          metadata?: Record<string, string>;
          payment_intent?: string;
          amount_total?: number;
        };
        const metadata = session.metadata || {};
        if (metadata.type === "submission" && metadata.submissionId) {
          const submission = await prisma.submission.findUnique({
            where: { id: metadata.submissionId },
          });
          if (submission && submission.status !== "approved") {
            await prisma.$transaction(async (tx) => {
              await createToolFromSubmission(submission, tx);
              await tx.submission.update({
                where: { id: submission.id },
                data: {
                  paymentId: session.payment_intent?.toString() || event.id,
                  status: "approved",
                  amount: session.amount_total ?? undefined,
                },
              });
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
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as {
          metadata?: Record<string, string>;
          customer_email?: string;
        };
        const metadata = session.metadata || {};
        if (metadata.type === "submission" && metadata.submissionId) {
          await prisma.submission.updateMany({
            where: {
              id: metadata.submissionId,
              status: { in: ["pending_payment", "pending"] },
            },
            data: { status: "failed" },
          });
          if (session.customer_email) {
            try {
              await sendSubmissionFailedEmail({
                to: session.customer_email,
                toolName: metadata.toolName || "your tool",
                reason: "Checkout session expired",
              });
            } catch (error) {
              console.error("Failed to send failure email:", error);
            }
          }
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object as {
          metadata?: Record<string, string>;
          receipt_email?: string;
        };
        const submissionId = intent.metadata?.submissionId;
        if (submissionId) {
          await prisma.submission.updateMany({
            where: {
              id: submissionId,
              status: { in: ["pending_payment", "pending"] },
            },
            data: { status: "failed" },
          });
          if (intent.receipt_email) {
            try {
              await sendSubmissionFailedEmail({
                to: intent.receipt_email,
                toolName: intent.metadata?.toolName || "your tool",
                reason: "Payment failed",
              });
            } catch (error) {
              console.error("Failed to send failure email:", error);
            }
          }
        }
        break;
      }
      default:
        break;
    }

    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: "processed", error: null },
    });

    return NextResponse.redirect(new URL("/admin/webhooks", request.url));
  } catch (error) {
    console.error("Webhook retry failed:", error);
    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: "failed", error: String(error) },
    });
    try {
      await sendSlackAlert(`Stripe webhook retry failed: ${eventId} - ${String(error)}`);
    } catch (slackError) {
      console.error("Failed to send Slack alert:", slackError);
    }
    return NextResponse.redirect(new URL("/admin/webhooks", request.url));
  }
}
