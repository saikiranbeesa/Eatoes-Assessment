import React from 'react';
import { Edit, Trash2, ToggleRight } from 'lucide-react';

export function MenuCard({ item, onEdit, onDelete, onToggle, isLoading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex-1">{item.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
            item.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}>
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.category}</p>
      </div>

      <p className="text-gray-700 mb-4 text-xs sm:text-sm line-clamp-2">{item.description}</p>

      <div className="mb-4">
        <p className="text-xl sm:text-2xl font-bold text-red-600">${item.price}</p>
        {item.preparationTime && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Prep: {item.preparationTime} min</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onToggle(item._id, item.isAvailable)}
          disabled={isLoading}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm"
        >
          <ToggleRight size={18} />
          <span className="hidden xs:inline">Toggle</span>
        </button>
        <button
          onClick={() => onEdit(item)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <Edit size={18} />
          <span className="hidden xs:inline">Edit</span>
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <Trash2 size={18} />
          <span className="hidden xs:inline">Delete</span>
        </button>
      </div>
    </div>
  );
}
