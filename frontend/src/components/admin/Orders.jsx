import React, { useState } from 'react';
import { Search, Filter, Download, Eye, MoreVertical } from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const orders = [
    {
      id: '#40755',
      customer: 'John Doe',
      items: 3,
      total: '$1,299.99',
      payment: 'Credit Card',
      status: 'Completed',
      date: '2024-02-15'
    },
    {
      id: '#40754',
      customer: 'Jane Smith',
      items: 2,
      total: '$849.99',
      payment: 'PayPal',
      status: 'Processing',
      date: '2024-02-14'
    },
    {
      id: '#40753',
      customer: 'Mike Johnson',
      items: 1,
      total: '$2,299.99',
      payment: 'Credit Card',
      status: 'Pending',
      date: '2024-02-14'
    },
    {
      id: '#40752',
      customer: 'Sarah Williams',
      items: 4,
      total: '$949.99',
      payment: 'Credit Card',
      status: 'Completed',
      date: '2024-02-13'
    },
    {
      id: '#40751',
      customer: 'Tom Brown',
      items: 2,
      total: '$1,499.99',
      payment: 'PayPal',
      status: 'Cancelled',
      date: '2024-02-13'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(orders.map(order => order.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === orders.length}
                    onChange={handleSelectAll}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left py-4 px-4">Order ID</th>
                <th className="text-left py-4 px-4">Customer</th>
                <th className="text-left py-4 px-4">Items</th>
                <th className="text-left py-4 px-4">Total</th>
                <th className="text-left py-4 px-4">Payment</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Date</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(order.id)}
                      onChange={() => handleSelectItem(order.id)}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium">{order.id}</td>
                  <td className="py-4 px-4">{order.customer}</td>
                  <td className="py-4 px-4">{order.items}</td>
                  <td className="py-4 px-4">{order.total}</td>
                  <td className="py-4 px-4">{order.payment}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{order.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye size={18} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;