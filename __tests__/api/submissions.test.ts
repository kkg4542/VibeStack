import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/submissions/route";
import { prisma } from "@/lib/prisma";

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    submission: {
      create: vi.fn(),
    },
  },
}));

describe("Submissions API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a submission with valid data", async () => {
    const mockSubmission = {
      id: "test-id",
      toolName: "Test Tool",
      description: "This is a test description with enough length",
      websiteUrl: "https://example.com",
      category: "coding",
      pricing: "free",
      email: "test@example.com",
      tier: "free",
      amount: 0,
      status: "pending",
      paymentId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.submission.create).mockResolvedValue(mockSubmission as any);

    const request = new Request("http://localhost/api/submissions", {
      method: "POST",
      body: JSON.stringify({
        toolName: "Test Tool",
        description: "This is a test description with enough length",
        websiteUrl: "https://example.com",
        category: "coding",
        pricing: "free",
        email: "test@example.com",
      }),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.submissionId).toBe("test-id");
  });

  it("should return 400 for invalid data", async () => {
    const request = new Request("http://localhost/api/submissions", {
      method: "POST",
      body: JSON.stringify({
        toolName: "A", // Too short
        description: "Short", // Too short
        websiteUrl: "not-a-url",
        category: "",
        pricing: "",
        email: "not-an-email",
      }),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Validation failed");
    expect(data.details).toBeDefined();
  });

  it("should return 400 for missing required fields", async () => {
    const request = new Request("http://localhost/api/submissions", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Validation failed");
  });
});
