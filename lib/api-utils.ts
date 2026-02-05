import { NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";

export function validateRequest<T>(schema: ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: ZodError } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, error: result.error };
}

export function createErrorResponse(message: string, status: number = 400, details?: unknown) {
  return NextResponse.json(
    { 
      error: message, 
      details,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function createSuccessResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    { 
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}
