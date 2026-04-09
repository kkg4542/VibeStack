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

    // 2. Reposition ChatGPT next to Claude
    try {
        const claude = await prisma.tool.findUnique({ where: { slug: 'claude' } });
        const chatgpt = await prisma.tool.findUnique({ where: { slug: 'chatgpt' } });

        if (claude && chatgpt) {
            // Set ChatGPT's createdAt to be slightly after Claude's 
            // so it appears next to it in 'createdAt desc' ordering.
            // Using +1000ms ensures it's above/next in default sort
            const newDate = new Date(claude.createdAt.getTime() + 1000);
            await prisma.tool.update({
                where: { slug: 'chatgpt' },
                data: { createdAt: newDate },
            });
            results.push(`✅ Repositioned ChatGPT next to Claude (New createdAt: ${newDate.toISOString()})`);
        } else {
            results.push('⚠ Could not find Claude or ChatGPT to reposition');
        }
    } catch (error) {
        results.push(`✗ Failed repositioning: ${error}`);
    }

    return NextResponse.json({ results });
}
