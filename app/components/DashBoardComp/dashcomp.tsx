'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '@/app/lib/api';
import Link from 'next/link';
import { navLinks, dashboardCards } from '@/app/helper';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();

  const fetchUser = async (id: string, token: string) => {
    try {
      const response = await authApi.getUser(id, token);
      if (response.success) {
        setUser(response.data.user);
      }
    } catch {
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const decoded = jwtDecode<{ sub: string; email: string; userName: string }>(token);
      fetchUser(decoded.sub, token);
    } catch {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-[250px_1fr]">
      
      
      <div className="flex items-center justify-between p-4 bg-gray-900 text-white md:hidden">
        <span className="text-xl font-bold text-blue-400">WillyDashy</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>
 
      <aside className={`flex flex-col justify-between p-4 bg-gray-900 text-white min-h-screen 
        ${sidebarOpen ? 'block' : 'hidden'} md:flex`}>
        <div>
          <div className="text-xl font-bold text-blue-400 mb-8 hidden md:block">WillyDashy</div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`py-2 px-4 rounded-lg hover:bg-gray-700 ${
                  pathName === link.href ? 'bg-gray-700 text-white font-semibold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <button onClick={logout} className="py-2 px-4 bg-red-600 text-white rounded-lg">
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Welcome back, {user?.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardCards.map((card) => (
            <div key={card.title} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">{card.description}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              <p className="text-gray-700 font-medium mt-1">{card.title}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}