
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

// Load .env
dotenv.config();

const prisma = new PrismaClient();

// Use the Webhook Secret from .env to generate a valid signature
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is missing!");
    process.exit(1);
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10' as any,
    typescript: true,
});


async function runTest() {
    try {
        console.log("1. Creating a test submission...");
        const submission = await prisma.submission.create({
            data: {
                toolName: "Test Tool " + Date.now(),
                description: "A test tool description",
                websiteUrl: "https://example.com",
                category: "productivity",
                pricing: "paid",
                email: "test@example.com",
                tier: "priority",
                amount: 4900,
                status: "pending_payment",
            },
        });
        console.log(`   Submission created with ID: ${submission.id}`);

        console.log("2. Simulating Stripe Checkout Session Completed event...");

        // Construct the event payload manually as if it came from Stripe
        // We need to match the structure expected by the webhook handler
        const payloadSource = {
            id: 'evt_test_' + Date.now(),
            object: 'event',
            type: 'checkout.session.completed',
            data: {
                object: {
                    id: 'cs_test_' + Date.now(),
                    object: 'checkout.session',
                    amount_total: 4900,
                    currency: 'usd',
                    payment_status: 'paid',
                    metadata: {
                        submissionId: submission.id,
                        type: 'submission',
                        tier: 'priority'
                    },
                    payment_intent: 'pi_test_' + Date.now(),
                }
            }
        };

        const payloadString = JSON.stringify(payloadSource);

        // Generate the signature
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret: WEBHOOK_SECRET!,
        });

        console.log("3. Sending webhook request to local API...");
        // We can't easily fetch localhost from this script context if the server isn't running or port is unknown.
        // Instead, we can invoking the logic directly? No, better to hit the endpoint if possible.
        // Let's assume default Next.js port 3000.

        const response = await fetch('http://localhost:3000/api/stripe/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Stripe-Signature': header,
            },
            body: payloadString,
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Webhook request failed: ${response.status} ${text}`);
        }

        console.log("   Webhook sent successfully.");

        console.log("4. Verifying database update...");
        // Wait a moment for async processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const updatedSubmission = await prisma.submission.findUnique({
            where: { id: submission.id },
        });

        if (updatedSubmission?.status === 'paid') {
            console.log("SUCCESS! Submission status updated to 'paid'.");
            console.log("Payment ID:", updatedSubmission.paymentId);
        } else {
            console.error("FAILURE! Submission status is:", updatedSubmission?.status);
        }

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

runTest();
