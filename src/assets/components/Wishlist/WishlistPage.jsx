"use client";
import React, { useState } from "react";
import WishlistItem from "./WishlistItem";
import SocialShare from "./SocialShare";
import Pagination from "./Pagination";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Green Capsicum",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/052b9167794abf9623098babd095c0abb8d7e1bb",
      price: 14.99,
      originalPrice: 20.99,
      inStock: true,
      inCart: false,
    },
    {
      id: 2,
      name: "Chinese Cabbage",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a8776f60e0afa0f60987e4a711b4b650fa9614c3",
      price: 45.0,
      originalPrice: null,
      inStock: true,
      inCart: false,
    },
    {
      id: 3,
      name: "Fresh Sujapuri Mango",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/dcc43474fe82d86168364a1b626b7280ff2138a8",
      price: 9.0,
      originalPrice: null,
      inStock: true,
      inCart: true, // Set inCart to true for item with id 3
    },
    {
      id: 4,
      name: "Fresh Sujapuri Mango",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/dcc43474fe82d86168364a1b626b7280ff2138a8",
      price: 9.0,
      originalPrice: null,
      inStock: false,
      inCart: false,
    },
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const handleToggleCart = (itemId) => {
    setWishlistItems(
      wishlistItems.map((item) =>
        item.id === itemId ? { ...item, inCart: !item.inCart } : item
      )
    );
  };

  return (
    <main className=" mx-auto my-5 px-20">
      <h1 className="mb-10 text-3xl font-semibold text-center text-zinc-900">
        My Wishlist
      </h1>
      <section className="px-6 py-4 rounded-lg border border-solid border-neutral-200 max-md:p-4">
        <header className="grid px-6 py-0 pb-4 mb-8 border-b border-solid border-b-neutral-200 grid-cols-[auto_150px_150px_250px] max-md:px-4 max-md:py-0 max-md:grid-cols-[1fr_100px_100px_200px] max-sm:gap-4 max-sm:text-center max-sm:grid-cols-[1fr]">
          <h2 className="text-sm font-medium tracking-wide uppercase text-zinc-500">
            Product
          </h2>
          <h2 className="text-sm font-medium tracking-wide uppercase text-zinc-500">
            Price
          </h2>
          <h2 className="text-sm font-medium tracking-wide uppercase text-zinc-500">
            Stock Status
          </h2>
        </header>
        <div className="flex flex-col gap-6">
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={handleRemoveFromWishlist}
              onToggleCart={handleToggleCart}
            />
          ))}
        </div>
        <SocialShare />
        <Pagination />
      </section>
    </main>
  );
};

export default WishlistPage;