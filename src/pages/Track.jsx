import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TrackPage = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if we have order data from navigation state
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
      // Simulate fetching order details
      fetchOrderDetails(location.state.orderId);
    } else {
      setIsLoading(false);
    }
  }, [location]);
  
  const fetchOrderDetails = (id) => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock order data
      const mockOrder = {
        id: id,
        status: 'preparing',
        placedAt: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
        estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
        items: [
          { name: 'Maggi Noodles', quantity: 2, price: 42 },
          { name: 'Coca-Cola (500ml)', quantity: 1, price: 40 }
        ],
        total: 124,
        deliveryAddress: {
          hostel: 'Block A',
          roomNumber: '203'
        },
        deliveryPerson: {
          name: 'Rahul',
          phone: '9876543210'
        }
      };
      
      setOrderDetails(mockOrder);
      setOrderStatus(mockOrder.status);
      
      // Calculate estimated time
      const estimatedDelivery = new Date(mockOrder.estimatedDelivery);
      const now = new Date();
      const diffMinutes = Math.round((estimatedDelivery - now) / 60000);
      setEstimatedTime(`${diffMinutes} minutes`);
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      fetchOrderDetails(orderId);
    }
  };
  
  const getStatusStepClass = (step) => {
    const statusSteps = {
      'placed': 0,
      'preparing': 1,
      'ready': 2,
      'delivering': 3,
      'delivered': 4
    };
    
    const currentStepIndex = statusSteps[orderStatus] || 0;
    const stepIndex = statusSteps[step];
    
    if (stepIndex < currentStepIndex) {
      return 'bg-green-600'; // Completed
    } else if (stepIndex === currentStepIndex) {
      return 'bg-blue-600'; // Current
    } else {
      return 'bg-gray-300'; // Upcoming
    }
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Track Your Order</h1>
      
      {!orderDetails && !isLoading && (
        <div className="max-w-md p-6 mx-auto border border-gray-200 rounded-lg">
          <p className="mb-4 text-center">Enter your order ID to track your delivery</p>
          <form onSubmit={handleTrackOrder}>
            <div className="mb-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID (e.g. ORD123456)"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Track Order
            </button>
          </form>
        </div>
      )}
      
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {orderDetails && !isLoading && (
        <div className="max-w-3xl mx-auto">
          <div className="p-6 mb-8 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold">Order #{orderDetails.id}</h2>
                <p className="text-gray-600">Placed on {new Date(orderDetails.placedAt).toLocaleString()}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                  {orderStatus === 'placed' && 'Order Placed'}
                  {orderStatus === 'preparing' && 'Preparing'}
                  {orderStatus === 'ready' && 'Ready for Delivery'}
                  {orderStatus === 'delivering' && 'Out for Delivery'}
                  {orderStatus === 'delivered' && 'Delivered'}
                </span>
              </div>
            </div>
            
            {/* Status Timeline */}
            <div className="py-4 mb-6">
              <div className="relative flex justify-between">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStatusStepClass('placed')}`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="mt-2 text-xs">Placed</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStatusStepClass('preparing')}`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="mt-2 text-xs">Preparing</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStatusStepClass('ready')}`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="mt-2 text-xs">Ready</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStatusStepClass('delivering')}`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8 8.61V5a1 1 0 00-1-1H3z" />
                    </svg>
                  </div>
                  <span className="mt-2 text-xs">Delivering</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getStatusStepClass('delivered')}`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="mt-2 text-xs">Delivered</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-medium">Delivery Information</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p><span className="font-medium">Hostel:</span> {orderDetails.deliveryAddress.hostel}</p>
                  <p><span className="font-medium">Room Number:</span> {orderDetails.deliveryAddress.roomNumber}</p>
                  {orderStatus !== 'placed' && orderStatus !== 'preparing' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-medium">Delivery Person</p>
                      <p>{orderDetails.deliveryPerson.name}</p>
                      <p className="text-blue-600">{orderDetails.deliveryPerson.phone}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-medium">Order Details</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="space-y-2">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{orderDetails.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 mt-6 text-center bg-blue-50 rounded-md">
              <p className="text-lg font-medium text-blue-700">
                Estimated delivery in {estimatedTime}
              </p>
              <p className="text-sm text-blue-600">
                We'll notify you when your order is on the way!
              </p>
            </div>
            
            <div className="flex justify-center mt-8">
              <Link to="/shop" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                Order More
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPage; 