import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "REJECT"
  | "LOGIN"
  | "LOGOUT"
  | "EXPORT"
  | "VIEW";

export type AuditEntity =
  | "Tool"
  | "Submission"
  | "BlogPost"
  | "Sponsorship"
  | "User"
  | "Stack"
  | "CommunityStack"
  | "Review"
  | "Settings"
  | "Webhook";

interface AuditLogEntry {
  userId: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  success?: boolean;
  error?: string;
  metadata?: Record<string, unknown>;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "127.0.0.1";
}

function getUserAgent(request: NextRequest): string {
  return request.headers.get("user-agent") || "unknown";
}

function serializeValue(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/**
 * Log an admin action to the audit log
 */
export async function logAdminAction(
  request: NextRequest,
  entry: AuditLogEntry
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        oldValue: serializeValue(entry.oldValue),
        newValue: serializeValue(entry.newValue),
        ipAddress: getClientIP(request),
        userAgent: getUserAgent(request),
        success: entry.success ?? true,
        error: entry.error,
        metadata: entry.metadata ? (entry.metadata as any) : undefined,
      },
    });
  } catch (error) {
    // Don't throw - audit logging should not break the application
    console.error("Failed to write audit log:", error);
  }
}

/**
 * Create an audit log wrapper for API route handlers
 */
export function withAuditLog(
  handler: (request: NextRequest) => Promise<Response>,
  auditConfig: Omit<AuditLogEntry, "userId" | "success" | "error">
) {
  return async (request: NextRequest): Promise<Response> => {
    // Get user from session (you'll need to pass the user ID)
    // For now, we'll get it from the request context or a custom header
    const userId = request.headers.get("x-admin-user-id") || "unknown";

    try {
      const response = await handler(request);

      // Log successful action
      await logAdminAction(request, {
        ...auditConfig,
        userId,
        success: response.ok,
      });

      return response;
    } catch (error) {
      // Log failed action
      await logAdminAction(request, {
        ...auditConfig,
        userId,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw error;
    }
  };
}

/**
 * Get recent audit logs
 */
export async function getRecentAuditLogs(
  limit: number = 100,
  offset: number = 0
) {
  return prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: offset,
  });
}

/**
 * Get audit logs for a specific entity
 */
export async function getAuditLogsForEntity(
  entity: AuditEntity,
  entityId: string
) {
  return prisma.auditLog.findMany({
    where: {
      entity,
      entityId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get audit logs for a specific user
 */
export async function getAuditLogsForUser(userId: string) {
  return prisma.auditLog.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
