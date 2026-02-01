import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, BarChart3 } from 'lucide-react';

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:flex bg-gray-900 text-white w-64 min-h-screen p-6 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Navigation</h2>
          </div>
          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
              onClick={onClose}
            >
              <UtensilsCrossed size={20} />
              <span>Menu Management</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
              onClick={onClose}
            >
              <ShoppingCart size={20} />
              <span>Orders</span>
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
              onClick={onClose}
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
