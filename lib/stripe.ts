import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripe) return stripe;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
    typescript: true,
  });

  return stripe;
}
