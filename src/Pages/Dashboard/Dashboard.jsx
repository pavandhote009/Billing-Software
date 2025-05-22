import React, { useEffect } from 'react';
import { fetchDashboardData } from '../../Service/DashboardService';
import toast from 'react-hot-toast';
import { FaRupeeSign, FaShoppingCart, FaHistory, FaSpinner } from 'react-icons/fa';

function Dashboard() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-2 text-xl text-gray-600">Loading Dashboard...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Failed to load the dashboard data. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Sales Card */}
        <div className="bg-gray-700 rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FaRupeeSign className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-100 text-sm font-medium">Today's Sales</h3>
            <p className="text-2xl font-bold text-gray-100">
              ₹{data.todaySales?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-gray-700 rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <FaShoppingCart className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-100 text-sm font-medium">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-100">{data.todayOrderCount || 0}</p>
          </div>
        </div>

        {/* Recent Orders Header */}
        <div className="bg-gray-700 rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <FaHistory className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-100 text-sm font-medium">Recent Orders</h3>
            <p className="text-2xl font-bold text-gray-100">{data.recentOrders?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-gray-500 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center">
            <FaHistory className="mr-2" /> Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-200">
              {data.recentOrders?.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-900 ">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  text-white">
                    {order.orderId?.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    ₹{order.grandTotal?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentMethod?.toLowerCase() === 'cash' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentDetails?.status?.toLowerCase() === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentDetails?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;