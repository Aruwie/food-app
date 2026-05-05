import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return Response.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return Response.json({ error: 'Failed to fetch foods' }, { status: 500 });
  }
}
