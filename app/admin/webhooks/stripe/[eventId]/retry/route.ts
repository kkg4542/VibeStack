import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { notifySlack, processStripeEvent } from "@/lib/stripe-events";

interface Props {
  params: Promise<{ eventId: string }>;
}

/**
 * Bookkeeping only: by the time the final status is written the event has
 * already been applied and the redirect is decided. A failed write leaves the
 * row stale, which is recoverable; throwing here is not. It used to throw from
 * inside the try below, so the catch overwrote the same row as "failed" and
 * sent the operator back with retry=failed for a replay that had fully
 * succeeded — and they pressed Retry again on an event already applied.
 */
async function markWebhookEvent(
  eventId: string,
  data: { status: string; error: string | null }
): Promise<void> {
  try {
    await prisma.webhookEvent.updateMany({ where: { eventId }, data });
  } catch (error) {
    console.error("[stripe-retry] Failed to record event status:", error);
  }
}

export async function POST(request: NextRequest, { params }: Props) {
  const { eventId } = await params;
  const stripe = getStripe();

  let event: Stripe.Event;
  let handled: boolean;

  try {
    try {
      event = await stripe.events.retrieve(eventId);
    } catch (err) {
      console.warn("Stripe retrieve failed, falling back to database payload", err);
      const storedEvent = await prisma.webhookEvent.findUnique({
        where: { eventId },
      });
      if (storedEvent && storedEvent.payload) {
        /**
         * The assertion is safe because of what `payload` is: the live webhook
         * route stores the raw request body Stripe POSTed — the exact byte
         * string the signature was computed over — not a re-serialised object
         * of our own. Parsing it back yields the same shape
         * stripe.events.retrieve would have returned.
         *
         * It is still an assertion, not a proof: nothing revalidates the row,
         * so a truncated or hand-edited payload parses into an object with
         * missing fields. That degrades to a no-op (the type won't match a
         * case, or the metadata lookups find nothing) rather than corrupting
         * data, and the "skipped" status below is what surfaces it.
         */
        event = JSON.parse(storedEvent.payload) as Stripe.Event;
      } else {
        throw err;
      }
    }

    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: "received", error: null },
    });

    ({ handled } = await processStripeEvent(event, stripe));
  } catch (error) {
    console.error("Webhook retry failed:", error);
    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: "failed", error: String(error) },
    });
    await notifySlack(`Stripe webhook retry failed: ${eventId} - ${String(error)}`);
    return NextResponse.redirect(new URL("/admin/webhooks?retry=failed", request.url));
  }

  // Outside the try, and through a helper that swallows its own error, because
  // everything the retry was going to change has already been changed.
  //
  // An unhandled type is recorded "skipped", never "processed". This route used
  // to run a shorter switch than the live webhook and then write "processed"
  // unconditionally from `default: break`, so retrying a charge.refunded did
  // nothing at all and reported success: the admin saw a green row while the
  // submission stayed "approved" after a refund.
  await markWebhookEvent(eventId, {
    status: handled ? "processed" : "skipped",
    error: null,
  });
  const outcome = handled ? "ok" : "unhandled";
  return NextResponse.redirect(
    new URL(`/admin/webhooks?retry=${outcome}&type=${encodeURIComponent(event.type)}`, request.url)
  );
}
