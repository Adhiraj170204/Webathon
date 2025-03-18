import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hostel: '',
    roomNumber: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fill form with user data
    if (user.role === 'student' && user.student) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.student.phone || '',
        hostel: user.student.hostel || '',
        roomNumber: user.student.roomNumber || ''
      });
    }
  }, [user, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call with setTimeout
    setTimeout(() => {
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      setIsEditing(false);
      setIsLoading(false);
      
      // In a real app, you would call an API to update the profile
      // and update the user context
    }, 1000);
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
        
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="flex items-center justify-center w-16 h-16 mr-4 text-2xl font-bold text-white bg-blue-600 rounded-full">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-blue-600">{user.role === 'student' ? 'Student' : 'Seller'}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {user.role === 'student' && user.student && (
              <div className="mt-8">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          readOnly
                          className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="hostel" className="block mb-2 text-sm font-medium text-gray-700">
                          Hostel
                        </label>
                        <input
                          type="text"
                          id="hostel"
                          name="hostel"
                          value={formData.hostel}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="roomNumber" className="block mb-2 text-sm font-medium text-gray-700">
                          Room Number
                        </label>
                        <input
                          type="text"
                          id="roomNumber"
                          name="roomNumber"
                          value={formData.roomNumber}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="mt-4 space-y-2">
                        <p><span className="font-medium">Phone:</span> {user.student.phone}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Delivery Address</h3>
                      <div className="mt-4 space-y-2">
                        <p><span className="font-medium">Hostel:</span> {user.student.hostel}</p>
                        <p><span className="font-medium">Room Number:</span> {user.student.roomNumber}</p>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium">Loyalty Program</h3>
                      <div className="p-4 mt-4 bg-blue-50 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-700">
                              {user.student.loyaltyLevel && user.student.loyaltyLevel.charAt(0).toUpperCase() + user.student.loyaltyLevel.slice(1)} Level
                            </p>
                            <p className="text-sm text-blue-600">
                              {user.student.shoppingPoints || 0} points
                            </p>
                          </div>
                          <Link
                            to="/loyalty"
                            className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                          >
                            View Benefits
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {user.role === 'seller' && user.seller && (
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium">Store Information</h3>
                    <div className="mt-4 space-y-2">
                      <p><span className="font-medium">Store Name:</span> {user.seller.storeName}</p>
                      <p><span className="font-medium">Address:</span> {user.seller.storeAddress}</p>
                      <p><span className="font-medium">Phone:</span> {user.seller.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Operating Hours</h3>
                    <div className="mt-4 space-y-2">
                      <p><span className="font-medium">Opening Time:</span> {user.seller.openingTime}</p>
                      <p><span className="font-medium">Closing Time:</span> {user.seller.closingTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                  <Link
                    to="/seller/dashboard"
                    className="px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/seller/products"
                    className="px-4 py-2 text-center text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Manage Products
                  </Link>
                  <Link
                    to="/seller/orders"
                    className="px-4 py-2 text-center text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    View Orders
                  </Link>
                </div>
              </div>
            )}
            
            <div className="pt-6 mt-8 border-t border-gray-200">
              <h3 className="mb-4 text-lg font-medium">Account Settings</h3>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/change-password"
                  className="px-4 py-2 text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Change Password
                </Link>
                {user.role === 'student' && (
                  <Link
                    to="/order-history"
                    className="px-4 py-2 text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Order History
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-center text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 