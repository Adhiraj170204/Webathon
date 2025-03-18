"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import apiService from "../../services/api";

const PopularProducts = () => {
  // हार्डकोडेड डेटा (बैकअप के रूप में)
  const initialProducts = [
    {
      id: 1,
      name: "Green Capsicum",
      price: 9.0,
      originalPrice: 20.99,
      image:
        "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 2,
      name: "Kingfisher",
      price: 14.99,
      originalPrice: 20.99,
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 3,
      name: "Chinese cabbage",
      price: 12.0,
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: false,
      rating: 5,
      isGreen: true,
    },
    {
      id: 4,
      name: "Green Apple",
      price: 14.99,
      originalPrice: 20.99,
      image:
        "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 5,
      name: "Eggplant",
      price: 34.0,
      image:
        "https://images.unsplash.com/photo-1635036739487-15b4f3a6ef9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: false,
      rating: 5,
    },
    {
      id: 6,
      name: "Green Apple",
      price: 14.99,
      originalPrice: 20.99,
      image:
        "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 7,
      name: "Green Capsicum",
      price: 9.0,
      originalPrice: 20.99,
      image:
        "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 8,
      name: "Eggplant",
      price: 34.0,
      image:
        "https://images.unsplash.com/photo-1635036739487-15b4f3a6ef9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: false,
      rating: 5,
    },
    {
      id: 9,
      name: "Green Capsicum",
      price: 9.0,
      originalPrice: 20.99,
      image:
        "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 10,
      name: "Green Chili",
      price: 34.0,
      image:
        "https://images.unsplash.com/photo-1621178311482-147a1dac9848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isSale: false,
      rating: 5,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API से प्रोडक्ट्स फेच करें
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await apiService.products.getPopular();
        
        if (data && data.length > 0) {
          // यदि API से डेटा मिल जाता है, तो उसका उपयोग करें
          setProducts(data);
        }
        // यदि API से कोई डेटा नहीं मिलता, तो हम पहले से सेट किए गए डेफ़ॉल्ट डेटा का उपयोग करेंगे
        
        setLoading(false);
      } catch (err) {
        console.error("पॉपुलर प्रोडक्ट्स फेच करने में त्रुटि:", err);
        setError("प्रोडक्ट्स लोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
        setLoading(false);
        // त्रुटि के मामले में, हम हार्डकोडेड डेटा दिखाते रहेंगे
      }
    }

    fetchProducts();
  }, []);

  const handleMouseEnter = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isHighlighted: true } : product
      )
    );
  };

  const handleMouseLeave = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isHighlighted: false } : product
      )
    );
  };

  // यदि लोडिंग हो रही है
  if (loading && products.length === initialProducts.length) {
    return (
      <section className="flex justify-between items-center px-4 py-12 w-full">
        <div className="mx-14 w-full text-center">
          <p>प्रोडक्ट्स लोड हो रहे हैं...</p>
        </div>
      </section>
    );
  }

  // यदि त्रुटि है
  if (error && products.length === initialProducts.length) {
    return (
      <section className="flex justify-between items-center px-4 py-12 w-full">
        <div className="mx-14 w-full text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-between items-center px-4 py-12 w-full">
      <div className="mx-14 w-full">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900">
            Popular Products
          </h2>
          <button className="flex gap-3 items-center text-base font-medium text-green-600 cursor-pointer max-sm:hidden">
            <svg
              width="91"
              height="24"
              viewBox="0 0 91 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[91px] h-[24px]"
            >
              <text
                fill="#00B307"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Poppins"
                fontSize="16"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="0" y="17.6">
                  View All
                </tspan>
              </text>
              <path
                d="M90 12.0005H75"
                stroke="#00B307"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M83.95 5.97552L90 11.9995L83.95 18.0245"
                stroke="#00B307"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </header>

        <div className="grid grid-cols-5 gap-6 mb-6 max-md:grid-cols-3 max-sm:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                isSale={product.isSale}
                salePercentage={product.salePercentage}
                rating={product.rating}
                isGreen={product.isGreen}
                isHighlighted={product.isHighlighted}
                showWishlist={product.id === 3}
                showQuickView={product.id === 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;