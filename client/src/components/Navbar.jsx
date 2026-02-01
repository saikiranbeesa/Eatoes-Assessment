import React from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1 hover:bg-red-700 rounded transition"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <h1 className="text-lg sm:text-2xl font-bold">Eatoes Admin</h1>
        </div>
        <p className="text-xs sm:text-sm hidden sm:block">Restaurant Management Dashboard</p>
      </div>
    </nav>
  );
}
