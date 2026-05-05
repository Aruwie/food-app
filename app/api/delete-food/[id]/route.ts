import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const food = await prisma.food.delete({
      where: { id: parseInt(id) },
    });
    
    return Response.json({ message: 'Food deleted successfully', food });
  } catch (error) {
    console.error('Error deleting food:', error);
    return Response.json({ error: 'Failed to delete food' }, { status: 500 });
  }
}
