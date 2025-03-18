import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart, user } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might want to fetch the wishlist here
    // For now, just set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (!user || user.role !== 'student') {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="mb-6 text-3xl font-bold">Wishlist</h1>
        <div className="p-8 mb-8 bg-gray-100 rounded-lg">
          <p className="mb-4 text-lg">Please login as a student to view your wishlist.</p>
          <Link to="/login" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="p-8 text-center bg-gray-100 rounded-lg">
          <p className="mb-4 text-lg">Your wishlist is empty.</p>
          <Link to="/shop" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map(product => (
            <div key={product._id} className="overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
              <Link to={`/product/${product._id}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="mb-1 text-lg font-semibold hover:text-blue-600">{product.name}</h3>
                </Link>
                
                {product.seller && (
                  <div className="mb-2 text-sm text-gray-600">{product.seller.storeName}</div>
                )}
                
                <div className="mb-3">
                  {product.discountedPrice ? (
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-green-600">₹{product.discountedPrice}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 