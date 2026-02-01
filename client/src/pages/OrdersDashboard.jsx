import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Toast } from '../components/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Preparing: 'bg-blue-100 text-blue-800',
    Ready: 'bg-green-100 text-green-800',
    Delivered: 'bg-purple-100 text-purple-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  // Fetch orders
  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/orders?page=${page}&limit=10`;
      if (selectedStatus) {
        url += `&status=${selectedStatus}`;
      }
      const response = await axios.get(url);
      setOrders(response.data.data);
      setTotalPages(response.data.pages);
      setCurrentPage(page);
    } catch (err) {
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, [selectedStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
      showToast('Order status updated', 'success');
      fetchOrders(currentPage);
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex-1 p-4 sm:p-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Orders Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">Order #</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold hidden sm:table-cell">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">Total</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold hidden md:table-cell">Created</th>
                <th className="px-3 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <React.Fragment key={order._id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 font-mono text-xs sm:text-sm">{order.orderNumber}</td>
                    <td className="px-3 sm:px-6 py-4 hidden sm:table-cell text-sm">{order.customerName}</td>
                    <td className="px-3 sm:px-6 py-4 font-semibold text-sm">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border-0 ${statusColors[order.status]}`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center">
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {expandedOrder === order._id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr className="bg-gray-50 border-b">
                      <td colSpan="6" className="px-3 sm:px-6 py-4">
                        <div>
                          <h4 className="font-semibold mb-3">Order Items:</h4>
                          <ul className="space-y-2">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between text-xs sm:text-sm">
                                <span>
                                  {item.menuItem.name} x {item.quantity}
                                </span>
                                <span className="font-semibold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {order.tableNumber && (
                            <p className="text-sm mt-3 text-gray-600">
                              Table: {order.tableNumber}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => fetchOrders(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => fetchOrders(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

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
