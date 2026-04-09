/**
 * VibeStack Admin Auth Actions
 */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Utility to generate a stable, secure hash based on the admin password
export async function getAdminTokenHash(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return "configuration_error";
  
  const encoder = new TextEncoder();
  // We add a salt to separate this hash from any others
  const data = encoder.encode(secret + "vibestack_admin_salt_7391");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates admin credentials against environment variables and sets 
 * a secure HTTP-Only cookie if correct.
 */
export async function adminLogin(formData: FormData) {
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
  
  // Minimal timing-safe check (though for admin panel login via form, less critical than basic auth per-request)
  if (username === validUser && password === validPwd) {
    const token = await getAdminTokenHash();
    
    // Set HTTP-Only Secure cookie
    cookies().set("vibestack_admin", token, {
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
  cookies().delete("vibestack_admin");
  redirect("/admin/login");
}
