import React, { useState } from 'react';
import {BarChart3, Clock, Package, AlertTriangle} from 'lucide-react';


const StockMonitoring = ({ loading }) => {
  const [stockData, setStockData] = useState([
    { name: 'iPhone 15 Pro', stock: 2, category: 'Phones', lastUpdated: new Date() },
    { name: 'MacBook Pro M3', stock: 8, category: 'Laptops', lastUpdated: new Date() },
    { name: 'AirPods Pro', stock: 25, category: 'Accessories', lastUpdated: new Date() },
    { name: 'IPad Air', stock: 12, category: 'Tablets', lastUpdated: new Date() },
    { name: 'Apple Watch', stock: 18, category: 'Watches', lastUpdated: new Date() },
    { name: 'Samsung Galaxy S24', stock: 5, category: 'Phones', lastUpdated: new Date() }
  ]);

  const getStockStatus = (stock) => {
    if (stock <= 2) return { status: 'critical', color: 'bg-red-100 text-red-800', badge: 'bg-red-500' };
    else if (stock <= 5) return { status: 'low', color: 'bg-yellow-100 text-yellow-800', badge: 'bg-yellow-500' };
    return { status: 'healthy', color: 'bg-green-100 text-green-800', badge: 'bg-green-500' };
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const criticalStockCount = stockData.filter(item => item.stock <= 2).length;
  const lowStockCount = stockData.filter(item => item.stock > 2 && item.stock <= 5).length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Stock Clearance</h2>
          <p className="text-sm text-gray-500">Monitor inventory levels</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Auto-refresh: 5min</span>
        </div>
      </div>

      {/* Stock Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            <div>
              <p className="text-small text-red-600 font-medium">Critical</p>
              <p className="text-xl font-bold text-red-700">{criticalStockCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-yellow-500" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-700">{lowStockCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-green-500" />
            <div>
              <p className="text-sm text-green-600 font-medium">Healthy</p>
              <p className="text-2xl font-bold text-green-700">{stockData.length - criticalStockCount - lowStockCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Items List */}
      <div className="space-y-3">
        {stockData.map((item, index) => {
          const stockStatus = getStockStatus(item.stock);
          return (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${stockStatus.badge}`}></div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
                  {item.stock} units
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  Updated: {formatTimestamp(item.lastUpdated)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockMonitoring;