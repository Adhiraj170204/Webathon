"use client";
import React from "react";
import NewProductCard from "./NewProductCard";

// Sample product data
const products = [
  {
    id: 1,
    name: "Green Apple",
    price: "20.99",
    discountedPrice: "14.99",
    image:
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: 50,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 2,
    name: "Fresh Indian Malta",
    price: "20.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 3,
    name: "Chinese cabbage",
    price: "12.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    // hasQuickViewButton: true,
    isGreenCartButton: true,
  },
  {
    id: 4,
    name: "Green Lettuce",
    price: "9.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 5,
    name: "Eggplant",
    price: "34.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1635036739487-15b4f3a6ef9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 6,
    name: "Green Apple",
    price: "20.99",
    discountedPrice: "14.99",
    image:
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: 50,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 7,
    name: "Fresh Indian Malta",
    price: "20.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 8,
    name: "Chinese cabbage",
    price: "12.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: true,
  },
  {
    id: 9,
    name: "Green Lettuce",
    price: "9.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
  {
    id: 10,
    name: "Eggplant",
    price: "34.00",
    discountedPrice: null,
    image:
      "https://images.unsplash.com/photo-1635036739487-15b4f3a6ef9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    salePercentage: null,
    hasWishlistButton: true,
    hasQuickViewButton: false,
    isGreenCartButton: false,
  },
];

const NewProducts = () => {
  return (
    <section className="px-19 py-16 mx-auto max-w-none bg-neutral-100 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 max-sm:text-2xl">
          New Products
        </h2>
        <button className="flex gap-3 items-center text-base font-medium text-green-600 cursor-pointer max-sm:text-sm">
          <span>View All</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 91 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-icon"
          >
            <path
              d="M90 12.0005H75"
              stroke="#00B307"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M83.95 5.97559L90 11.9996L83.95 18.0246"
              stroke="#00B307"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </header>

      <div className="grid gap-6 grid-cols-[repeat(5,1fr)] max-md:grid-cols-[repeat(3,1fr)] max-sm:grid-cols-[repeat(2,1fr)]">
        {products.map((product) => (
          <NewProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discountedPrice={product.discountedPrice}
            rating={product.rating}
            salePercentage={product.salePercentage}
            hasWishlistButton={product.hasWishlistButton}
            hasQuickViewButton={product.hasQuickViewButton}
            isGreenCartButton={product.isGreenCartButton}
          />
        ))}
      </div>
    </section>
  );
};

export default NewProducts;
