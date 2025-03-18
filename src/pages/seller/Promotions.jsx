import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const SellerPromotions = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  useEffect(() => {
    // Check if user is logged in and is a seller
    if (!user || user.role !== 'seller') {
      navigate('/seller/login');
      return;
    }
    
    // Fetch promotions
    // This is mocked for now - would be an API call in a real app
    setTimeout(() => {
      setPromotions([
        {
          id: 'promo1',
          name: 'Welcome Discount',
          code: 'WELCOME20',
          discountType: 'percentage',
          discountValue: 20,
          minPurchase: 100,
          status: 'active',
          startDate: '2023-03-01T00:00:00Z',
          endDate: '2023-04-30T23:59:59Z',
          usageCount: 45,
          description: 'Get 20% off on your first order'
        },
        {
          id: 'promo2',
          name: 'Free Delivery',
          code: 'FREEDEL',
          discountType: 'fixed',
          discountValue: 40,
          minPurchase: 200,
          status: 'active',
          startDate: '2023-03-15T00:00:00Z',
          endDate: '2023-03-31T23:59:59Z',
          usageCount: 28,
          description: 'Free delivery on orders above ₹200'
        },
        {
          id: 'promo3',
          name: 'Diwali Special',
          code: 'DIWALI10',
          discountType: 'percentage',
          discountValue: 10,
          minPurchase: 0,
          status: 'inactive',
          startDate: '2022-10-15T00:00:00Z',
          endDate: '2022-10-30T23:59:59Z',
          usageCount: 156,
          description: 'Get 10% off on all orders during Diwali'
        }
      ]);
      
      setLoading(false);
    }, 800);
  }, [user, navigate]);
  
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minPurchase: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format dates
    const formattedStartDate = new Date(formData.startDate).toISOString();
    const formattedEndDate = new Date(formData.endDate).toISOString();
    
    // Create new promotion
    const newPromotion = {
      id: 'promo' + (promotions.length + 1),
      name: formData.name,
      code: formData.code.toUpperCase(),
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue),
      minPurchase: parseFloat(formData.minPurchase) || 0,
      status: 'active',
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      usageCount: 0,
      description: formData.description
    };
    
    setPromotions([...promotions, newPromotion]);
    handleCloseAddModal();
  };
  
  const handleToggleStatus = (promoId) => {
    const updatedPromotions = promotions.map(promo => {
      if (promo.id === promoId) {
        return {
          ...promo,
          status: promo.status === 'active' ? 'inactive' : 'active'
        };
      }
      return promo;
    });
    
    setPromotions(updatedPromotions);
  };
  
  const handleDeletePromotion = (promoId) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      setPromotions(promotions.filter(promo => promo.id !== promoId));
    }
  };
  
  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };
  
  const isPromotionExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Promotions</h1>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Create Promotion
        </button>
      </div>
      
      {/* Promotions list */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Min Purchase</th>
                <th className="px-4 py-3">Validity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No promotions found. Create your first promotion.
                  </td>
                </tr>
              ) : (
                promotions.map(promo => (
                  <tr key={promo.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{promo.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-mono font-medium bg-gray-100 rounded">
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {promo.discountType === 'percentage' ? 
                        `${promo.discountValue}%` : 
                        `₹${promo.discountValue}`
                      }
                    </td>
                    <td className="px-4 py-3">
                      {promo.minPurchase > 0 ? `₹${promo.minPurchase}` : 'None'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p>From: {new Date(promo.startDate).toLocaleDateString()}</p>
                        <p>To: {new Date(promo.endDate).toLocaleDateString()}</p>
                        {isPromotionExpired(promo.endDate) && (
                          <span className="text-xs text-red-600">Expired</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(promo.status)}`}>
                        {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(promo.id)}
                          className={promo.status === 'active' ? 'text-red-600 hover:underline' : 'text-green-600 hover:underline'}
                        >
                          {promo.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeletePromotion(promo.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Promotion Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create Promotion</h2>
              <button
                onClick={handleCloseAddModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                  Promotion Name
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
              
              <div className="mb-4">
                <label htmlFor="code" className="block mb-1 text-sm font-medium text-gray-700">
                  Promotion Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. SUMMER20"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Customers will use this code at checkout. No spaces allowed.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="discountType" className="block mb-1 text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <select
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="discountValue" className="block mb-1 text-sm font-medium text-gray-700">
                    Discount Value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="discountValue"
                      name="discountValue"
                      value={formData.discountValue}
                      onChange={handleChange}
                      min="0"
                      step={formData.discountType === 'percentage' ? '1' : '0.01'}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {formData.discountType === 'percentage' ? '%' : '₹'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="minPurchase" className="block mb-1 text-sm font-medium text-gray-700">
                  Minimum Purchase Amount (₹)
                </label>
                <input
                  type="number"
                  id="minPurchase"
                  name="minPurchase"
                  value={formData.minPurchase}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty or 0 for no minimum purchase requirement.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="startDate" className="block mb-1 text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block mb-1 text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPromotions; 