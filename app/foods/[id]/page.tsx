'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

interface Food {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  type: 'upf' | 'fresh';
  createdAt: string;
  updatedAt: string;
}

function FoodDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    type: 'fresh' as const,
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`/api/foods/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch food');
        }

        const data = await response.json();
        setFood(data);
        setFormData({
          name: data.name,
          description: data.description,
          ingredients: data.ingredients,
          type: data.type,
        });
      } catch {
        setError('Failed to load food details');
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const response = await fetch(`/api/update-food/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update food');

      window.location.reload();
    } catch {
      setError('Failed to update food');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this food?')) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/delete-food/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete food');

      router.push('/foods');
    } catch {
      setError('Failed to delete food');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-textalt">Loading...</p>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Food not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card-bg rounded-md shadow-md p-8 border-2 border-primary">
          <h1 className="text-4xl font-bold text-primary mb-8">Edit Food</h1>

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-text">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="Separate ingredients with commas"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-text">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
              >
                <option value="fresh">Fresh</option>
                <option value="upf">UPF</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {updating ? 'Updating...' : 'Update Food'}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {deleting ? 'Deleting...' : 'Delete Food'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-sm text-textalt border-t border-primary pt-6">
            <p>Created: {new Date(food.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(food.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetailPage;
