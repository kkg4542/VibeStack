import { NextRequest, NextResponse } from "next/server";
import { sendSlackAlert } from "@/lib/alerts";

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const decoded = atob(auth.replace("Basic ", ""));
  const [user, pass] = decoded.split(":");

  return (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASSWORD
  );
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  try {
    await sendSlackAlert("✅ Test alert: Stripe webhook failure notifications are working.");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Slack alert failed: ${String(error)}` },
      { status: 500 }
    );
  }
}
