import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, BarChart3 } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Navigation</h2>
      </div>
      <nav className="space-y-4">
        <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <UtensilsCrossed size={20} />
          <span>Menu Management</span>
        </Link>
        <Link to="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <ShoppingCart size={20} />
          <span>Orders</span>
        </Link>
        <Link to="/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </Link>
      </nav>
    </aside>
  );
}
