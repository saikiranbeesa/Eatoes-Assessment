import React from 'react';
import { Edit, Trash2, ToggleRight } from 'lucide-react';

export function MenuCard({ item, onEdit, onDelete, onToggle, isLoading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            item.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}>
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{item.category}</p>
      </div>

      <p className="text-gray-700 mb-4 text-sm">{item.description}</p>

      <div className="mb-4">
        <p className="text-2xl font-bold text-red-600">${item.price}</p>
        {item.preparationTime && (
          <p className="text-sm text-gray-500 mt-1">Prep: {item.preparationTime} min</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(item._id, item.isAvailable)}
          disabled={isLoading}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ToggleRight size={18} />
          Toggle
        </button>
        <button
          onClick={() => onEdit(item)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Edit size={18} />
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}
