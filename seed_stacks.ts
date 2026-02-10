
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Deletion handled via CLI or ignored to bypass prepared statement issues
        console.log("Skipping deletion (assumed done via CLI).");

        // Get tools
        const toolSlugs = ['cursor', 'v0', 'claude', 'linear', 'notion-ai', 'github-copilot', 'perplexity'];
        const tools = await prisma.tool.findMany({
            where: { slug: { in: toolSlugs } }
        });

        const toolMap = new Map(tools.map(t => [t.slug, t.id]));

        // Check availability
        if (!toolMap.has('cursor') || !toolMap.has('v0') || !toolMap.has('claude')) {
            console.log("Missing core tools. Available:", Array.from(toolMap.keys()));
            return;
        }

        // Create "Indie Builder Stack"
        await prisma.stack.create({
            data: {
                idField: "indie-builder-stack",
                name: "Indie Builder Stack",
                slug: "indie-builder-stack",
                description: "Ship an MVP with speed and low overhead.",
                tools: {
                    connect: [
                        { id: toolMap.get('cursor') },
                        { id: toolMap.get('v0') },
                        { id: toolMap.get('claude') },
                    ]
                }
            }
        });
        console.log("Created Indie Builder Stack");

        // Create "Product Team Stack"
        if (toolMap.has('linear') && toolMap.has('notion-ai') && toolMap.has('github-copilot')) {
            await prisma.stack.create({
                data: {
                    idField: "product-team-stack",
                    name: "Product Team Stack",
                    slug: "product-team-stack",
                    description: "Planning, specs, and execution without thrash.",
                    tools: {
                        connect: [
                            { id: toolMap.get('linear') },
                            { id: toolMap.get('notion-ai') },
                            { id: toolMap.get('github-copilot') },
                        ]
                    }
                }
            });
            console.log("Created Product Team Stack");
        }

        // Create "Research & Writing Stack"
        if (toolMap.has('perplexity') && toolMap.has('claude') && toolMap.has('notion-ai')) {
            await prisma.stack.create({
                data: {
                    idField: "research-writing-stack",
                    name: "Research & Writing Stack",
                    slug: "research-writing-stack",
                    description: "From research to publishable drafts in one flow.",
                    tools: {
                        connect: [
                            { id: toolMap.get('perplexity') },
                            { id: toolMap.get('claude') },
                            { id: toolMap.get('notion-ai') },
                        ]
                    }
                }
            });
            console.log("Created Research & Writing Stack");
        }

    } catch (error) {
        console.error("Error seeding stacks:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
