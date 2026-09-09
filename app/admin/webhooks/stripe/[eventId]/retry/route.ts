import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { notifySlack, processStripeEvent } from "@/lib/stripe-events";

interface Props {
  params: Promise<{ eventId: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  const { eventId } = await params;
  const stripe = getStripe();

  try {
    let event: Stripe.Event;
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

    const { handled } = await processStripeEvent(event, stripe);

    // An unhandled type is recorded "skipped", never "processed". This route
    // used to run a shorter switch than the live webhook and then write
    // "processed" unconditionally from `default: break`, so retrying a
    // charge.refunded did nothing at all and reported success: the admin saw a
    // green row while the submission stayed "approved" after a refund.
    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: handled ? "processed" : "skipped", error: null },
    });
    const outcome = handled ? "ok" : "unhandled";
    return NextResponse.redirect(
      new URL(`/admin/webhooks?retry=${outcome}&type=${encodeURIComponent(event.type)}`, request.url)
    );
  } catch (error) {
    console.error("Webhook retry failed:", error);
    await prisma.webhookEvent.updateMany({
      where: { eventId },
      data: { status: "failed", error: String(error) },
    });
    await notifySlack(`Stripe webhook retry failed: ${eventId} - ${String(error)}`);
    return NextResponse.redirect(new URL("/admin/webhooks?retry=failed", request.url));
  }
}
