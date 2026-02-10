
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const tools = await prisma.tool.findMany({
        where: {
            title: {
                contains: 'Retry',
                mode: 'insensitive',
            },
        },
        select: {
            title: true,
            createdAt: true,
        }
    });
    console.log(JSON.stringify(tools, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
