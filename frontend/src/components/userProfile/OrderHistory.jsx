import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const orders = [
  {
    id: '#40755',
    date: '2024-02-15',
    status: 'Delivered',
    total: 1299.99,
    items: [
      {
        name: 'iPhone 15 Pro',
        quantity: 1,
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },
  {
    id: '#40754',
    date: '2024-02-10',
    status: 'Processing',
    total: 2499.99,
    items: [
      {
        name: 'MacBook Pro M3',
        quantity: 1,
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=150'
      }
    ]
  }
];

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortConfig.key === 'total') {
      return sortConfig.direction === 'asc'
        ? a.total - b.total
        : b.total - a.total;
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Order History</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-4 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-2 font-medium text-gray-500"
                >
                  Order ID
                </button>
              </th>
              <th className="py-4 px-4 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-2 font-medium text-gray-500"
                >
                  Date
                </button>
              </th>
              <th className="py-4 px-4 text-left">Status</th>
              <th className="py-4 px-4 text-left">
                <button
                  onClick={() => handleSort('total')}
                  className="flex items-center gap-2 font-medium text-gray-500"
                >
                  Total
                </button>
              </th>
              <th className="py-4 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <td className="py-4 px-4 font-medium">{order.id}</td>
                  <td className="py-4 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    {expandedOrder === order.id ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan="5" className="bg-gray-50 p-4">
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-white rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;