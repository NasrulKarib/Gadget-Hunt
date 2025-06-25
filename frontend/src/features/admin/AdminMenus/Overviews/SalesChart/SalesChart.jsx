import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

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

export default SalesChart;