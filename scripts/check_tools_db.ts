import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.tool.count();
    console.log(`Total tools: ${count}`);

    if (count > 0) {
        const tools = await prisma.tool.findMany({
            select: { title: true, category: true },
            take: 20
        });
        console.log('Sample tools:', tools);
    } else {
        console.log('No tools found.');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
