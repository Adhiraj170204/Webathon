import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout, cart } = useAppContext();
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            IITMART
          </Link>
          
          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-grow max-w-md mx-6">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-blue-600">
              Shop
            </Link>
            {user ? (
              <>
                {user.role === 'student' && (
                  <>
                    <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">
                      Wishlist
                    </Link>
                    <Link to="/order-history" className="text-gray-700 hover:text-blue-600">
                      Orders
                    </Link>
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                      Cart
                      {cart.length > 0 && (
                        <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-xs text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                          {cart.length}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                {user.role === 'seller' && (
                  <>
                    <Link to="/seller/dashboard" className="text-gray-700 hover:text-blue-600">
                      Dashboard
                    </Link>
                    <Link to="/seller/products" className="text-gray-700 hover:text-blue-600">
                      Products
                    </Link>
                    <Link to="/seller/orders" className="text-gray-700 hover:text-blue-600">
                      Orders
                    </Link>
                  </>
                )}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600">
                    {user.name}
                  </button>
                  <div className="absolute right-0 z-10 hidden pt-2 group-hover:block">
                    <div className="w-48 py-2 bg-white border rounded-md shadow-lg">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile search bar */}
        <form onSubmit={handleSearch} className="flex items-center mt-4 md:hidden">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/shop" className="py-2 text-gray-700 hover:text-blue-600">
                Shop
              </Link>
              {user ? (
                <>
                  {user.role === 'student' && (
                    <>
                      <Link to="/wishlist" className="py-2 text-gray-700 hover:text-blue-600">
                        Wishlist
                      </Link>
                      <Link to="/order-history" className="py-2 text-gray-700 hover:text-blue-600">
                        Orders
                      </Link>
                      <Link to="/cart" className="py-2 text-gray-700 hover:text-blue-600">
                        Cart ({cart.length})
                      </Link>
                    </>
                  )}
                  {user.role === 'seller' && (
                    <>
                      <Link to="/seller/dashboard" className="py-2 text-gray-700 hover:text-blue-600">
                        Dashboard
                      </Link>
                      <Link to="/seller/products" className="py-2 text-gray-700 hover:text-blue-600">
                        Products
                      </Link>
                      <Link to="/seller/orders" className="py-2 text-gray-700 hover:text-blue-600">
                        Orders
                      </Link>
                    </>
                  )}
                  <Link to="/profile" className="py-2 text-gray-700 hover:text-blue-600">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="py-2 text-left text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-2 text-gray-700 hover:text-blue-600">
                    Login
                  </Link>
                  <Link to="/register" className="py-2 text-gray-700 hover:text-blue-600">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 