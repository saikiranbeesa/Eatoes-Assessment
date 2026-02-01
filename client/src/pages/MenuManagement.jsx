import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { MenuCard } from '../components/MenuCard';
import { MenuModal } from '../components/MenuModal';
import { Toast } from '../components/Toast';
import { useDebounce } from '../hooks/useDebounce';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState({});

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/menu`;
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setMenu(response.data.data);
      setFilteredMenu(response.data.data);
    } catch (err) {
      showToast('Failed to load menu', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Search with debounce
  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    } else {
      setFilteredMenu(menu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, menu]);

  // Fetch menu on mount and category change
  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menu/search?q=${debouncedSearch}`);
      setFilteredMenu(response.data.data);
    } catch (err) {
      showToast('Search failed', 'error');
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveItem = async (formData) => {
    try {
      if (editingItem?._id) {
        await axios.put(`${API_URL}/api/menu/${editingItem._id}`, formData);
        showToast('Item updated successfully', 'success');
      } else {
        await axios.post(`${API_URL}/api/menu`, formData);
        showToast('Item created successfully', 'success');
      }
      handleCloseModal();
      fetchMenu();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to save item', 'error');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`${API_URL}/api/menu/${id}`);
      showToast('Item deleted successfully', 'success');
      fetchMenu();
    } catch (err) {
      showToast('Failed to delete item', 'error');
    }
  };

  const handleToggleAvailability = async (id, currentStatus) => {
    // Optimistic UI Update
    setOptimisticUpdates(prev => ({
      ...prev,
      [id]: true
    }));

    const updatedMenu = menu.map(item =>
      item._id === id ? { ...item, isAvailable: !currentStatus } : item
    );
    setMenu(updatedMenu);
    setFilteredMenu(updatedMenu.filter(item => {
      if (!selectedCategory) return true;
      return item.category === selectedCategory;
    }));

    try {
      await axios.patch(`${API_URL}/api/menu/${id}/availability`);
      showToast('Availability updated', 'success');
    } catch (err) {
      // Rollback on error
      setMenu(menu.map(item =>
        item._id === id ? { ...item, isAvailable: currentStatus } : item
      ));
      showToast('Failed to update availability', 'error');
    } finally {
      setOptimisticUpdates(prev => ({
        ...prev,
        [id]: false
      }));
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Menu Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          >
            <option value="">All Categories</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>

          <button
            onClick={handleAddItem}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Item
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(item => (
            <MenuCard
              key={item._id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onToggle={handleToggleAvailability}
              isLoading={optimisticUpdates[item._id]}
            />
          ))}
        </div>
      )}

      {!loading && filteredMenu.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No menu items found
        </div>
      )}

      <MenuModal
        isOpen={isModalOpen}
        item={editingItem}
        onClose={handleCloseModal}
        onSave={handleSaveItem}
      />

      {toast && (
        <div className="fixed bottom-4 right-4">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}
