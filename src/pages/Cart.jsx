import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart, calculateCartTotal } = useAppContext();
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [discount, setDiscount] = useState(0);
  
  const handleQuantityChange = (productId, quantity) => {
    updateCartItemQuantity(productId, Number(quantity));
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleApplyPromo = (e) => {
    e.preventDefault();
    
    // Mock promo code for demo
    if (promoCode.toUpperCase() === 'WELCOME20') {
      setDiscount(calculateCartTotal() * 0.2);
      setPromoMessage({ type: 'success', text: 'Promo code applied: 20% off' });
    } else {
      setDiscount(0);
      setPromoMessage({ type: 'error', text: 'Invalid promo code' });
    }
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const subtotal = calculateCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal + deliveryFee - discount;
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="p-8 text-center bg-gray-100 rounded-lg">
          <p className="mb-4 text-lg">Your cart is empty.</p>
          <Link to="/shop" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="mb-4 overflow-hidden border border-gray-200 rounded-lg">
              {cart.map((item) => (
                <div key={item.product._id} className="flex flex-col p-4 border-b sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="object-cover w-full h-24 rounded sm:w-24"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <Link to={`/product/${item.product._id}`} className="mb-1 text-lg font-semibold hover:text-blue-600">
                      {item.product.name}
                    </Link>
                    
                    {/* Store name display */}
                    <div className="mb-2 text-sm text-gray-600">
                      Store: {item.product.storeName || (item.product.seller && item.product.seller.storeName) || 'Unknown Store'}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap items-center justify-between mt-2">
                        <div className="mb-2 sm:mb-0">
                          <label htmlFor={`quantity-${item.product._id}`} className="mr-2 text-sm text-gray-600">
                            Quantity:
                          </label>
                          <select
                            id={`quantity-${item.product._id}`}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded"
                          >
                            {[...Array(10).keys()].map(num => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="mr-4">
                            {item.product.discountedPrice ? (
                              <div>
                                <span className="text-lg font-bold text-green-600">₹{item.product.discountedPrice}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">₹{item.product.price}</span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-green-600">₹{item.product.price}</span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.product._id)}
                            className="p-1 text-gray-500 hover:text-red-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Link to="/shop" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                Continue Shopping
              </Link>
              <button
                onClick={() => clearCart()}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Items ({getTotalItems()}):</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 mt-2 text-lg font-bold border-t border-gray-200">
                  <span>Total:</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Promo Code */}
              <form onSubmit={handleApplyPromo} className="mb-4">
                <label htmlFor="promoCode" className="block mb-2 text-sm font-medium text-gray-700">
                  Promo Code (Try "WELCOME20")
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter code"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`mt-2 text-sm ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>
              
              <div className="mb-4 text-sm text-gray-600">
                <p>Free delivery on orders above ₹500</p>
              </div>
              
              <Link
                to="/billing"
                className="block w-full px-4 py-2 text-center text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 