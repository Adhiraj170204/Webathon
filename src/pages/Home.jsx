import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: 'Maggi Noodles',
      price: 49,
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3',
      category: 'Snacks'
    },
    {
      id: 2,
      name: 'Coca-Cola (500ml)',
      price: 40,
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3',
      category: 'Beverages'
    },
    {
      id: 3,
      name: 'Lays Chips',
      price: 30,
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3',
      category: 'Snacks'
    },
    {
      id: 4,
      name: 'Dove Soap',
      price: 60,
      image: 'https://images.unsplash.com/photo-1600857544200-b2f468e9a2bb?ixlib=rb-4.0.3',
      category: 'Personal Care'
    }
  ]);

  // Categories with images
  const categories = [
    { name: 'Snacks', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3' },
    { name: 'Beverages', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3' },
    { name: 'Fresh', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3' },
    { name: 'Personal Care', image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3' },
    { name: 'Essentials', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3' },
    { name: 'Stationery', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3')" }}
        ></div>
        <div className="container relative z-10 px-4 py-32 mx-auto text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
            IITMART - Campus Delivery
          </h1>
          <p className="mb-8 text-lg sm:text-xl">
            Instant delivery to your hostel room, without any hassle.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link 
              to="/shop" 
              className="px-8 py-3 text-lg font-medium bg-green-600 rounded-md hover:bg-green-700"
            >
              Shop Now
            </Link>
            <Link 
              to="/allCategories" 
              className="px-8 py-3 text-lg font-medium bg-white text-gray-900 rounded-md hover:bg-gray-100"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Featured Products</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="transition-transform duration-300 hover:scale-105">
                <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="mt-2 text-xl font-bold text-green-600">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link 
              to="/shop" 
              className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              See More
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <Link to={`/shop?category=${category.name}`} key={index} className="transition-transform duration-300 hover:scale-105">
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg">
                  <div className="h-36 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-3 text-center bg-white">
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center space-y-6 text-center lg:flex-row lg:space-y-0 lg:space-x-8 lg:text-left">
            <div className="lg:w-2/3">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Download the app today!</h2>
              <p className="text-lg">
                Order and track instantly. Get 20% off on your first order.
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 lg:w-1/3">
              <button className="flex items-center justify-center px-6 py-3 space-x-2 font-medium bg-black rounded-md hover:bg-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.28 9.36c-.46-.24-4.37-2.49-4.76-2.71-.39-.23-.83-.23-1.34-.23-.51 0-.93 0-1.33.22-.38.21-4.43 2.33-4.92 2.58S4 10.51 4 11.69v.45c0 1.18.15 1.29.67 1.53s4.53 2.35 4.92 2.57c.4.21.82.21 1.33.21.51 0 .95-.01 1.34-.23.42-.24 4.26-2.45 4.74-2.7s.69-.34.69-1.52v-.45c0-1.19-.2-1.35-.73-1.59z"></path><path d="M12.07 14c-.46 0-.92-.11-1.34-.34-.42-.22-4.53-2.38-4.53-2.38C5.65 10.89 5 10.62 5 9.34v-.68c0-1.29.67-1.55 1.2-1.94 0 0 4.11-2.16 4.53-2.38s.88-.34 1.34-.34c.46 0 .93.11 1.34.34.42.22 4.53 2.38 4.53 2.38.55.29 1.19.6 1.2 1.88v.68c0 1.29-.67 1.55-1.2 1.94 0 0-4.11 2.16-4.53 2.38s-.88.34-1.34.34z"></path>
                </svg>
                <span>Google Play</span>
              </button>
              <button className="flex items-center justify-center px-6 py-3 space-x-2 font-medium bg-black rounded-md hover:bg-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.06 11.57c0 1.96-1.3 3.52-3.13 3.89v-7.8c1.83.38 3.13 1.93 3.13 3.91zM13.93 7.94v8.2c-1.93-.39-3.38-2.1-3.38-4.2v-.01c0-2.09 1.45-3.8 3.38-3.99zM11.54 7.6v8.8c-.62-.05-1.21-.26-1.71-.6-.52-.35-.97-.85-1.27-1.44-.3-.58-.46-1.24-.46-1.96 0-1.69.9-3.2 2.32-4.05.36-.19.74-.31 1.12-.34v-.41c0-.28.22-.51.5-.51s.5.23.5.51v0zM10.07 8.12c-1.12.64-1.97 1.82-1.97 3.28 0 1.21.59 2.28 1.51 2.95.16.12.31.21.46.29V8.12zM17.56 11.6c0-2.07-1.12-3.88-2.77-4.89-.16-.1-.33-.19-.5-.27v10.31c.17-.08.34-.16.5-.27 1.66-1 2.77-2.81 2.77-4.88z"></path>
                </svg>
                <span>App Store</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 