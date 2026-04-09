import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * One-time admin endpoint to update tool names to official brand names.
 * POST /api/admin/update-tool-names
 * Authorization: Bearer <ADMIN_PASSWORD>
 */
const nameUpdates: Record<string, string> = {
  'chatgpt': 'ChatGPT',
  'claude': 'Claude',
  'gemini-code-assist': 'Gemini',
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

    for (const [slug, newTitle] of Object.entries(nameUpdates)) {
        try {
            const tool = await prisma.tool.findUnique({ where: { slug } });
            if (!tool) {
                results.push(`⚠ Not found: ${slug}`);
                continue;
            }
            if (tool.title === newTitle) {
                results.push(`✓ Already correct: ${slug} → "${newTitle}"`);
                continue;
            }

            await prisma.tool.update({
                where: { slug },
                data: { title: newTitle },
            });
            results.push(`✅ Updated: ${slug}: "${tool.title}" → "${newTitle}"`);
        } catch (error) {
            results.push(`✗ Failed: ${slug}: ${error}`);
        }
    }

    return NextResponse.json({ results });
}
