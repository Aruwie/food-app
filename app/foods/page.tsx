import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

interface Food {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

async function getFoods(): Promise<Food[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/foods`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch foods');
    }
    
    return await response.json();
  } catch {
    return [];
  }
}

async function FoodsPage() {
  const foods = await getFoods();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Our Menu</h1>

        {foods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-textalt text-lg">No foods available</p>
            <Link
              href="/foods/create"
              className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition font-semibold"
            >
              Create the first food
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <Link
                key={food.id}
                href={`/foods/${food.id}`}
                className="bg-card-bg rounded-md shadow-md hover:shadow-lg transition p-6 cursor-pointer border border-primary"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-text">{food.name}</h2>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    food.type === 'fresh' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {food.type}
                  </span>
                </div>
                
                <p className="text-textalt mb-3 line-clamp-2">
                  {food.description}
                </p>
                
                <div className="text-sm text-text">
                  <p className="mb-2">
                    <span className="font-semibold">Ingredients:</span> {food.ingredients}
                  </p>
                </div>
                
                <div className="text-xs text-textalt mt-4">
                  Created: {new Date(food.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodsPage;
