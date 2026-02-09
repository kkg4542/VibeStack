
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSubmissions() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        toolName: true,
        status: true,
        paymentId: true,
        createdAt: true,
      },
    });

    console.log('Latest 5 Submissions:');
    console.table(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSubmissions();
