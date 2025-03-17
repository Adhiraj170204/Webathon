"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  // Sample product data
  const initialProducts = [
    {
      id: 1,
      name: "Green Capsicum",
      price: 9.0,
      originalPrice: 20.99,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b7d481c45c9a3459f1a644dd5e5fa5db30aa7e9a",
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
        "https://cdn.builder.io/api/v1/image/assets/TEMP/fbe29ef78d632487fc4a57645cb38f813d3df86c",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 3,
      name: "Chinese cabbage",
      price: 12.0,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8ef80d9e5604cf22cd0fbc78eae89d605c27d11b",
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
        "https://cdn.builder.io/api/v1/image/assets/TEMP/833cc7d7a7c2c3c4bfa638646e78d012154137a6",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 5,
      name: "Eggplant",
      price: 34.0,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb5a24e384523a77e41460050863feb5d5f46c53",
      isSale: false,
      rating: 5,
    },
    {
      id: 6,
      name: "Green Apple",
      price: 14.99,
      originalPrice: 20.99,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/833cc7d7a7c2c3c4bfa638646e78d012154137a6",
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
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b7d481c45c9a3459f1a644dd5e5fa5db30aa7e9a",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 8,
      name: "Eggplant",
      price: 34.0,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb5a24e384523a77e41460050863feb5d5f46c53",
      isSale: false,
      rating: 5,
    },
    {
      id: 9,
      name: "Green Capsicum",
      price: 9.0,
      originalPrice: 20.99,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b7d481c45c9a3459f1a644dd5e5fa5db30aa7e9a",
      isSale: true,
      salePercentage: 50,
      rating: 5,
    },
    {
      id: 10,
      name: "Green Chili",
      price: 34.0,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2cfc9119a003df4d3c8edf0590877a1c7920249f",
      isSale: false,
      rating: 5,
    },
  ];

  const [products, setProducts] = useState(initialProducts);

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