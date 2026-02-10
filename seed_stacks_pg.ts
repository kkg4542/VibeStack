
import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log("Connected to DB via pg");

        // Get tools IDs
        const toolSlugs = ['cursor', 'v0', 'claude', 'linear', 'notion-ai', 'github-copilot', 'perplexity'];
        // Construct parametrized query for safety even if we trust input
        const placeholders = toolSlugs.map((_, i) => `$${i + 1}`).join(',');
        const toolsRes = await client.query(`SELECT id, slug FROM "tools" WHERE slug IN (${placeholders})`, toolSlugs);
        const tools = toolsRes.rows;

        const toolMap = new Map(tools.map(t => [t.slug, t.id]));

        if (!toolMap.has('cursor') || !toolMap.has('v0') || !toolMap.has('claude')) {
            console.log("Missing core tools. Available:", Array.from(toolMap.keys()));
            return;
        }

        const stacks = [
            {
                idField: "indie-builder-stack",
                name: "Indie Builder Stack",
                description: "Ship an MVP with speed and low overhead.",
                tools: ['cursor', 'v0', 'claude']
            },
            {
                idField: "product-team-stack",
                name: "Product Team Stack",
                description: "Planning, specs, and execution without thrash.",
                tools: ['linear', 'notion-ai', 'github-copilot']
            },
            {
                idField: "research-writing-stack",
                name: "Research & Writing Stack",
                description: "From research to publishable drafts in one flow.",
                tools: ['perplexity', 'claude', 'notion-ai']
            }
        ];

        for (const stack of stacks) {
            // Check if tools exist for this stack
            const toolIds = stack.tools.map(slug => toolMap.get(slug)).filter(id => id !== undefined);
            if (toolIds.length !== stack.tools.length) {
                console.log(`Skipping ${stack.name} due to missing tools.`);
                continue;
            }

            const stackId = 'stack_' + Math.random().toString(36).substr(2, 9);

            // Removed "slug" column from insert
            await client.query(
                `INSERT INTO "stacks" (id, "id_field", name, description, "updated_at") VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING`,
                [stackId, stack.idField, stack.name, stack.description]
            );
            console.log(`Inserted stack: ${stack.name}`);

            // Insert StackTools
            for (const toolId of toolIds) {
                if (!toolId) continue;
                const stId = 'st_' + Math.random().toString(36).substr(2, 9);
                await client.query(
                    `INSERT INTO "stack_tools" (id, "stack_id", "tool_id", "created_at") VALUES ($1, $2, $3, NOW()) ON CONFLICT DO NOTHING`,
                    [stId, stackId, toolId]
                );
            }
            console.log(`Linked tools for ${stack.name}`);
        }

    } catch (error) {
        console.error("Error seeding stacks:", error);
    } finally {
        await client.end();
    }
}

main();
