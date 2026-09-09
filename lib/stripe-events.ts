import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSubmissionApprovedEmail, sendSubmissionFailedEmail } from "@/lib/emails";
import { sendSlackAlert } from "@/lib/alerts";
import { SponsorshipPlacements } from "@/lib/sponsorships";

export interface StripeEventResult {
  /** true면 event.type이 실제 case에 매칭됨. false면 default로 흘러 아무 처리도 하지 않음. */
  handled: boolean;
}

/**
 * Alerting is best-effort. Stripe retries any delivery it doesn't get a 2xx
 * for, so letting a Slack outage throw out of the handler turns one dead
 * dependency into a redelivery loop on payment events we already applied.
 * Swallow the failure, but log it — a silent catch hides the outage itself.
 */
export async function notifySlack(message: string): Promise<void> {
  try {
    await sendSlackAlert(message);
  } catch (error) {
    console.error("[stripe-webhook] Slack alert failed:", error);
  }
}

/**
 * The one place that decides what a Stripe event does to our data.
 *
 * The live webhook route and the admin retry route each grew their own copy of
 * this switch and drifted: the retry copy logged email failures the webhook
 * swallowed, stored `event.id` as the submission's paymentId where the webhook
 * stores the payment intent, and never learned about charge.refunded,
 * payment_intent.canceled or the invoice events at all. Replaying an event
 * through the admin UI could therefore leave the database in a different state
 * than the original delivery did. One switch, one behaviour.
 *
 * It deliberately owns no bookkeeping: nothing here reads or writes
 * WebhookEvent, and nothing here decides an HTTP status. Callers arrive with
 * different transports (a signed Stripe POST, an admin redirect) and different
 * ideas about what a failure means, so recording status and answering the
 * caller stay with the caller. This function applies the event or throws.
 *
 * `handled` reports whether the type matched a case at all, so a caller can
 * tell "we applied this" apart from "we recognised nothing and did nothing"
 * without re-deriving the list of supported types.
 */
export async function processStripeEvent(
  event: Stripe.Event,
  stripe: Stripe
): Promise<StripeEventResult> {
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
              // The payment intent, not event.id: charge.refunded matches a
              // submission by paymentId, so storing an evt_ here means a
              // refund never finds the row it is supposed to mark refunded.
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
      return { handled: true };
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
      return { handled: true };
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
      return { handled: true };
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent?.toString();
      if (paymentIntentId) {
        await prisma.submission.updateMany({
          where: { paymentId: paymentIntentId },
          data: { status: "refunded" },
        });
      }
      return { handled: true };
    }
    case "payment_intent.canceled": {
      const intent = event.data.object;
      const submissionId = intent.metadata?.submissionId;
      if (submissionId) {
        await prisma.submission.updateMany({
          where: { id: submissionId, status: { in: ["pending_payment", "pending"] } },
          data: { status: "failed" },
        });
      }
      return { handled: true };
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
      return { handled: true };
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object;
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
      return { handled: true };
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
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
        await notifySlack(
          `⚠️ Subscription payment failed: ${subscriptionId}\nCustomer: ${invoice.customer_email || 'Unknown'}`
        );
      }
      return { handled: true };
    }
    default:
      return { handled: false };
  }

  // `break` inside checkout.session.completed lands here: the type matched a
  // case, the case just decided the submission needed no work.
  return { handled: true };
}
