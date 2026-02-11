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
            
            // Clear cache after deletion
            await clearToolsCache();
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

async function clearToolsCache() {
    try {
        console.log('\nClearing tools cache...');
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/admin/revalidate-tools`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            console.log('✓ Cache cleared successfully');
        } else {
            console.log('⚠ Cache clear failed, but tools were deleted');
        }
    } catch (error) {
        console.log('⚠ Could not clear cache:', error.message);
        console.log('  You may need to restart the server or wait 60 seconds for cache to expire');
    }
}

findAndDeleteTestTools();
