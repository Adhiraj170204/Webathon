import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';

const BillingPage = () => {
  const { cart, clearCart, user } = useAppContext();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.hostel ? `${user.hostel}, Room ${user.roomNumber}` : '',
    city: 'College Campus',
    state: 'Maharashtra',
    zip: '400076',
    paymentMethod: 'cod'
  });
  
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate('/cart');
      return;
    }

    const cartWithDetails = cart.map(item => ({
      ...item,
      totalPrice: (item.discountedPrice || item.price) * item.quantity
    }));

    const calculatedSubtotal = cartWithDetails.reduce((sum, item) => sum + item.totalPrice, 0);
    const calculatedDeliveryFee = calculatedSubtotal > 500 ? 0 : 40;
    
    setCartItems(cartWithDetails);
    setSubtotal(calculatedSubtotal);
    setDeliveryFee(calculatedDeliveryFee);
    setTotal(calculatedSubtotal + calculatedDeliveryFee);
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      showError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Use our global mock order placement function
      if (window.placeOrder) {
        // Filter cart items to only include those from our test seller
        const sellerItems = cartItems.filter(item => 
          (item.product && item.product.sellerId === 'test-seller-1') || item.sellerId === 'test-seller-1'
        );
        
        if (sellerItems.length === 0) {
          showError('Your cart does not contain any items from Test Store');
          setLoading(false);
          return;
        }
        
        // Extract product information from cart items before placing order
        const productsForOrder = sellerItems.map(item => {
          // If the item has a product property, extract from there
          if (item.product) {
            return {
              ...item.product,
              quantity: item.quantity
            };
          }
          // Otherwise, assume the item is the product itself
          return item;
        });
        
        console.log('Products for order:', productsForOrder);
        
        // Place order with the seller's items
        const order = window.placeOrder(productsForOrder, user?.id || 'test-student-1', formData.name);
        
        // Clear cart only for the items that were ordered
        const remainingItems = cart.filter(item => item.sellerId !== 'test-seller-1');
        if (remainingItems.length === 0) {
          clearCart();
        } else {
          // This is a simplified approach - in a real app you'd want to update the cart
          // with only the remaining items
          showSuccess('Order placed for Test Store items only');
        }
        
        setTimeout(() => {
          navigate(`/track?orderId=${order._id}`);
          setLoading(false);
        }, 1500);
      } else {
        // Fallback for if the mock function isn't available
        showSuccess('Order placed successfully!');
        clearCart();
        setTimeout(() => {
          navigate('/');
          setLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      showError('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !loading) {
    return null; // Will redirect to cart
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Billing Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 mb-1">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 text-white font-semibold rounded-md ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item._id} className="py-3 flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{item.discountedPrice || item.price} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              
              {deliveryFee === 0 && (
                <div className="text-green-600 text-sm">
                  You've qualified for free delivery!
                </div>
              )}
              
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage; 