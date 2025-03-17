"use client";
import React from "react";
import HotDealsCard from "./HotDealsCard";

const HotDeals = () => {
  // Product data for each section
  const hotDealsProducts = [
    {
      image: "https://placehold.co/112x112/90EE90/90EE90",
      altText: "Green Apple",
      name: "Green Apple",
      price: "$14.99",
      rating: 4,
    },
    {
      image: "https://placehold.co/112x112/FFA500/FFA500",
      altText: "Indian Malta",
      name: "Indian Malta",
      price: "$14.99",
      rating: 4,
      specialStyle: true,
      specialTextColor: "text-green-800",
    },
    {
      image: "https://placehold.co/112x112/90EE90/90EE90",
      altText: "Green Lettuce",
      name: "Green Lettuce",
      price: "$14.99",
      rating: 4,
    },
  ];

  const bestSellerProducts = [
    {
      image: "https://placehold.co/112x112/4B0082/4B0082",
      altText: "Eggplant",
      name: "Eggplant",
      price: "$14.99",
      rating: 4,
    },
    {
      image: "https://placehold.co/112x112/228B22/228B22",
      altText: "Red Capsicum",
      name: "Red Capsicum",
      price: "$14.99",
      originalPrice: "$20.99",
      rating: 4,
    },
    {
      image: "https://placehold.co/112x112/FF6347/FF6347",
      altText: "Red Tomatos",
      name: "Red Tomatos",
      price: "$14.99",
      rating: 4,
    },
  ];

  const topRatedProducts = [
    {
      image: "https://placehold.co/112x112/CD853F/CD853F",
      altText: "Big Potatos",
      name: "Big Potatos",
      price: "$14.99",
      rating: 4,
    },
    {
      image: "https://placehold.co/112x112/FFD700/FFD700",
      altText: "Corn",
      name: "Corn",
      price: "$14.99",
      originalPrice: "$20.99",
      rating: 4,
    },
    {
      image: "https://placehold.co/112x112/F0F8FF/F0F8FF",
      altText: "Fresh cauliflower",
      name: "Fresh cauliflower",
      price: "$14.99",
      rating: 4,
    },
  ];

  return (
    <main className="px-18 mx-auto my-5 ">
      <h1 className="mb-10 text-3xl font-semibold text-center text-zinc-900">
      </h1>
      <section className=" py-4 rounded-lg  max-md:p-4">
        <div className="flex gap-12 p-2 w-full max-md:flex-col max-md:items-center max-sm:p-4">
          {/* Hot Deals Column */}
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-2xl font-medium leading-9 text-zinc-900">
              Hot Deals
            </h2>
            {hotDealsProducts.map((product, index) => (
              <HotDealsCard
                key={`hot-deal-${index}`}
                image={product.image}
                altText={product.altText}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                specialStyle={product.specialStyle}
                specialTextColor={product.specialTextColor}
              />
            ))}
          </div>

          {/* Best Seller Column */}
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-2xl font-medium leading-9 text-zinc-900">
              Best Seller
            </h2>
            {bestSellerProducts.map((product, index) => (
              <HotDealsCard
                key={`best-seller-${index}`}
                image={product.image}
                altText={product.altText}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
              />
            ))}
          </div>

          {/* Top Rated Column */}
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-2xl font-medium leading-9 text-zinc-900">
              Top Rated
            </h2>
            {topRatedProducts.map((product, index) => (
              <HotDealsCard
                key={`top-rated-${index}`}
                image={product.image}
                altText={product.altText}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-yellow-600 text-white p-6 rounded-md w-[300px]">
            <h2 className="text-2xl font-bold mb-2">HOT SALE</h2>
            <p className="text-lg mb-4">Save 37% on</p>
            <p className="text-lg mb-6">Every Order</p>
            <button className="bg-white text-red-600 hover:text-green-500 font-bold py-2 px-4 rounded-full">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HotDeals;