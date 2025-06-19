import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const KPICard = ({ title, value, change, icon: Icon, loading }) => {
  const isPositive = change >= 0;
  
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
          <ArrowUpRight size={20} className="text-green-500" />
        ) : (
          <ArrowDownRight size={20} className="text-red-500" />
        )}
        <span className={`ml-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
        </span>
        <span className="text-gray-500 text-sm ml-2">vs last month</span>
      </div>
    </div>
  );
};

const SalesChart = ({ timeRange, loading, error }) => {
  const salesData = {
    daily: [
      { name: 'Mon', revenue: 4000, orders: 24 },
      { name: 'Tue', revenue: 3000, orders: 18 },
      { name: 'Wed', revenue: 5000, orders: 32 },
      { name: 'Thu', revenue: 4500, orders: 28 },
      { name: 'Fri', revenue: 6000, orders: 38 },
      { name: 'Sat', revenue: 5500, orders: 35 },
      { name: 'Sun', revenue: 4200, orders: 26 }
    ],
    weekly: [
      { name: 'Week 1', revenue: 28000, orders: 180 },
      { name: 'Week 2', revenue: 32000, orders: 210 },
      { name: 'Week 3', revenue: 35000, orders: 240 },
      { name: 'Week 4', revenue: 38000, orders: 260 }
    ],
    monthly: [
      { name: 'Jan', revenue: 120000, orders: 800 },
      { name: 'Feb', revenue: 135000, orders: 920 },
      { name: 'Mar', revenue: 148000, orders: 1050 },
      { name: 'Apr', revenue: 142000, orders: 980 },
      { name: 'May', revenue: 156000, orders: 1120 },
      { name: 'Jun', revenue: 168000, orders: 1200 }
    ]
  };

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load chart data</p>
          <button className="text-orange-500 hover:text-orange-600">Try again</button>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={salesData[timeRange]}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          stroke="#666"
          fontSize={12}
        />
        <YAxis 
          stroke="#666"
          fontSize={12}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value, name) => [
            name === 'revenue' ? `$${value.toLocaleString()}` : value,
            name === 'revenue' ? 'Revenue' : 'Orders'
          ]}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#f97316" 
          strokeWidth={3}
          dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const TopProductsChart = ({ sortBy, loading, error }) => {
  const [topProducts, setTopProducts] = useState([
    { name: 'iPhone 15 Pro', units: 245, revenue: 299000, growth: 12.5 },
    { name: 'MacBook Pro M3', units: 89, revenue: 178000, growth: -3.2 },
    { name: 'AirPods Pro', units: 156, revenue: 38900, growth: 8.7 },
    { name: 'iPad Air', units: 78, revenue: 46800, growth: 15.3 },
    { name: 'Apple Watch', units: 134, revenue: 53600, growth: -1.8 }
  ]);

  useEffect(() => {
    const sorted = [...topProducts].sort((a, b) => {
      return sortBy === 'revenue' ? b.revenue - a.revenue : b.units - a.units;
    });
    setTopProducts(sorted);
  }, [sortBy]);

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load product data</p>
          <button className="text-orange-500 hover:text-orange-600">Try again</button>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={topProducts} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          type="number" 
          stroke="#666"
          fontSize={12}
          tickFormatter={(value) => sortBy === 'revenue' ? `$${(value/1000).toFixed(0)}k` : value}
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          stroke="#666"
          fontSize={12}
          width={100}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value, name) => [
            sortBy === 'revenue' ? `$${value.toLocaleString()}` : `${value} units`,
            sortBy === 'revenue' ? 'Revenue' : 'Units Sold'
          ]}
        />
        <Bar 
          dataKey={sortBy} 
          fill="#f97316"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const RecentOrdersTable = ({ loading }) => {
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

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-center justify-between py-3">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-500">Order ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium">{order.id}</td>
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4 font-medium">{order.amount}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('daily');
  const [productSort, setProductSort] = useState('revenue');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Clock size={16} />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              autoRefresh 
                ? 'bg-orange-50 text-orange-600 border-orange-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Total Users"
          value="2,543"
          change={12.5}
          icon={Users}
          loading={loading}
        />
        <KPICard
          title="Total Orders"
          value="1,235"
          change={-8.3}
          icon={ShoppingBag}
          loading={loading}
        />
        <KPICard
          title="Total Revenue"
          value="$45,678"
          change={15.7}
          icon={DollarSign}
          loading={loading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <p className="text-sm text-gray-500">Revenue trends over time</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <SalesChart timeRange={timeRange} loading={loading} error={error} />
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
              <p className="text-sm text-gray-500">Best performing products</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={productSort}
                onChange={(e) => setProductSort(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="revenue">By Revenue</option>
                <option value="units">By Quantity</option>
              </select>
            </div>
          </div>
          <TopProductsChart sortBy={productSort} loading={loading} error={error} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <p className="text-sm text-gray-500">Latest customer orders</p>
          </div>
          <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            View All Orders
          </button>
        </div>
        <RecentOrdersTable loading={loading} />
      </div>
    </div>
  );
};

export default Overview;