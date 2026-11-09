/**
 * VibeStack Admin Auth Actions
 *
 * Every async function exported from a "use server" module is registered as a
 * server action (an HTTP-invocable endpoint). Export ONLY real actions here;
 * helpers that touch secrets (the admin token derivation) live in
 * lib/admin-token.ts and must never be exported from this file.
 */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, computeAdminToken, constantTimeEqual } from "@/lib/admin-token";

async function sha256Hex(value: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Hash both sides first so the comparison is constant-time regardless of input length. */
async function secretsMatch(submitted: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([sha256Hex(submitted), sha256Hex(expected)]);
  return constantTimeEqual(a, b);
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

  // Evaluate both comparisons (no short-circuit) so timing does not reveal
  // whether the username alone was correct.
  const [userOk, pwdOk] = await Promise.all([
    secretsMatch(String(username), validUser),
    secretsMatch(String(password), validPwd),
  ]);
  const token = userOk && pwdOk ? await computeAdminToken(validPwd) : null;

  if (token) {
    // Set HTTP-Only Secure cookie
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    redirect("/admin"); // Redirect to admin dashboard
  } else {
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
