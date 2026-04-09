import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Enhanced admin endpoint to update tool names and positions.
 * POST /api/admin/update-tool-names
 * Authorization: Bearer <ADMIN_PASSWORD>
 */

const nameUpdates: Record<string, string> = {
  'chatgpt': 'ChatGPT 5.3',
  'claude': 'Claude',
  'gemini': 'Gemini 3.1 Pro', // Base slug
  'gemini-code-assist': 'Gemini 3.1 Pro', // Alias
  'cursor': 'Cursor',
  'devin': 'Devin',
  'windsurf': 'Windsurf',
  'github-copilot': 'GitHub Copilot',
};

const topTools = [
    { slug: 'gemini', alias: 'gemini-code-assist', title: 'Gemini 3.1 Pro', date: '2030-01-03T00:00:00Z' },
    { slug: 'claude', alias: 'claude-code', title: 'Claude', date: '2030-01-02T00:00:00Z' },
    { slug: 'chatgpt', alias: 'openai-chatgpt', title: 'ChatGPT 5.3', date: '2030-01-01T00:00:00Z' },
];

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: string[] = [];

    // 1. Diagnostics: List current tools to help user debug
    const allTools = await prisma.tool.findMany({
        select: { slug: true, title: true }
    });
    results.push(`📊 Diagnostics: Found ${allTools.length} tools in DB.`);
    results.push(`Slugs found: ${allTools.map(t => t.slug).join(', ')}`);

    // 2. Update Names (Resilient)
    for (const [slug, newTitle] of Object.entries(nameUpdates)) {
        try {
            // Check exact and fuzzy
            const tool = await prisma.tool.findFirst({
                where: {
                    OR: [
                        { slug: slug },
                        { slug: { startsWith: slug + '-' } }
                    ]
                }
            });

            if (tool) {
                await prisma.tool.update({
                    where: { id: tool.id },
                    data: { title: newTitle },
                });
                results.push(`✅ Updated: "${tool.slug}" → "${newTitle}"`);
            }
        } catch (error) {
            results.push(`✗ Error updating ${slug}: ${error}`);
        }
    }

    // 3. Reposition Top 3 (Resilient)
    for (const [index, { slug, alias, date, title }] of topTools.entries()) {
        try {
            const tool = await prisma.tool.findFirst({
                where: {
                    OR: [
                        { slug: slug },
                        { slug: alias }
                    ]
                }
            });

            if (tool) {
                await prisma.tool.update({
                    where: { id: tool.id },
                    data: { 
                        title: title,
                        createdAt: new Date(date),
                        isFeatured: true 
                    },
                });
                results.push(`⭐ Prioritized: "${tool.slug}" as # ${index + 1}`);
            } else {
                results.push(`⚠ Not found for priority: ${slug} / ${alias}`);
            }
        } catch (error) {
            results.push(`✗ Error prioritizing ${slug}: ${error}`);
        }
    }

    return NextResponse.json({ 
        message: "Update process completed. Check results for details.",
        results 
    });
}
