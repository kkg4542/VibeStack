import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/stripe/webhook/route";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSubmissionApprovedEmail, sendSubmissionFailedEmail } from "@/lib/emails";
import { sendSlackAlert } from "@/lib/alerts";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    webhookEvent: {
      create: vi.fn(),
      upsert: vi.fn(),
      update: vi.fn(),
    },
    submission: {
      findUnique: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    sponsorship: {
      upsert: vi.fn(),
      updateMany: vi.fn(),
      findFirst: vi.fn(),
    },
    tool: {
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

vi.mock("@/lib/stripe", () => ({
  getStripe: vi.fn(),
}));

vi.mock("@/lib/submissions", () => ({
  createToolFromSubmission: vi.fn(),
}));

vi.mock("@/lib/emails", () => ({
  sendSubmissionApprovedEmail: vi.fn(),
  sendSubmissionFailedEmail: vi.fn(),
}));

vi.mock("@/lib/alerts", () => ({
  sendSlackAlert: vi.fn(),
}));

const stripeMock = {
  webhooks: { constructEvent: vi.fn() },
  subscriptions: { retrieve: vi.fn() },
};

// The transaction client the route's callback writes through.
const txMock = {
  submission: { update: vi.fn() },
  tool: { create: vi.fn(), findFirst: vi.fn(), findUnique: vi.fn() },
};

function makeRequest(
  body: string,
  headers: Record<string, string> = { "stripe-signature": "t=1,v1=sig" }
): NextRequest {
  return new NextRequest(
    new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      body,
      headers,
    })
  );
}

function makeSubmission(overrides: Record<string, unknown> = {}) {
  return {
    id: "sub-1",
    toolName: "Test Tool",
    description: "A tool with a description long enough to pass validation",
    websiteUrl: "https://example.com",
    category: "coding",
    pricing: "free",
    email: "owner@example.com",
    tier: "pro",
    amount: 4900,
    status: "pending",
    paymentId: null,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    ...overrides,
  };
}

function checkoutCompletedEvent(
  metadata: Record<string, string>,
  sessionOverrides: Record<string, unknown> = {}
) {
  return {
    id: "evt_completed_1",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_1",
        payment_intent: "pi_test_1",
        amount_total: 4900,
        metadata,
        ...sessionOverrides,
      },
    },
  };
}

