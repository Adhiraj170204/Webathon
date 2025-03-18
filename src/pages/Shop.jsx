import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import axios from 'axios';

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const { categories, addToCart, addToWishlist, isInWishlist, user, API_URL, cart } = useAppContext();
  const { showSuccess } = useNotification();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [sortOption, setSortOption] = useState('latest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchTerm, setSearchTerm] = useState(searchParam || '');
  
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOption, priceRange, searchTerm]);
  
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [categoryParam, searchParam]);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Get products from localStorage that were set up by MockDataSetup
      let mockProducts = [];
      
      // Try to get the products from localStorage first
      const savedProducts = localStorage.getItem('mockProducts');
      if (savedProducts) {
        try {
          mockProducts = JSON.parse(savedProducts);
          console.log('Loaded products from localStorage:', mockProducts);
        } catch (error) {
          console.error('Error parsing saved products:', error);
          // Fallback to generated products if there's an error
          mockProducts = generateMockProducts();
        }
      } else {
        // Fallback to generated products if not in localStorage
        console.log('No products found in localStorage, using generated products');
        mockProducts = generateMockProducts();
      }
      
      // Filter and sort the products
      let filteredProducts = mockProducts;
      
      // Filter by category
      if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(
          product => product.category === selectedCategory
        );
      }
      
      // Filter by search term
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          product => product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by price range
      filteredProducts = filteredProducts.filter(
        product => {
          const price = product.discountedPrice || product.price;
          return price >= priceRange.min && price <= priceRange.max;
        }
      );
      
      // Sort products
      if (sortOption === 'priceAsc') {
        filteredProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
      } else if (sortOption === 'priceDesc') {
        filteredProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
      } else if (sortOption === 'latest') {
        // Assuming the products are already sorted by date in the mock data
        // No additional sorting needed
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: parseInt(value) });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };
  
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      sellerId: product.sellerId,
      quantity: 1
    });
    showSuccess(`${product.name} added to cart!`);
  };
  
  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    showSuccess(`${product.name} added to wishlist!`);
  };
  
  // Function to check if product is already in cart
  const isInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };
  
  // Generate mock products for demo purposes
  const generateMockProducts = () => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Maggi Noodles',
        price: 49,
        discountedPrice: 42,
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Snacks',
        description: 'Instant noodles with masala flavor',
        stock: 50,
        seller: { storeName: 'Campus Store' },
        rating: 4.5
      },
      {
        _id: '2',
        name: 'Coca-Cola (500ml)',
        price: 40,
        discountedPrice: null,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Beverages',
        description: 'Refreshing carbonated drink',
        stock: 30,
        seller: { storeName: 'Campus Store' },
        rating: 4.0
      },
      {
        _id: '3',
        name: 'Lays Chips',
        price: 30,
        discountedPrice: 25,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Snacks',
        description: 'Crispy potato chips with classic salt flavor',
        stock: 45,
        seller: { storeName: 'Quick Mart' },
        rating: 4.2
      },
      {
        _id: '4',
        name: 'Dove Soap',
        price: 60,
        discountedPrice: null,
        image: 'https://images.unsplash.com/photo-1600857544200-b2f468e9a2bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Personal Care',
        description: 'Moisturizing beauty bar for soft skin',
        stock: 20,
        seller: { storeName: 'Quick Mart' },
        rating: 4.7
      },
      {
        _id: '5',
        name: 'Dairy Milk Chocolate',
        price: 35,
        discountedPrice: 30,
        image: 'https://images.unsplash.com/photo-1623340561446-0a4dd1a64ba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Snacks',
        description: 'Creamy milk chocolate',
        stock: 60,
        seller: { storeName: 'Campus Store' },
        rating: 4.8
      },
      {
        _id: '6',
        name: 'Colgate Toothpaste',
        price: 85,
        discountedPrice: 75,
        image: 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Personal Care',
        description: 'Strong mint toothpaste for cavity protection',
        stock: 40,
        seller: { storeName: 'Health Hub' },
        rating: 4.3
      },
      {
        _id: '7',
        name: 'Red Bull Energy Drink',
        price: 110,
        discountedPrice: null,
        image: 'https://images.unsplash.com/photo-1613476830879-0de3b7675f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Beverages',
        description: 'Energy drink for busy study sessions',
        stock: 25,
        seller: { storeName: 'Campus Store' },
        rating: 4.1
      },
      {
        _id: '8',
        name: 'Notebook (100 pages)',
        price: 45,
        discountedPrice: 40,
        image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Stationery',
        description: 'Ruled notebook for class notes',
        stock: 100,
        seller: { storeName: 'Campus Store' },
        rating: 4.0
      },
      {
        _id: '9',
        name: 'Hand Sanitizer',
        price: 55,
        discountedPrice: null,
        image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Essentials',
        description: 'Kills 99.9% germs without water',
        stock: 70,
        seller: { storeName: 'Health Hub' },
        rating: 4.6
      },
      {
        _id: '10',
        name: 'Amul Butter',
        price: 50,
        discountedPrice: null,
        image: 'https://images.unsplash.com/photo-1589985270958-bf087eaabeab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Dairy',
        description: 'Creamy butter for bread and toast',
        stock: 30,
        seller: { storeName: 'Fresh Farm' },
        rating: 4.4
      },
      {
        _id: '11',
        name: 'Nescafe Coffee',
        price: 120,
        discountedPrice: 110,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Beverages',
        description: 'Instant coffee for quick energy boost',
        stock: 40,
        seller: { storeName: 'Campus Store' },
        rating: 4.3
      },
      {
        _id: '12',
        name: 'Bananas (6 pcs)',
        price: 30,
        discountedPrice: null,
        image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        category: 'Fresh',
        description: 'Fresh bananas from local farms',
        stock: 25,
        seller: { storeName: 'Fresh Farm' },
        rating: 4.2
      }
    ];
    
    return mockProducts;
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Shop</h1>
      
      {/* Search bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Filters */}
        <div className="w-full mb-8 lg:w-1/4 lg:pr-8">
          <div className="p-4 border border-gray-200 rounded-md">
            <h2 className="mb-4 text-lg font-semibold">Categories</h2>
            <div className="mb-2">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`mb-2 w-full text-left py-1 px-2 rounded ${
                  selectedCategory === 'All' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                All Categories
              </button>
            </div>
            {categories.map((category, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`mb-2 w-full text-left py-1 px-2 rounded ${
                    selectedCategory === category ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
          
          <div className="p-4 mt-4 border border-gray-200 rounded-md">
            <h2 className="mb-4 text-lg font-semibold">Price Range</h2>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="number"
                name="min"
                min="0"
                max={priceRange.max}
                value={priceRange.min}
                onChange={handlePriceRangeChange}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              />
              <span>to</span>
              <input
                type="number"
                name="max"
                min={priceRange.min}
                value={priceRange.max}
                onChange={handlePriceRangeChange}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Sort options */}
          <div className="flex justify-between mb-6">
            <div>
              <span className="mr-2 text-gray-600">Showing {products.length} results</span>
            </div>
            <div>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">Latest</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
          ) : products.length === 0 ? (
            <div className="p-4 text-center text-gray-700 border border-gray-200 rounded-md">
              No products found matching your criteria. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(product => (
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
                    <div className="mb-2 text-sm text-gray-600">
                      {product.storeName || product.sellerName || (product.seller && product.seller.storeName) || 'Unknown Store'}
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <div className="mb-3">
                      {product.discountedPrice ? (
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-green-600">₹{product.discountedPrice}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
                          <span className="ml-2 text-sm text-green-600">
                            {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% off
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isInCart(product._id)}
                        className={`flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                          isInCart(product._id) ? 'cursor-not-allowed' : ''
                        }`}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className={`p-2 rounded-md ${
                          isInWishlist(product._id)
                            ? 'text-red-600 bg-red-100 hover:bg-red-200'
                            : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <FiHeart
                          className={`w-5 h-5 ${
                            isInWishlist(product._id) ? 'text-red-600' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop; 