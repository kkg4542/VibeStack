
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const tools = await prisma.tool.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    console.log("Found " + tools.length + " tools:");
    tools.forEach(tool => {
        console.log(`- ${tool.title} (slug: ${tool.slug}, created: ${tool.createdAt})`);
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
