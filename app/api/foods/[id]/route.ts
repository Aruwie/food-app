import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const food = await prisma.food.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!food) {
      return Response.json({ error: 'Food not found' }, { status: 404 });
    }
    
    return Response.json(food);
  } catch (error) {
    console.error('Error fetching food:', error);
    return Response.json({ error: 'Failed to fetch food' }, { status: 500 });
  }
}
