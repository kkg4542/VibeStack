import { NextRequest, NextResponse } from "next/server";
import { stacks } from "@/lib/stacks";
import { incrementStackView } from "@/lib/data/stacks";
import { checkRateLimit } from "@/lib/redis";

// Loose preset: enough headroom for genuine repeat views/navigation within
// a session, tight enough to blunt naive view-count abuse from a single IP.
const VIEW_RATE_LIMIT = { windowSize: 60_000, maxRequests: 10 };

interface Params {
  params: Promise<{ stackId: string }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  const { stackId } = await params;

  const stack = stacks.find((s) => s.id === stackId);
  if (!stack) {
    return NextResponse.json({ error: "Stack not found" }, { status: 404 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = await checkRateLimit(
    `stack-view:${ip}`,
    VIEW_RATE_LIMIT
  );

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  await incrementStackView(stackId);

  return NextResponse.json({ success: true });
}
