// Production database에서 테스트 툴 삭제
const { PrismaClient } = require('@prisma/client');

async function deleteProductionTestTools() {
    // Use production DATABASE_URL
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });

    try {
        console.log('Connecting to production database...');
        console.log('Searching for test tools...\n');

        // Search for test tools
        const testTools = await prisma.tool.findMany({
            where: {
                OR: [
                    { title: 'Retry Test Tool 1770609697074' },
                    { title: 'Test Tool 1770609271948' },
                    { title: { startsWith: 'Retry Test Tool' } },
                    { title: { startsWith: 'Test Tool 177' } },
                    { slug: { contains: 'test-tool' } },
                    { slug: { contains: 'retry-test' } }
                ]
            },
            select: {
                id: true,
                title: true,
                slug: true
            }
        });

        console.log(`Found ${testTools.length} test tool(s):`);
        testTools.forEach((tool, idx) => {
            console.log(`  ${idx + 1}. ${tool.title}`);
            console.log(`     ID: ${tool.id}`);
            console.log(`     Slug: ${tool.slug}\n`);
        });

        if (testTools.length === 0) {
            console.log('No test tools found. They may have already been deleted.');
            return;
        }

        // Delete each test tool
        console.log('Deleting test tools...\n');
        for (const tool of testTools) {
            try {
                await prisma.tool.delete({
                    where: { id: tool.id }
                });
                console.log(`✓ Deleted: ${tool.title}`);
            } catch (err) {
                console.error(`✗ Failed to delete ${tool.title}:`, err.message);
            }
        }

        console.log('\n✅ Test tools deletion complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
    } finally {
        await prisma.$disconnect();
        console.log('\nDatabase connection closed.');
    }
}

deleteProductionTestTools();
