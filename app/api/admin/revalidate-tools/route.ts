import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { createErrorResponse, createSuccessResponse } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    // @ts-ignore - Next.js 16.1.6 requires 2 args
    revalidateTag('tools', undefined);

    return createSuccessResponse({ message: "Tools cache cleared successfully" });
  } catch (error) {
    return createErrorResponse("Failed to revalidate cache", 500);
  }
}
