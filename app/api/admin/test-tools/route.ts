import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createErrorResponse, createSuccessResponse } from "@/lib/api-utils";

// Bypass CSRF for admin endpoints (protected by Basic Auth)
export const dynamic = 'force-dynamic';

// DELETE /api/admin/test-tools - Delete test tools
export async function DELETE(request: NextRequest) {
    try {
        // Check for admin authorization
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return createErrorResponse("Unauthorized", 401);
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
            return createErrorResponse("Unauthorized", 401);
        }

        // Find test tools
        const testTools = await prisma.tool.findMany({
            where: {
                OR: [
                    { title: { startsWith: 'Retry Test Tool' } },
                    { title: { startsWith: 'Test Tool 177' } },
                    { title: 'Retry Test Tool 1770609697074' },
                    { title: 'Test Tool 1770609271948' }
                ]
            },
            select: {
                id: true,
                title: true,
                slug: true
            }
        });

        if (testTools.length === 0) {
            return createSuccessResponse({
                message: "No test tools found",
                deleted: []
            });
        }

        // Delete each test tool
        const deleted = [];
        for (const tool of testTools) {
            await prisma.tool.delete({
                where: { id: tool.id }
            });
            deleted.push({
                id: tool.id,
                title: tool.title
            });
        }

        // Revalidate tools cache
        const { revalidateTag } = await import('next/cache');
        // @ts-ignore - Next.js 16.1.6 requires 2 args for revalidateTag
        revalidateTag('tools', undefined);

        return createSuccessResponse({
            message: `Successfully deleted ${deleted.length} test tool(s)`,
            deleted
        });

    } catch (error) {
        return createErrorResponse(
            error instanceof Error ? error.message : "Failed to delete test tools",
            500
        );
    }
}
