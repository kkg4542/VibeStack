/**
 * VibeStack Admin Auth Actions
 *
 * Every async function exported from a "use server" module is registered as a
 * server action (an HTTP-invocable endpoint). Export ONLY real actions here;
 * helpers that touch secrets (the admin session token signing) live in
 * lib/admin-token.ts and must never be exported from this file.
 */
"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminToken,
} from "@/lib/admin-token";
import { peekRateLimit, recordRateLimitHit, rateLimitConfigs } from "@/lib/redis";

async function sha256Hex(value: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time for equal lengths (both sides here are 64-char hex digests). */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Hash both sides first so the comparison is constant-time regardless of input length. */
async function secretsMatch(submitted: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([sha256Hex(submitted), sha256Hex(expected)]);
  return constantTimeEqual(a, b);
}

async function getClientIP(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return h.get("x-real-ip") || "unknown";
}

/**
 * Validates admin credentials against environment variables and sets
 * a secure HTTP-Only cookie if correct.
 */
export async function adminLogin(_prevState: { error: string | null }, formData: FormData): Promise<{ error: string | null }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Missing credentials" };
  }

  const validUser = process.env.ADMIN_USER;
  const validPwd = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPwd) {
    return { error: "Server missing admin configuration" };
  }

  // Failed-login lockout lives here (not in middleware, which cannot tell a
  // failed login from a page view). Only failures are recorded, so successful
  // logins never count toward the limit.
  const limitKey = `admin-login-fail:${await getClientIP()}`;
  const limitConfig = rateLimitConfigs.adminLoginFailures;
  if ((await peekRateLimit(limitKey, limitConfig)).blocked) {
    return { error: "Too many failed attempts. Try again in 15 minutes." };
  }

  // Evaluate both comparisons (no short-circuit) so timing does not reveal
  // whether the username alone was correct.
  const [userOk, pwdOk] = await Promise.all([
    secretsMatch(String(username), validUser),
    secretsMatch(String(password), validPwd),
  ]);
  const token = userOk && pwdOk ? await createAdminToken() : null;

  if (token) {
    // Signed, expiring session token (lib/admin-token.ts). SameSite=Strict:
    // the login form posts same-origin and redirects same-origin, and nothing
    // outside the site links into /admin, so Strict costs nothing here.
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS, // matches the token's own expiry
    });

    redirect("/admin"); // Redirect to admin dashboard
  } else {
    await recordRateLimitHit(limitKey, limitConfig);
    return { error: "Invalid credentials" };
  }
}

/**
 * Logs out the admin by deleting the cookie
 */
export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
