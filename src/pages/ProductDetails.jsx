import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import { FiMinus, FiPlus, FiShoppingCart, FiHeart } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist, cart, isInWishlist } = useAppContext();
  const { showSuccess } = useNotification();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        // Try to get products from our mock data
        const allProducts = window.getAllProducts();
        if (allProducts && allProducts.length > 0) {
          const foundProduct = allProducts.find(p => p._id === id);
          if (foundProduct) {
            setProduct(foundProduct);
            const existingItem = cart.find(item => item._id === id);
            if (existingItem) {
              setProductInCart(true);
              setQuantity(existingItem.quantity);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, cart]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity
      });
      setProductInCart(true);
      showSuccess(`${product.name} added to cart!`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      showSuccess(`${product.name} added to wishlist!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-cover object-center"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            <div className="mb-4">
              {product.discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">₹{product.discountedPrice}</span>
                  <span className="text-lg text-gray-500 line-through ml-3">₹{product.price}</span>
                  <span className="ml-3 bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% off
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Store:</span> {product.storeName || (product.seller && product.seller.storeName) || 'Unknown Store'}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">In Stock:</span> {product.stock} units
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-semibold">Quantity:</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || productInCart}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <FiMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  disabled={productInCart}
                  className="w-16 p-2 text-center border-t border-b border-gray-300 focus:outline-none disabled:opacity-50"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock || productInCart}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={productInCart}
                className={`flex items-center justify-center px-6 py-3 rounded-md text-white ${
                  productInCart ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors flex-1`}
              >
                <FiShoppingCart className="mr-2" />
                {productInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className={`flex items-center justify-center px-6 py-3 rounded-md ${
                  isInWishlist(product._id) ?
                  'bg-red-100 text-red-600 border border-red-300' :
                  'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                } transition-colors`}
              >
                <FiHeart className={isInWishlist(product._id) ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 