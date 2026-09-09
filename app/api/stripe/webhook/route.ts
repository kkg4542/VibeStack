import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { notifySlack, processStripeEvent } from "@/lib/stripe-events";

export const runtime = "nodejs";

/**
 * Bookkeeping only: by the time we write a status the event has already been
 * applied (or already failed) and the response is decided. A failed write
 * leaves the row stale, which is recoverable; throwing here would flip the
 * result Stripe sees, which is not.
 */
async function markWebhookEvent(
  eventId: string | null,
  data: { status: string; error: string | null }
): Promise<void> {
  if (!eventId) return;
  try {
    await prisma.webhookEvent.update({ where: { eventId }, data });
  } catch (error) {
    console.error("[stripe-webhook] Failed to record event status:", error);
  }
}

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

    webhookEventId = event.id;

    /**
     * Log the event with upsert, never create. WebhookEvent.eventId carries
     * a @unique constraint and Stripe redelivers events it hasn't seen a 2xx
     * for, so a create() here threw P2002 on every retry. That throw hit the
     * signature catch below, which answers 400 unconditionally — so a
     * perfectly signed redelivery got rejected as a bad signature, the
     * switch never ran, and the row stayed stuck at status "received"
     * while Stripe retried forever.
     *
     * `payload` is the raw request body, not JSON.stringify(event): that is
     * the exact byte string the signature was computed over.
     */
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
    await notifySlack(`Stripe webhook signature error: ${String(error)}`);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  let handled: boolean;
  try {
    ({ handled } = await processStripeEvent(event, stripe));
  } catch (error) {
    await notifySlack(`Stripe webhook handler error: ${String(error)}`);
    await markWebhookEvent(webhookEventId, { status: "failed", error: String(error) });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  // The status write sits outside the try on purpose. It used to be the
  // last statement inside it, so a failed status write fell into the catch
  // above: the event got recorded as failed and answered 500 even though the
  // switch had already applied it, and Stripe redelivered a payment we had
  // fully handled.
  //
  // A type we have no case for is recorded "skipped", not "processed".
  // "processed" is what the admin webhook list reads as "we applied this", and
  // an operator replaying a stuck event needs to see the difference between an
  // event we acted on and one we ignored. Stripe still gets a 200 either way —
  // asking it to redeliver an event we will keep ignoring only builds a retry
  // loop.
  await markWebhookEvent(webhookEventId, {
    status: handled ? "processed" : "skipped",
    error: null,
  });
  return NextResponse.json({ received: true });
}
