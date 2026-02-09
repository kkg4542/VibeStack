
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Load .env from project root (current working directory)
dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
    console.error(`STRIPE_SECRET_KEY is not set`);
    process.exit(1);
}

// Cast API version to any to bypass strict type checking
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10' as any,
    typescript: true,
});

async function verifyStripeConfig() {
    console.log("Checking Stripe configuration...");
    try {
        console.log(`Using key: ${STRIPE_SECRET_KEY!.substring(0, 8)}...`);
        const customers = await stripe.customers.list({ limit: 1 });
        console.log("Successfully connected to Stripe!");
        console.log(`Test passed. Retrieved ${customers.data.length} customer(s).`);
    } catch (error: any) {
        console.error("Failed to verify Stripe configuration:");
        console.error(error.message);
        process.exit(1);
    }
}

verifyStripeConfig();
