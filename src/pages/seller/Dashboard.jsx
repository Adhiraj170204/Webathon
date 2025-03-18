import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const SellerDashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    products: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in and is a seller
    if (!user || user.role !== 'seller') {
      navigate('/seller/login');
      return;
    }
    
    // Fetch dashboard data
    // This is mocked for now - would be an API call in a real app
    setTimeout(() => {
      setStats({
        totalOrders: 42,
        revenue: 12568,
        products: 15,
        pendingOrders: 7
      });
      
      setRecentOrders([
        { id: 'ORD9876', customer: 'Rahul Sharma', total: 240, status: 'delivered', date: '2023-03-17' },
        { id: 'ORD9855', customer: 'Priya Singh', total: 350, status: 'processing', date: '2023-03-17' },
        { id: 'ORD9832', customer: 'Amit Kumar', total: 180, status: 'processing', date: '2023-03-16' },
        { id: 'ORD9812', customer: 'Neha Verma', total: 520, status: 'delivered', date: '2023-03-15' }
      ]);
      
      setLoading(false);
    }, 800);
  }, [user, navigate]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Seller Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold">₹{stats.revenue.toLocaleString()}</p>
        </div>
        
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-500">Products</h3>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>
        
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-500">Pending Orders</h3>
          <p className="text-3xl font-bold">{stats.pendingOrders}</p>
        </div>
      </div>
      
      {/* Quick links */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link 
          to="/seller/products" 
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Manage Products
        </Link>
        <Link 
          to="/seller/orders" 
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          View Orders
        </Link>
        <Link 
          to="/seller/promotions" 
          className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          Create Promotion
        </Link>
      </div>
      
      {/* Recent orders table */}
      <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">₹{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/seller/orders" className="text-blue-600 hover:underline">
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard; 