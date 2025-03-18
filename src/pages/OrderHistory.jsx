import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const OrderHistory = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch orders from API
    // For now, simulate with setTimeout and mock data
    const fetchOrders = () => {
      setTimeout(() => {
        setOrders(getMockOrders());
        setLoading(false);
      }, 800);
    };
    
    fetchOrders();
  }, []);
  
  // Generate mock order data
  const getMockOrders = () => {
    return [
      {
        id: 'ORD789456',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: 'delivered',
        total: 245,
        items: [
          { name: 'Maggi Noodles', quantity: 3, price: 42 },
          { name: 'Coca-Cola (500ml)', quantity: 2, price: 40 },
          { name: 'Lays Chips', quantity: 1, price: 25 }
        ]
      },
      {
        id: 'ORD654321',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        status: 'delivered',
        total: 180,
        items: [
          { name: 'Dairy Milk Chocolate', quantity: 2, price: 30 },
          { name: 'Colgate Toothpaste', quantity: 1, price: 75 },
          { name: 'Hand Sanitizer', quantity: 1, price: 55 }
        ]
      },
      {
        id: 'ORD123789',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        status: 'delivered',
        total: 150,
        items: [
          { name: 'Nescafe Coffee', quantity: 1, price: 110 },
          { name: 'Amul Butter', quantity: 1, price: 50 }
        ]
      }
    ];
  };
  
  if (!user) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="mb-6 text-3xl font-bold">Order History</h1>
        <div className="p-8 mb-8 bg-gray-100 rounded-lg">
          <p className="mb-4 text-lg">Please login to view your order history.</p>
          <Link to="/login" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Order History</h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-8 text-center bg-gray-100 rounded-lg">
          <p className="mb-4 text-lg">You haven't placed any orders yet.</p>
          <Link to="/shop" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="flex flex-col justify-between p-4 bg-gray-50 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link 
                    to={`/track?orderId=${order.id}`}
                    className="inline-flex px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-sm text-gray-600">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between pt-4 mt-4 font-semibold border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Link 
                    to={`/track?orderId=${order.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Track Order
                  </Link>
                  {order.status === 'delivered' && (
                    <button className="text-sm text-blue-600 hover:underline">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 