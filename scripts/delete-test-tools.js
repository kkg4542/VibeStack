const { PrismaClient } = require('@prisma/client');

async function findAndDeleteTestTools() {
    const prisma = new PrismaClient();

    try {
        console.log('Searching for test tools...');

        // Search with exact titles from screenshot
        const tools = await prisma.tool.findMany({
            where: {
                OR: [
                    { title: 'Retry Test Tool 1770609697074' },
                    { title: 'Test Tool 1770609271948' },
                    { title: { startsWith: 'Retry Test Tool' } },
                    { title: { startsWith: 'Test Tool 177' } }
                ]
            }
        });

        console.log(`Found ${tools.length} test tools:`);
        tools.forEach(tool => {
            console.log(`  - ID: ${tool.id}, Title: ${tool.title}`);
        });

        if (tools.length > 0) {
            console.log('\nDeleting test tools...');
            for (const tool of tools) {
                await prisma.tool.delete({
                    where: { id: tool.id }
                });
                console.log(`  ✓ Deleted: ${tool.title}`);
            }
            console.log('\nAll test tools deleted!');
        } else {
            console.log('No test tools found in database.');
        }

    } catch (error) {
        console.error('Error:', error.message);
        console.error('Full error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

findAndDeleteTestTools();
