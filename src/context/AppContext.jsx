import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const AppContext = createContext();

// API URL
const API_URL = 'http://localhost:5000/api';

// Context provider component
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [registeredAccounts, setRegisteredAccounts] = useState([]);
  const [categories, setCategories] = useState([
    'Snacks', 'Beverages', 'Dairy', 'Bread & Bakery', 'Fruits & Vegetables', 
    'Cleaning Supplies', 'Personal Care', 'Essentials', 'Frozen Foods', 'Ready to Eat'
  ]);
  
  // Setup axios with auth header
  const setupAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Check for saved registered accounts
  useEffect(() => {
    const savedAccounts = localStorage.getItem('registeredAccounts');
    
    if (savedAccounts) {
      try {
        const parsedAccounts = JSON.parse(savedAccounts);
        setRegisteredAccounts(parsedAccounts);
      } catch (error) {
        console.error('Error parsing saved accounts:', error);
      }
    }
  }, []);

  // Save registered accounts to localStorage
  const saveRegisteredAccounts = (accounts) => {
    try {
      localStorage.setItem('registeredAccounts', JSON.stringify(accounts));
    } catch (error) {
      console.error('Error saving registered accounts:', error);
    }
  };

  // Check for saved user on initial load
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setupAuthHeader(parsedUser.token);
        
        // Load cart and wishlist
        if (parsedUser.role === 'student') {
          loadCart();
          loadWishlist();
        }
      }
    };
    
    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // First check if this is a registered account (including test accounts)
      const accountEmail = email.toLowerCase();
      const registeredAccount = registeredAccounts.find(
        acc => acc.email.toLowerCase() === accountEmail && acc.password === password
      );
      
      if (registeredAccount) {
        console.log('Logging in with registered account:', registeredAccount.email);
        
        // For registered accounts, simulate a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create user data similar to what would come from API
        const userData = { ...registeredAccount };
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set auth header for future requests
        setupAuthHeader(userData.token);
        
        setLoading(false);
        return userData;
      }
      
      // For non-registered accounts, proceed with API call
      try {
        console.log('Attempting login with backend API for:', email);
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const userData = response.data;
        
        console.log('API login successful for:', email);
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set auth header for future requests
        setupAuthHeader(userData.token);
        
        // Load cart and wishlist for students
        if (userData.role === 'student') {
          loadCart();
          loadWishlist();
        }
        
        setLoading(false);
        return userData;
      } catch (apiError) {
        console.error('API login failed:', apiError);
        throw new Error('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setLoading(false);
      const message = err.message || 'Login failed. Please try again.';
      setError(message);
      throw new Error(message);
    }
  };

  // Register student function
  const registerStudent = async (studentData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if trying to register with an email that already exists
      const isExistingEmail = registeredAccounts.some(
        acc => acc.email.toLowerCase() === studentData.email.toLowerCase()
      );
      
      if (isExistingEmail) {
        throw new Error('This email is already registered. Please use a different email.');
      }
      
      try {
        // Try to register with the API first
        console.log('Attempting to register with backend API');
        const response = await axios.post(`${API_URL}/auth/register/student`, studentData);
        const userData = response.data;
        
        console.log('API registration successful');
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set auth header for future requests
        setupAuthHeader(userData.token);
        
        setLoading(false);
        return userData;
      } catch (apiError) {
        // If API call fails, create a mock account
        console.log('API registration failed, creating mock account instead');
        console.error('Registration API error:', apiError);
        
        // Generate a mock token
        const mockToken = 'mock-token-' + Math.random().toString(36).substring(2, 15);
        
        // Create mock user data
        const mockUserData = {
          id: 'mock-' + Date.now(),
          name: studentData.name,
          email: studentData.email,
          password: studentData.password, // Store password for mock login
          role: 'student',
          token: mockToken,
          collegeId: studentData.collegeId,
          phone: studentData.phone,
          hostel: studentData.hostel,
          roomNumber: studentData.roomNumber
        };
        
        // Add to registered accounts
        const updatedAccounts = [...registeredAccounts, mockUserData];
        setRegisteredAccounts(updatedAccounts);
        
        // Save to localStorage
        saveRegisteredAccounts(updatedAccounts);
        
        setLoading(false);
        return mockUserData;
      }
    } catch (err) {
      setLoading(false);
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
      throw new Error(message);
    }
  };

  // Register seller function
  const registerSeller = async (sellerData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if trying to register with an email that already exists
      const isExistingEmail = registeredAccounts.some(
        acc => acc.email.toLowerCase() === sellerData.email.toLowerCase()
      );
      
      if (isExistingEmail) {
        throw new Error('This email is already registered. Please use a different email.');
      }
      
      try {
        // Try to register with the API first
        console.log('Attempting to register seller with backend API');
        const response = await axios.post(`${API_URL}/auth/register/seller`, sellerData);
        const userData = response.data;
        
        console.log('API seller registration successful');
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set auth header for future requests
        setupAuthHeader(userData.token);
        
        setLoading(false);
        return userData;
      } catch (apiError) {
        // If API call fails, create a mock account
        console.log('API seller registration failed, creating mock account instead');
        console.error('Seller registration API error:', apiError);
        
        // Generate a mock token
        const mockToken = 'mock-token-' + Math.random().toString(36).substring(2, 15);
        
        // Create mock user data
        const mockUserData = {
          id: 'mock-' + Date.now(),
          name: sellerData.name,
          email: sellerData.email,
          password: sellerData.password, // Store password for mock login
          role: 'seller',
          token: mockToken,
          seller: {
            storeName: sellerData.seller.storeName,
            storeAddress: sellerData.seller.storeAddress,
            phone: sellerData.seller.phone,
            openingTime: sellerData.seller.openingTime,
            closingTime: sellerData.seller.closingTime
          }
        };
        
        // Add to registered accounts
        const updatedAccounts = [...registeredAccounts, mockUserData];
        setRegisteredAccounts(updatedAccounts);
        
        // Save to localStorage
        saveRegisteredAccounts(updatedAccounts);
        
        setLoading(false);
        return mockUserData;
      }
    } catch (err) {
      setLoading(false);
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
      throw new Error(message);
    }
  };

  // Logout function
  const logout = () => {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear cart and wishlist
    setCart([]);
    setWishlist([]);
    
    // Redirect to home
    window.location.href = '/';
  };

  // Load wishlist
  const loadWishlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/students/wishlist`);
      setWishlist(response.data);
    } catch (err) {
      console.error('Error loading wishlist:', err);
    }
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    if (!user || user.role !== 'student') {
      setError('Please login as a student to add to wishlist');
      return false;
    }
    
    try {
      await axios.post(`${API_URL}/students/wishlist`, { productId });
      
      // Reload wishlist
      await loadWishlist();
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add to wishlist');
      return false;
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!user || user.role !== 'student') {
      return false;
    }
    
    try {
      await axios.delete(`${API_URL}/students/wishlist/${productId}`);
      
      // Reload wishlist
      await loadWishlist();
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to remove from wishlist');
      return false;
    }
  };

  // Load cart from localStorage
  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  // Save cart to localStorage
  const saveCart = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCart(cartItems);
  };

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    // ज़रूरी: product में से प्रोडक्ट को अलग करें और शेष गुणों को अलग रखें
    const { quantity: productQuantity, ...productData } = product;
    
    // पहले चेक करें कि क्या आइटम पहले से कार्ट में है
    const existingItem = cart.find(item => item.product._id === productData._id);
    
    if (existingItem) {
      // Update quantity if already in cart
      const updatedCart = cart.map(item => 
        item.product._id === productData._id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      );
      saveCart(updatedCart);
    } else {
      // महत्वपूर्ण: यहां प्रोडक्ट की जानकारी के साथ sellerId भी शामिल करें
      saveCart([...cart, { 
        product: {
          ...productData,
          sellerId: productData.sellerId  // सुनिश्चित करें कि sellerId शामिल है
        }, 
        quantity 
      }]);
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.product._id === productId 
        ? { ...item, quantity } 
        : item
    );
    
    saveCart(updatedCart);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product._id !== productId);
    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    saveCart([]);
  };

  // Calculate cart total
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountedPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    cart,
    wishlist,
    categories,
    login,
    logout,
    registerStudent,
    registerSeller,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    calculateCartTotal,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    API_URL
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider; 