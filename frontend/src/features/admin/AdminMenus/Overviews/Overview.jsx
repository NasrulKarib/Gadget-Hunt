import { useState, useEffect } from 'react';
import { Users, ShoppingBag, DollarSign, RefreshCw, Clock} from 'lucide-react';
import KPICard from './KPICard/KPICard';
import StockMonitoring from './StockMonitoring/StockMonitoring';
import SalesChart from './SalesChart/SalesChart';
import TopProductsChart from './TopProducts/TopProductsChart';
import RecentOrdersTable from './RecentOrders/RecentOrders';


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
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
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

       {/* KPI Cards  */}
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

      {/* Sales Overview and Top Products */}
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

      {/* Stock Monitoring */}
      <div className="grid grid-cols-1 gap-6">
        <StockMonitoring loading={loading} />
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