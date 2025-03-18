import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AllCategories = () => {
  const { categories } = useAppContext();
  
  // Category images mapping
  const categoryImages = {
    'Snacks': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3',
    'Beverages': 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3',
    'Dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3',
    'Bread & Bakery': 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3',
    'Fruits & Vegetables': 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3',
    'Cleaning Supplies': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3',
    'Personal Care': 'https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3',
    'Essentials': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3',
    'Frozen Foods': 'https://images.unsplash.com/photo-1604152135912-04a022e73cda?ixlib=rb-4.0.3',
    'Ready to Eat': 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3',
    'Stationery': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3',
    'Fresh': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3',
  };
  
  // Default image if category image is not found
  const defaultImage = 'https://images.unsplash.com/photo-1604719312566-8912e9c8a47a?ixlib=rb-4.0.3';
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">All Categories</h1>
        <p className="text-gray-600">Browse our wide range of product categories</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link 
            to={`/shop?category=${category}`} 
            key={index}
            className="transition-transform duration-300 hover:scale-105"
          >
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={categoryImages[category] || defaultImage} 
                  alt={category}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4 text-center bg-white">
                <h3 className="text-lg font-semibold">{category}</h3>
                <p className="mt-2 text-sm text-gray-600">Explore Products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Featured Categories Banner */}
      <div className="p-8 mt-16 text-white bg-blue-600 rounded-lg">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">Hostel Essentials</h2>
            <p className="mb-6">Everything you need for comfortable hostel living, from snacks to toiletries.</p>
            <Link 
              to="/shop?category=Essentials" 
              className="px-6 py-3 text-blue-600 bg-white rounded-md hover:bg-gray-100"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3" 
              alt="Hostel Essentials" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories; 