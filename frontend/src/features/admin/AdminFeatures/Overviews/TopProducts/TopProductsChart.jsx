import { useState, useEffect } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

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

export default TopProductsChart;
