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
export default RecentOrdersTable;