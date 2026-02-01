import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function Analytics() {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopSellers();
  }, []);

  const fetchTopSellers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/orders/analytics/top-sellers`);
      setTopSellers(response.data.data);
    } catch (err) {
      setError('Failed to load analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={24} className="text-green-600" />
          <h2 className="text-2xl font-bold">Top 5 Selling Items</h2>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : topSellers.length > 0 ? (
          <div className="space-y-4">
            {topSellers.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {item.details && item.details[0]?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.totalQty} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    ${item.totalRevenue?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No sales data available
          </div>
        )}
      </div>
    </div>
  );
}
