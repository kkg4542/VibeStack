import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/admin/webhooks/stripe/[eventId]/retry/route";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSlackAlert } from "@/lib/alerts";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    webhookEvent: {
      findUnique: vi.fn(),
      updateMany: vi.fn(),
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

// The admin route replays an event it fetches by id, so `events.retrieve` is
// this suite's entry point where the live webhook has `webhooks.constructEvent`.
const stripeMock = {
  events: { retrieve: vi.fn() },
  webhooks: { constructEvent: vi.fn() },
  subscriptions: { retrieve: vi.fn() },
};

// The transaction client the shared handler's callback writes through.
const txMock = {
  submission: { update: vi.fn() },
  tool: { create: vi.fn(), findFirst: vi.fn(), findUnique: vi.fn() },
};

function makeRequest(eventId: string): NextRequest {
  return new NextRequest(
    new Request(`http://localhost/admin/webhooks/stripe/${eventId}/retry`, {
      method: "POST",
    })
  );
}

function retry(eventId: string) {
  return POST(makeRequest(eventId), { params: Promise.resolve({ eventId }) });
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

function statusWrites() {
  return vi
    .mocked(prisma.webhookEvent.updateMany)
    .mock.calls.map((call) => (call[0] as { data: { status: string } }).data.status);
}

describe("POST /admin/webhooks/stripe/[eventId]/retry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getStripe).mockReturnValue(stripeMock as never);
    vi.mocked(prisma.$transaction).mockImplementation((async (
      cb: (tx: typeof txMock) => Promise<unknown>
    ) => cb(txMock)) as never);
  });

  // The regression that motivated the rewire: this route's private switch had
  // no charge.refunded case, fell through `default: break`, and still wrote
  // "processed". An operator retrying a refund got a green row and a
  // submission that stayed approved. Retrying must actually refund it.
  it("applies charge.refunded on retry instead of reporting a false success", async () => {
    stripeMock.events.retrieve.mockResolvedValueOnce({
      id: "evt_refund_1",
      type: "charge.refunded",
      data: { object: { id: "ch_1", payment_intent: "pi_test_1" } },
    });

    const response = await retry("evt_refund_1");

    expect(prisma.submission.updateMany).toHaveBeenCalledWith({
      where: { paymentId: "pi_test_1" },
      data: { status: "refunded" },
    });
    expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
      where: { eventId: "evt_refund_1" },
      data: { status: "processed", error: null },
    });
    expect(response.headers.get("location")).toContain("retry=ok");
  });

  // "processed" is what the admin list reads as "we applied this". A type no
  // case matches must not borrow that word, or the operator has no way to tell
  // a replayed event from an ignored one.
  it("records an unhandled event type as skipped, not processed", async () => {
    stripeMock.events.retrieve.mockResolvedValueOnce({
      id: "evt_unhandled_1",
      type: "customer.created",
      data: { object: { id: "cus_1" } },
    });

    const response = await retry("evt_unhandled_1");

    expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
      where: { eventId: "evt_unhandled_1" },
      data: { status: "skipped", error: null },
    });
    expect(statusWrites()).not.toContain("processed");

    const location = response.headers.get("location");
    expect(location).toContain("retry=unhandled");
    expect(location).toContain("type=customer.created");
  });

  // Retry has to work for events Stripe no longer serves (expired, or a key
  // rotated out). The stored payload is the raw body of the original delivery,
  // so replaying from it must reach the same handler.
  it("falls back to the stored payload when stripe.events.retrieve fails", async () => {
    stripeMock.events.retrieve.mockRejectedValueOnce(new Error("No such event"));
    vi.mocked(prisma.webhookEvent.findUnique).mockResolvedValueOnce({
      id: "whe-1",
      provider: "stripe",
      eventId: "evt_expired_1",
      type: "checkout.session.expired",
      status: "failed",
      payload: JSON.stringify({
        id: "evt_expired_1",
        type: "checkout.session.expired",
        data: {
          object: {
            id: "cs_test_expired",
            metadata: { type: "submission", submissionId: "sub-1", toolName: "Test Tool" },
          },
        },
      }),
    } as never);

    const response = await retry("evt_expired_1");

    expect(prisma.submission.updateMany).toHaveBeenCalledWith({
      where: { id: "sub-1", status: { in: ["pending_payment", "pending"] } },
      data: { status: "failed" },
    });
    expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
      where: { eventId: "evt_expired_1" },
      data: { status: "processed", error: null },
    });
    expect(response.headers.get("location")).toContain("retry=ok");
  });

  // The bug this rewire silently fixes: the retry copy fell back to `event.id`
  // (an `evt_...` webhook envelope id) where the live webhook stores the
  // session id. charge.refunded matches a submission by paymentId, so a
  // payment approved through retry could never be matched by its own refund.
  it("stores the session id, not the event id, when the session has no payment_intent", async () => {
    stripeMock.events.retrieve.mockResolvedValueOnce({
      id: "evt_completed_1",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_1",
          payment_intent: null,
          amount_total: 4900,
          metadata: { type: "submission", submissionId: "sub-1" },
        },
      },
    });
    vi.mocked(prisma.submission.findUnique).mockResolvedValueOnce(
      makeSubmission({ status: "pending" }) as never
    );

    await retry("evt_completed_1");

    expect(createToolFromSubmission).toHaveBeenCalledTimes(1);
    expect(txMock.submission.update).toHaveBeenCalledWith({
      where: { id: "sub-1" },
      data: { paymentId: "cs_test_1", status: "approved", amount: 4900 },
    });

    const written = (
      txMock.submission.update.mock.calls[0][0] as { data: { paymentId: string } }
    ).data.paymentId;
    expect(written).toBe("cs_test_1");
    expect(written).not.toBe("evt_completed_1");
    expect(written.startsWith("evt_")).toBe(false);
  });

  // invoice.payment_failed had no case here at all, so a failed sponsorship
  // renewal replayed through the admin UI left the sponsorship "active" and
  // kept serving a slot nobody paid for.
  it("marks the sponsorship past_due on an invoice.payment_failed retry", async () => {
    stripeMock.events.retrieve.mockResolvedValueOnce({
      id: "evt_invoice_failed_1",
      type: "invoice.payment_failed",
      data: {
        object: { subscription: "sub_stripe_1", customer_email: "sponsor@example.com" },
      },
    });

    const response = await retry("evt_invoice_failed_1");

    expect(prisma.sponsorship.updateMany).toHaveBeenCalledWith({
      where: { stripeSubscriptionId: "sub_stripe_1" },
      data: { status: "past_due" },
    });
    expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
      where: { eventId: "evt_invoice_failed_1" },
      data: { status: "processed", error: null },
    });
    expect(response.headers.get("location")).toContain("retry=ok");
  });

  // The caller is an HTML form POST, so a throw escaping the route renders a
  // Next error page instead of returning the operator to the list. The row
  // must stay "failed" so it is still retryable.
  it("records a handler failure and still redirects instead of throwing", async () => {
    stripeMock.events.retrieve.mockResolvedValueOnce({
      id: "evt_completed_1",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_1",
          payment_intent: "pi_test_1",
          amount_total: 4900,
          metadata: { type: "submission", submissionId: "sub-1" },
        },
      },
    });
    vi.mocked(prisma.submission.findUnique).mockRejectedValueOnce(
      new Error("connection terminated unexpectedly")
    );

    const response = await retry("evt_completed_1");

    expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
      where: { eventId: "evt_completed_1" },
      data: { status: "failed", error: "Error: connection terminated unexpectedly" },
    });
    expect(statusWrites()).not.toContain("processed");
    expect(response.headers.get("location")).toContain("retry=failed");
    expect(sendSlackAlert).toHaveBeenCalledTimes(1);
  });
});
