'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

function CreateFoodPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    type: 'fresh' as const,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.name || !formData.description || !formData.ingredients) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/create-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create food');
      }

      router.push('/foods');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create food');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card-bg rounded-md shadow-md p-8 border-2 border-primary">
          <h1 className="text-4xl font-bold text-primary mb-8">Create New Food</h1>

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="e.g., Spaghetti Carbonara"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="Describe your food..."
              />
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-text">
                Ingredients <span className="text-red-500">*</span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="e.g., Pasta, Eggs, Bacon, Cheese"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-text">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
              >
                <option value="fresh">Fresh</option>
                <option value="upf">UPF (Ultra-Processed Food)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? 'Creating...' : 'Create Food'}
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => router.push('/foods')}
              className="text-primary hover:opacity-80 font-medium"
            >
              ← Back to Foods
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFoodPage;
