import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { name, ingredients, description, type } = body;
    
    const food = await prisma.food.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(ingredients && { ingredients }),
        ...(description && { description }),
        ...(type && { type }),
      },
    });
    
    return Response.json(food);
  } catch (error) {
    console.error('Error updating food:', error);
    return Response.json({ error: 'Failed to update food' }, { status: 500 });
  }
}
