import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const SellerOrders = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in and is a seller
    if (!user) {
      navigate('/seller/login');
      return;
    }
    
    if (user.role !== 'seller') {
      navigate('/seller/login');
      return;
    }
  }, [user, navigate]);
  
  useEffect(() => {
    const fetchOrders = () => {
      try {
        // Use our global function to get seller orders
        if (window.getSellerOrders) {
          const sellerOrders = window.getSellerOrders('test-seller-1');
          setOrders(sellerOrders);
        } else {
          // Fallback to mock data
          setOrders([
            {
              _id: 'order-1',
              customerName: 'Student Tester',
              customerEmail: 'test.student@example.com',
              items: [
                { name: 'Organic Apples', price: 99, quantity: 2 },
                { name: 'Chocolate Chip Cookies', price: 70, quantity: 1 }
              ],
              totalAmount: 268,
              status: 'delivered',
              orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              deliveryAddress: 'Test Hostel, Room 101'
            }
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
    
    // Set up a timer to check for new orders every 5 seconds
    const intervalId = setInterval(() => {
      if (window.getSellerOrders) {
        const sellerOrders = window.getSellerOrders('test-seller-1');
        setOrders(sellerOrders);
      }
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        return {
          ...order,
          status: newStatus
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
    
    // Update in localStorage
    if (window.getSellerOrders) {
      const allOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const updatedAllOrders = allOrders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      localStorage.setItem('mockOrders', JSON.stringify(updatedAllOrders));
    }
  };
  
  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };
  
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipping':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'pending':
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <FiPackage className="w-5 h-5 text-blue-500" />;
      case 'shipping':
        return <FiTruck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FiClock className="w-5 h-5 text-gray-500" />;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'processing' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setStatusFilter('shipping')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'shipping' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Shipping
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Delivered
          </button>
        </div>
        
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by order ID or customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-500">
            {statusFilter !== 'all' ? 'Try changing your filter or ' : ''}
            Check back later for new orders.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="max-h-20 overflow-y-auto">
                        {order.items.map((item, index) => (
                          <div key={index} className="mb-1">
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon status={order.status} />
                        <span className={`ml-2 text-sm capitalize ${
                          order.status === 'pending' ? 'text-yellow-500' :
                          order.status === 'processing' ? 'text-blue-500' :
                          order.status === 'shipping' ? 'text-purple-500' :
                          order.status === 'delivered' ? 'text-green-500' :
                          order.status === 'cancelled' ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleStatusChange(order._id, 'processing')}
                          disabled={order.status !== 'pending'}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'pending' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Process
                        </button>
                        <button 
                          onClick={() => handleStatusChange(order._id, 'shipping')}
                          disabled={order.status !== 'processing'}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'processing' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Ship
                        </button>
                        <button 
                          onClick={() => handleStatusChange(order._id, 'delivered')}
                          disabled={order.status !== 'shipping'}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'shipping' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Deliver
                        </button>
                        <button 
                          onClick={() => handleStatusChange(order._id, 'cancelled')}
                          disabled={order.status === 'delivered' || order.status === 'cancelled'}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            (order.status !== 'delivered' && order.status !== 'cancelled') ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl p-6 mx-4 bg-white rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Order Details: {selectedOrder._id}</h2>
              <button
                onClick={closeDetailModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-medium">Customer Information</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                  <p><span className="font-medium">Delivery Address:</span> {selectedOrder.deliveryAddress}</p>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-medium">Order Information</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p>
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                  <p><span className="font-medium">Placed On:</span> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                  <p><span className="font-medium">Total Amount:</span> ₹{selectedOrder.totalAmount}</p>
                </div>
              </div>
            </div>
            
            <h3 className="mb-2 text-lg font-medium">Order Items</h3>
            <div className="mb-6 overflow-hidden bg-gray-50 rounded-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-sm">Item</th>
                    <th className="px-4 py-2 text-sm">Quantity</th>
                    <th className="px-4 py-2 text-sm">Price</th>
                    <th className="px-4 py-2 text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">₹{item.price}</td>
                      <td className="px-4 py-3 font-medium">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="px-4 py-3 font-medium text-right">Total</td>
                    <td className="px-4 py-3 font-bold">₹{selectedOrder.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
              <div className="flex flex-wrap justify-end gap-2">
                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => handleStatusChange(selectedOrder._id, 'shipping')}
                    className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    Mark as Shipping
                  </button>
                )}
                {selectedOrder.status === 'shipping' && (
                  <button
                    onClick={() => handleStatusChange(selectedOrder._id, 'delivered')}
                    className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Mark as Delivered
                  </button>
                )}
                <button
                  onClick={() => handleStatusChange(selectedOrder._id, 'cancelled')}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders; 