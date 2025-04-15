import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={isPositive ? 'text-green-600' : 'text-red-600'} size={24} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {isPositive ? (
          <TrendingUp size={20} className="text-green-500" />
        ) : (
          <TrendingDown size={20} className="text-red-500" />
        )}
        <span className={`ml-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
        </span>
      </div>
    </div>
  );
};

const RecentOrdersTable = () => {
  const orders = [
    {
      id: '#40755',
      customer: 'John Doe',
      amount: '$1,200',
      status: 'Completed',
      date: '2024-02-15'
    },
    {
      id: '#40754',
      customer: 'Jane Smith',
      amount: '$850',
      status: 'Processing',
      date: '2024-02-14'
    },
    {
      id: '#40753',
      customer: 'Mike Johnson',
      amount: '$2,300',
      status: 'Pending',
      date: '2024-02-14'
    },
    {
      id: '#40752',
      customer: 'Sarah Williams',
      amount: '$950',
      status: 'Completed',
      date: '2024-02-13'
    },
    {
      id: '#40751',
      customer: 'Tom Brown',
      amount: '$1,500',
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

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Total Users"
          value="2,543"
          change={12.5}
          icon={Users}
        />
        <KPICard
          title="Total Orders"
          value="1,235"
          change={-8.3}
          icon={ShoppingBag}
        />
        <KPICard
          title="Total Revenue"
          value="$45,678"
          change={15.7}
          icon={DollarSign}
        />
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />
    </div>
  );
};

export default Overview;