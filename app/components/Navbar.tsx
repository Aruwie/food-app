'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-navbar-bg border-b-2 border-primary shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/foods" className="text-2xl font-bold text-primary">
          Food App
        </Link>
        
        <div className="flex gap-4">
          <Link
            href="/foods/create"
            className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            + Add Food
          </Link>
          
          <button
            onClick={handleLogout}
            className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
