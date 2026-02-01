import React from 'react';
import { Menu } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Menu size={28} />
          <h1 className="text-2xl font-bold">Eatoes Admin</h1>
        </div>
        <p className="text-sm">Restaurant Management Dashboard</p>
      </div>
    </nav>
  );
}
