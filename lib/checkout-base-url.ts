import { NextResponse, type NextRequest } from "next/server";

/**
 * Base URL for Stripe Checkout success/cancel redirects.
 *
 * The request's Origin header is attacker-controlled, so it is never trusted
 * in production: a forged Origin would send the buyer back to an arbitrary
 * site after paying. NEXT_PUBLIC_APP_URL is the source of truth; the request
 * origin is only a development convenience when that variable is unset.
 *
 * Returns null when no trustworthy base URL exists (production with
 * NEXT_PUBLIC_APP_URL unset or malformed); callers must answer 500.
 */
function asHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

export function getCheckoutBaseUrl(request: NextRequest): string | null {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (configured) {
    const valid = asHttpUrl(configured);
    if (!valid) {
      console.error("[checkout] NEXT_PUBLIC_APP_URL is not a valid http(s) URL.");
    }
    return valid;
  }

  if (process.env.NODE_ENV === "production") {
    console.error("[checkout] NEXT_PUBLIC_APP_URL is unset; refusing to build Stripe redirect URLs from the request.");
    return null;
  }

  return asHttpUrl(request.headers.get("origin")) ?? "http://localhost:3000";
}

export function checkoutConfigErrorResponse(): NextResponse {
  return NextResponse.json(
    { error: "Server misconfigured: NEXT_PUBLIC_APP_URL must be set to an http(s) URL", code: "APP_URL_MISSING" },
    { status: 500 }
  );
}
