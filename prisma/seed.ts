import { PrismaClient } from '@prisma/client';
import { tools } from '../lib/tools';
import { stacks } from '../lib/stacks';
import { blogPosts } from '../lib/blog';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // 1. Create Tools
    for (const tool of tools) {
        await prisma.tool.upsert({
            where: { slug: tool.slug },
            update: {
                title: tool.title,
                description: tool.description,
                category: tool.category,
                pricing: tool.pricing,
                websiteUrl: tool.websiteUrl,
                affiliateUrl: tool.affiliateUrl,
                color: tool.color ?? "text-foreground",
                bgGradient: tool.bgGradient ?? "from-transparent to-transparent",
                features: tool.features ?? [],
            },
            create: {
                slug: tool.slug,
                title: tool.title,
                description: tool.description,
                category: tool.category,
                pricing: tool.pricing,
                websiteUrl: tool.websiteUrl,
                affiliateUrl: tool.affiliateUrl,
                color: tool.color ?? "text-foreground",
                bgGradient: tool.bgGradient ?? "from-transparent to-transparent",
                features: tool.features ?? [],
            },
        });
    }
    console.log(`Seeded ${tools.length} tools.`);

    // 2. Create Stacks
    for (const stack of stacks) {
        await prisma.stack.upsert({
            where: { idField: stack.id },
            update: {
                name: stack.name,
                description: stack.description,
                longDescription: stack.longDescription,
                totalPrice: stack.totalPrice,
                tags: stack.tags,
                idealFor: stack.idealFor,
                workflow: stack.workflow,
                icon: stack.icon,
                color: stack.color,
            },
            create: {
                idField: stack.id,
                name: stack.name,
                description: stack.description,
                longDescription: stack.longDescription,
                totalPrice: stack.totalPrice,
                tags: stack.tags,
                idealFor: stack.idealFor,
                workflow: stack.workflow,
                icon: stack.icon,
                color: stack.color,
            },
        });
    }
    console.log(`Seeded ${stacks.length} stacks.`);

    // 3. Create Stack-Tool relationships
    for (const stack of stacks) {
        const stackRecord = await prisma.stack.findUnique({
            where: { idField: stack.id },
        });
        if (!stackRecord) continue;

        for (const toolSlug of stack.tools) {
            const toolRecord = await prisma.tool.findUnique({
                where: { slug: toolSlug },
            });
            if (!toolRecord) continue;

            await prisma.stackTool.upsert({
                where: {
                    stackId_toolId: {
                        stackId: stackRecord.id,
                        toolId: toolRecord.id,
                    },
                },
                update: {},
                create: {
                    stackId: stackRecord.id,
                    toolId: toolRecord.id,
                },
            });
        }
    }
    console.log(`Created stack-tool relationships.`);

    // 4. Create Blog Posts
    for (const post of blogPosts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                date: post.date,
                author: post.author,
                category: post.category,
                readTime: post.readTime,
                image: post.image,
            },
            create: {
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                date: post.date,
                author: post.author,
                category: post.category,
                readTime: post.readTime,
                image: post.image,
            },
        });
    }
    console.log(`Seeded ${blogPosts.length} blog posts.`);

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
