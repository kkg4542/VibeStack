import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createErrorResponse } from "@/lib/api-utils";
import { checkRateLimit, rateLimitConfigs } from "@/lib/redis";
import { validateBodySize } from "@/lib/body-size";
import { checkHoneypotFromBody, createHoneypotResponse } from "@/lib/honeypot";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // Validate request body size
  const { valid, response } = validateBodySize(request, request.nextUrl.pathname);
  if (!valid && response) {
    return response;
  }

  // Check honeypot field (bots will fill this, humans won't)
  const honeypotCheck = await checkHoneypotFromBody(request);
  if (!honeypotCheck.valid) {
    return createHoneypotResponse();
  }

  try {
    // Get IP address
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    
    // Check rate limit using Redis (3 requests per hour per IP)
    const rateLimitResult = await checkRateLimit(
      `newsletter:${ip}`,
      rateLimitConfigs.newsletter
    );

    if (!rateLimitResult.allowed) {
      return createErrorResponse(
        "Too many requests. Please try again later.",
        429,
        {
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        }
      );
    }

    const body = await request.json();

    // Validate input using Zod
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return createErrorResponse(result.error.issues[0].message, 400);
    }

    const { email, firstName, lastName } = result.data;

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_DC = process.env.MAILCHIMP_DC;

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_DC) {
      return createErrorResponse("Server configuration error", 500);
    }

    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Successfully subscribed!" },
        { status: 200 }
      );
    } else {
      const error = await response.json();

      // Handle already subscribed error gracefully
      if (error.detail?.includes("already a list member")) {
        return NextResponse.json(
          { message: "You're already subscribed!" },
          { status: 200 }
        );
      }

      return createErrorResponse("Failed to subscribe. Please try again.", 500);
    }
  } catch (error) {
    return createErrorResponse("An error occurred. Please try again.", 500);
  }
}
