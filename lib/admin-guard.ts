import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminToken } from "@/lib/admin-token";

/**
 * In-handler admin checks for route handlers.
 *
 * middleware.ts already gates /admin/* and /api/admin/* on the same cookie,
 * but a route handler should not depend on a matcher it cannot see: a matcher
 * edit or a route moved out of /admin silently drops the gate. Several admin
 * surfaces also sit outside the middleware's reach entirely (e.g.
 * /api/analytics/dashboard), so every admin-only handler calls these itself.
 */

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  return isValidAdminToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

/** null when the request carries a valid admin cookie, else a 401 response. */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  if (await isAdminRequest(request)) return null;
  return NextResponse.json({ error: "Unauthorized", code: "ADMIN_REQUIRED" }, { status: 401 });
}

function requestHosts(request: NextRequest): Set<string> {
  const hosts = new Set<string>();
  const host = request.headers.get("host");
  if (host) hosts.add(host.toLowerCase());
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (forwardedHost) hosts.add(forwardedHost.toLowerCase());
  if (request.nextUrl.host) hosts.add(request.nextUrl.host.toLowerCase());
  return hosts;
}

function hostOf(value: string): string | null {
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Same-origin check for state-changing requests that the middleware CSRF token
 * check does not cover (it only runs on /api/*). Rejects when Origin (or, if
 * Origin is absent, Referer) names a different host, or is the opaque "null"
 * origin. A request carrying neither header is allowed: callers only use this
 * after requireAdmin has passed, and the admin cookie is SameSite=Strict, so a
 * cross-site POST does not carry it in the first place.
 */
export function requireSameOrigin(request: NextRequest): NextResponse | null {
  const hosts = requestHosts(request);
  const origin = request.headers.get("origin");
  const source = origin ?? request.headers.get("referer");
  if (source === null) return null;

  const sourceHost = source === "null" ? null : hostOf(source);
  if (sourceHost && hosts.has(sourceHost)) return null;

  return NextResponse.json(
    { error: "Cross-origin request rejected", code: "ORIGIN_MISMATCH" },
    { status: 403 }
  );
}

/** requireAdmin, then requireSameOrigin. For admin POST handlers. */
export async function requireAdminMutation(request: NextRequest): Promise<NextResponse | null> {
  return (await requireAdmin(request)) ?? requireSameOrigin(request);
}
