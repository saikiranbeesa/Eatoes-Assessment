import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function Toast({ message, type = 'error', onClose }) {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className={`${bgColor} text-white p-4 rounded-lg flex items-center gap-3 shadow-lg`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">×</button>
    </div>
  );
}
