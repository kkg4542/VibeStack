
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

async function runTest() {
    try {
        console.log("1. Creating a test submission for retry...");
        const submission = await prisma.submission.create({
            data: {
                toolName: "Retry Test Tool " + Date.now(),
                description: "Testing webhook retry logic",
                websiteUrl: "https://retry-example.com",
                category: "productivity",
                pricing: "paid",
                email: "retry@example.com",
                tier: "priority",
                amount: 4900,
                status: "pending_payment",
            },
        });
        console.log(`   Submission created with ID: ${submission.id}`);

        console.log("2. Creating a FAILED WebhookEvent in DB...");
        const eventId = "evt_retry_test_" + Date.now();
        const payload = JSON.stringify({
            id: eventId,
            object: 'event',
            type: 'checkout.session.completed',
            data: {
                object: {
                    id: 'cs_retry_test_' + Date.now(),
                    object: 'checkout.session',
                    amount_total: 4900,
                    currency: 'usd',
                    payment_status: 'paid',
                    metadata: {
                        submissionId: submission.id,
                        type: 'submission',
                        tier: 'priority'
                    },
                    payment_intent: 'pi_retry_test_' + Date.now(),
                }
            }
        });

        await prisma.webhookEvent.create({
            data: {
                provider: "stripe",
                eventId: eventId,
                type: "checkout.session.completed",
                status: "failed", // Simulate failure
                error: "Simulated initial failure",
                payload: payload,
            }
        });
        console.log(`   WebhookEvent created with ID: ${eventId} and status: failed`);

        console.log("3. Calling Retry Endpoint...");
        const adminUser = process.env.ADMIN_USER;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const authHeader = 'Basic ' + Buffer.from(adminUser + ':' + adminPassword).toString('base64');
        const retryUrl = `http://localhost:3000/admin/webhooks/stripe/${eventId}/retry`;

        const response = await fetch(retryUrl, {
            method: 'POST',
            headers: {
                'Authorization': authHeader
            },
            redirect: 'manual' // Don't follow redirect so we can inspect the 303/307
        });

        console.log(`   Response status: ${response.status}`);

        // Wait a moment for async processing if any (though route should be awaited)
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("4. Verifying DB updates...");
        const updatedEvent = await prisma.webhookEvent.findUnique({
            where: { eventId: eventId }
        });

        const updatedSubmission = await prisma.submission.findUnique({
            where: { id: submission.id }
        });

        console.log(`   Webhook Event Status: ${updatedEvent?.status}`);
        console.log(`   Submission Status: ${updatedSubmission?.status}`);

        if (updatedEvent?.status === 'processed' && updatedSubmission?.status === 'approved') {
            console.log("SUCCESS! Retry logic verified.");
        } else {
            console.error("FAILURE! Retry logic did not update records as expected.");
        }

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

runTest();
