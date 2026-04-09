import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * One-time admin endpoint to update tool names and positions.
 * POST /api/admin/update-tool-names
 * Authorization: Bearer <ADMIN_PASSWORD>
 */
const nameUpdates: Record<string, string> = {
  'chatgpt': 'ChatGPT 5.3',
  'claude': 'Claude',
  'gemini-code-assist': 'Gemini 3.1 Pro',
  'cursor': 'Cursor',
  'devin': 'Devin',
  'windsurf': 'Windsurf',
  'github-copilot': 'GitHub Copilot',
  'ollama': 'Ollama',
  'supermaven': 'Supermaven',
  'linear': 'Linear',
  'notion-ai': 'Notion AI',
  'replit-ai': 'Replit AI',
  'tabnine': 'Tabnine',
  'cody': 'Cody',
  'builder-io': 'Builder.io',
  'v0': 'v0',
  'perplexity': 'Perplexity',
  'lovable': 'Lovable',
  'coderabbit': 'CodeRabbit',
  'cosine': 'Cosine',
  'aider': 'Aider',
};

export async function POST(request: NextRequest) {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: string[] = [];

    // 1. Update Names
    for (const [slug, newTitle] of Object.entries(nameUpdates)) {
        try {
            const tool = await prisma.tool.findUnique({ where: { slug } });
            if (!tool) continue;
            
            await prisma.tool.update({
                where: { slug },
                data: { title: newTitle },
            });
            results.push(`✅ Updated name: ${slug} → "${newTitle}"`);
        } catch (error) {
            results.push(`✗ Failed name update: ${slug}: ${error}`);
        }
    }

    // 2. Reposition Top 3 Major Tools
    const topTools = [
        { slug: 'gemini-code-assist', title: 'Gemini 3.1 Pro', date: '2030-01-03T00:00:00Z' },
        { slug: 'claude', title: 'Claude', date: '2030-01-02T00:00:00Z' },
        { slug: 'chatgpt', title: 'ChatGPT 5.3', date: '2030-01-01T00:00:00Z' },
    ];

    for (const [index, { slug, date }] of topTools.entries()) {
        try {
            const tool = await prisma.tool.findUnique({ where: { slug } });
            if (tool) {
                await prisma.tool.update({
                    where: { slug },
                    data: { 
                        createdAt: new Date(date),
                        isFeatured: true 
                    },
                });
                results.push(`✅ Prioritized ${slug} to top position ${index + 1} (isFeatured: true)`);
            }
        } catch (error) {
            results.push(`✗ Failed prioritizing ${slug}: ${error}`);
        }
    }

    return NextResponse.json({ results });
}