describe("POST /api/stripe/webhook", () => {
  const originalSecret = process.env.STRIPE_WEBHOOK_SECRET;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    vi.mocked(getStripe).mockReturnValue(stripeMock as never);
    vi.mocked(prisma.$transaction).mockImplementation((async (
      cb: (tx: typeof txMock) => Promise<unknown>
    ) => cb(txMock)) as never);
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.STRIPE_WEBHOOK_SECRET;
    } else {
      process.env.STRIPE_WEBHOOK_SECRET = originalSecret;
    }
  });

  it("rejects a request with no stripe-signature header", async () => {
    const response = await POST(makeRequest("{}", {}));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing Stripe signature",
    });
    expect(stripeMock.webhooks.constructEvent).not.toHaveBeenCalled();
  });

  it("returns 500 when STRIPE_WEBHOOK_SECRET is not configured", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "STRIPE_WEBHOOK_SECRET is not set",
    });
    expect(stripeMock.webhooks.constructEvent).not.toHaveBeenCalled();
  });

  it("rejects a forged signature without touching submissions or sponsorships", async () => {
    stripeMock.webhooks.constructEvent.mockImplementation(() => {
      throw new Error("No signatures found matching the expected signature");
    });

    const response = await POST(makeRequest('{"id":"evt_forged"}'));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Webhook signature verification failed",
    });

    expect(prisma.webhookEvent.create).not.toHaveBeenCalled();
    expect(prisma.submission.findUnique).not.toHaveBeenCalled();
    expect(prisma.submission.update).not.toHaveBeenCalled();
    expect(prisma.submission.updateMany).not.toHaveBeenCalled();
    expect(prisma.sponsorship.upsert).not.toHaveBeenCalled();
    expect(prisma.sponsorship.updateMany).not.toHaveBeenCalled();
    expect(createToolFromSubmission).not.toHaveBeenCalled();
    expect(sendSlackAlert).toHaveBeenCalledTimes(1);
  });

  it("creates the tool, approves the submission and emails the owner on checkout.session.completed", async () => {
    const submission = makeSubmission({ status: "pending" });
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    vi.mocked(prisma.submission.findUnique).mockResolvedValue(submission as never);

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ received: true });

    expect(createToolFromSubmission).toHaveBeenCalledTimes(1);
    expect(createToolFromSubmission).toHaveBeenCalledWith(submission, txMock);

    expect(txMock.submission.update).toHaveBeenCalledWith({
      where: { id: "sub-1" },
      data: {
        paymentId: "pi_test_1",
        status: "approved",
        amount: 4900,
      },
    });

    expect(sendSubmissionApprovedEmail).toHaveBeenCalledWith({
      to: "owner@example.com",
      toolName: "Test Tool",
      tier: "pro",
      websiteUrl: "https://example.com",
    });
  });

  it("does not re-create the tool when the submission is already approved", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    vi.mocked(prisma.submission.findUnique).mockResolvedValue(
      makeSubmission({ status: "approved" }) as never
    );

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    expect(createToolFromSubmission).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
    expect(txMock.submission.update).not.toHaveBeenCalled();
    expect(sendSubmissionApprovedEmail).not.toHaveBeenCalled();
  });

  it("acknowledges with 200 and creates nothing when the submission does not exist", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-missing" })
    );
    vi.mocked(prisma.submission.findUnique).mockResolvedValue(null);

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ received: true });
    expect(createToolFromSubmission).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("marks a pending submission failed on checkout.session.expired", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue({
      id: "evt_expired_1",
      type: "checkout.session.expired",
      data: {
        object: {
          id: "cs_test_expired",
          customer_email: "owner@example.com",
          metadata: {
            type: "submission",
            submissionId: "sub-1",
            toolName: "Test Tool",
          },
        },
      },
    });

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    expect(prisma.submission.updateMany).toHaveBeenCalledWith({
      where: {
        id: "sub-1",
        status: { in: ["pending_payment", "pending"] },
      },
      data: { status: "failed" },
    });
    expect(sendSubmissionFailedEmail).toHaveBeenCalledWith({
      to: "owner@example.com",
      toolName: "Test Tool",
      reason: "Checkout session expired",
    });
  });

  it("marks the webhook event processed after a successful handler run", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    vi.mocked(prisma.submission.findUnique).mockResolvedValue(
      makeSubmission() as never
    );

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    expect(prisma.webhookEvent.update).toHaveBeenCalledWith({
      where: { eventId: "evt_completed_1" },
      data: { status: "processed", error: null },
    });
  });

  it("returns 500 and records the webhook event as failed when the handler throws", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    vi.mocked(prisma.submission.findUnique).mockRejectedValue(
      new Error("connection terminated unexpectedly")
    );

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Webhook handler failed",
    });

    expect(prisma.webhookEvent.update).toHaveBeenCalledWith({
      where: { eventId: "evt_completed_1" },
      data: {
        status: "failed",
        error: "Error: connection terminated unexpectedly",
      },
    });
    expect(sendSlackAlert).toHaveBeenCalledTimes(1);
  });

  // Regression: the route used to create() the WebhookEvent row before
  // upserting it. eventId is @unique, so a Stripe redelivery threw P2002 into
  // the signature catch and answered 400 on a perfectly signed request.
  it("returns 200 on a redelivered event instead of failing signature verification", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    // The row already exists from the first delivery, so upsert updates it.
    vi.mocked(prisma.webhookEvent.upsert).mockResolvedValueOnce({
      id: "whe-1",
      provider: "stripe",
      eventId: "evt_completed_1",
      type: "checkout.session.completed",
      status: "received",
    } as never);
    vi.mocked(prisma.submission.findUnique).mockResolvedValue(
      makeSubmission({ status: "pending" }) as never
    );

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ received: true });

    expect(prisma.webhookEvent.create).not.toHaveBeenCalled();
    expect(prisma.webhookEvent.upsert).toHaveBeenCalledTimes(1);
    expect(sendSlackAlert).not.toHaveBeenCalled();
  });

  it("does not re-create the tool on a redelivery of an already approved submission", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    vi.mocked(prisma.webhookEvent.upsert).mockResolvedValueOnce({
      id: "whe-1",
      provider: "stripe",
      eventId: "evt_completed_1",
      type: "checkout.session.completed",
      status: "processed",
    } as never);
    vi.mocked(prisma.submission.findUnique).mockResolvedValue(
      makeSubmission({ status: "approved" }) as never
    );

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ received: true });

    expect(prisma.webhookEvent.create).not.toHaveBeenCalled();
    expect(createToolFromSubmission).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
    expect(txMock.submission.update).not.toHaveBeenCalled();
    expect(sendSubmissionApprovedEmail).not.toHaveBeenCalled();
  });

  it("still returns 400 when logging the webhook event fails outright", async () => {
    stripeMock.webhooks.constructEvent.mockReturnValue(
      checkoutCompletedEvent({ type: "submission", submissionId: "sub-1" })
    );
    vi.mocked(prisma.webhookEvent.upsert).mockRejectedValueOnce(
      new Error("connection terminated unexpectedly")
    );

    const response = await POST(makeRequest("{}"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Webhook signature verification failed",
    });
    expect(prisma.submission.findUnique).not.toHaveBeenCalled();
    expect(createToolFromSubmission).not.toHaveBeenCalled();
    expect(sendSlackAlert).toHaveBeenCalledTimes(1);
  });
});
