import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSubmissionApprovedEmail, sendSubmissionFailedEmail } from "@/lib/emails";
import { sendSlackAlert } from "@/lib/alerts";
import { SponsorshipPlacements } from "@/lib/sponsorships";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event;
  const stripe = getStripe();

  let webhookEventId: string | null = null;
  try {
    const payload = await request.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "STRIPE_WEBHOOK_SECRET is not set" },
        { status: 500 }
      );
    }

    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    // Log the webhook event
    await prisma.webhookEvent.create({
      data: {
        provider: "stripe",
        eventId: event.id,
        type: event.type,
        status: "received",
        payload: JSON.stringify(event),
      },
    });

    webhookEventId = event.id;
    await prisma.webhookEvent.upsert({
      where: { eventId: event.id },
      update: {
        status: "received",
        type: event.type,
        payload,
      },
      create: {
        provider: "stripe",
        eventId: event.id,
        type: event.type,
        status: "received",
        payload,
      },
    });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    try {
      await sendSlackAlert(`Stripe webhook signature error: ${String(error)}`);
    } catch (slackError) {
      console.error("Failed to send Slack alert:", slackError);
    }
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata || {};

        if (metadata.type === "submission" && metadata.submissionId) {
          const submission = await prisma.submission.findUnique({
            where: { id: metadata.submissionId },
          });

          if (!submission) break;
          if (submission.status === "approved") break;

          await prisma.$transaction(async (tx) => {
            await createToolFromSubmission(submission, tx);
            await tx.submission.update({
              where: { id: submission.id },
              data: {
                paymentId: session.payment_intent?.toString() || session.id,
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

        if (metadata.type === "sponsorship") {
          const subscriptionId = session.subscription?.toString();
          if (subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);

            await prisma.sponsorship.upsert({
              where: { stripeSubscriptionId: subscriptionId },
              update: {
                status: subscription.status,
                priceId: subscription.items.data[0]?.price.id,
                stripeCustomerId: subscription.customer?.toString(),
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                sponsorName: metadata.sponsorName || null,
                sponsorUrl: metadata.sponsorUrl || null,
                sponsorEmail: metadata.sponsorEmail || null,
                sponsorCopy: metadata.sponsorCopy || null,
                toolId: metadata.toolId || null,
                placement: metadata.placement || SponsorshipPlacements.newsletter,
              },
              create: {
                placement: metadata.placement || SponsorshipPlacements.newsletter,
                status: subscription.status,
                priceId: subscription.items.data[0]?.price.id,
                stripeSubscriptionId: subscriptionId,
                stripeCustomerId: subscription.customer?.toString(),
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                sponsorName: metadata.sponsorName || null,
                sponsorUrl: metadata.sponsorUrl || null,
                sponsorEmail: metadata.sponsorEmail || null,
                sponsorCopy: metadata.sponsorCopy || null,
                toolId: metadata.toolId || null,
              },
            });

            if (metadata.placement === SponsorshipPlacements.featuredSpotlight && metadata.toolId) {
              await prisma.tool.update({
                where: { id: metadata.toolId },
                data: { isFeatured: true },
              });
            }

          }
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object;
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
        const paymentIntent = event.data.object;
        const submissionId = paymentIntent.metadata?.submissionId;

        if (submissionId) {
          await prisma.submission.updateMany({
            where: {
              id: submissionId,
              status: { in: ["pending_payment", "pending"] },
            },
            data: { status: "failed" },
          });

          if (paymentIntent.receipt_email) {
            try {
              await sendSubmissionFailedEmail({
                to: paymentIntent.receipt_email,
                toolName: paymentIntent.metadata?.toolName || "your tool",
                reason: "Payment failed",
              });
            } catch (error) {
              console.error("Failed to send failure email:", error);
            }
          }
        }
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as {
          payment_intent?: string | null;
        };
        const paymentIntentId = charge.payment_intent?.toString();
        if (paymentIntentId) {
          await prisma.submission.updateMany({
            where: { paymentId: paymentIntentId },
            data: { status: "refunded" },
          });
        }
        break;
      }
      case "payment_intent.canceled": {
        const intent = event.data.object as {
          id: string;
          metadata?: Record<string, string>;
        };
        const submissionId = intent.metadata?.submissionId;
        if (submissionId) {
          await prisma.submission.updateMany({
            where: { id: submissionId, status: { in: ["pending_payment", "pending"] } },
            data: { status: "failed" },
          });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;

        await prisma.sponsorship.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        if (subscription.status !== "active") {
          const record = await prisma.sponsorship.findFirst({
            where: { stripeSubscriptionId: subscriptionId },
          });
          if (record?.placement === SponsorshipPlacements.featuredSpotlight && record.toolId) {
            await prisma.tool.update({
              where: { id: record.toolId },
              data: { isFeatured: false },
            });
          }
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as {
          subscription?: string | null;
          customer_email?: string | null;
        };
        const subscriptionId = invoice.subscription?.toString();

        if (subscriptionId) {
          // Retrieve latest subscription data from Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          // Update sponsorship with renewed period
          await prisma.sponsorship.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: {
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              status: subscription.status,
            },
          });
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as {
          subscription?: string | null;
          customer_email?: string | null;
        };
        const subscriptionId = invoice.subscription?.toString();

        if (subscriptionId) {
          // Mark sponsorship as past_due
          await prisma.sponsorship.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: {
              status: "past_due",
            },
          });

          // Notify via Slack
          await sendSlackAlert(
            `⚠️ Subscription payment failed: ${subscriptionId}\nCustomer: ${invoice.customer_email || 'Unknown'}`
          );
        }
        break;
      }
      default:
        break;
    }
    if (webhookEventId) {
      await prisma.webhookEvent.update({
        where: { eventId: webhookEventId },
        data: { status: "processed", error: null },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    try {
      await sendSlackAlert(`Stripe webhook handler error: ${String(error)}`);
    } catch (slackError) {
      console.error("Failed to send Slack alert:", slackError);
    }
    if (webhookEventId) {
      await prisma.webhookEvent.update({
        where: { eventId: webhookEventId },
        data: { status: "failed", error: String(error) },
      });
    }
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
