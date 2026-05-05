import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, ingredients, description, type } = body;
    
    if (!name || !ingredients || !description || !type) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const food = await prisma.food.create({
      data: {
        name,
        ingredients,
        description,
        type,
      },
    });
    
    return Response.json(food, { status: 201 });
  } catch (error) {
    console.error('Error creating food:', error);
    return Response.json({ error: 'Failed to create food' }, { status: 500 });
  }
}
