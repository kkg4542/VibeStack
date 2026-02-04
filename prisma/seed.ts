import { PrismaClient } from '@prisma/client';
import { tools } from '../lib/tools';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // 1. Create or Connect Categories
    const categories = Array.from(new Set(tools.map(t => t.category)));
    const categoryMap: Record<string, string> = {};

    for (const catName of categories) {
        const category = await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: { name: catName },
        });
        categoryMap[catName] = category.id;
    }

    console.log(`Created ${categories.length} categories.`);

    // 2. Create Tools
    for (const tool of tools) {
        // We store the icon component's name as a string
        const iconName = tool.icon.name || (tool.icon as any).displayName || 'DefaultIcon';

        await prisma.tool.upsert({
            where: { slug: tool.slug },
            update: {
                title: tool.title,
                description: tool.description,
                iconName: iconName,
                categoryId: categoryMap[tool.category],
                pricing: tool.pricing,
                websiteUrl: tool.websiteUrl,
                affiliateUrl: tool.affiliateUrl,
                color: tool.color,
                bgGradient: tool.bgGradient,
                features: tool.features ?? [],
            },
            create: {
                slug: tool.slug,
                title: tool.title,
                description: tool.description,
                iconName: iconName,
                categoryId: categoryMap[tool.category],
                pricing: tool.pricing,
                websiteUrl: tool.websiteUrl,
                affiliateUrl: tool.affiliateUrl,
                color: tool.color,
                bgGradient: tool.bgGradient,
                features: tool.features ?? [],
            },
        });
    }

    console.log(`Seeded ${tools.length} tools successfully.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
