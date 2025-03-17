"use client";
import React from "react";

const WishlistItem = ({ item, onRemove, onToggleCart }) => {
  const { id, name, image, price, originalPrice, inStock, inCart } = item;

  return (
    <article className="grid items-center px-6 py-0 pb-6 border-b border-solid border-b-neutral-200 grid-cols-[auto_150px_150px_250px] max-md:px-4 max-md:py-0 max-md:grid-cols-[1fr_100px_100px_200px] max-sm:gap-4 max-sm:text-center max-sm:grid-cols-[1fr]">
      <div className="flex gap-5 items-center max-md:gap-2.5 max-sm:justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover h-[100px] w-[100px] max-md:w-20 max-md:h-20"
        />
        <h3 className="text-base text-zinc-900">{name}</h3>
      </div>
      <div className="flex gap-1 items-center">
        <span className="text-base text-zinc-900">${price.toFixed(2)}</span>
        {originalPrice && (
          <span className="text-base line-through text-neutral-400">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      <div
        className={`px-2 py-1 text-sm rounded w-fit max-sm:mx-auto max-sm:my-0 ${
          inStock
            ? "text-white-800 bg-green-600 bg-opacity-20"
            : "text-white-500 bg-red-500 bg-opacity-20"
        }`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </div>
      <div className="flex gap-6 items-center max-sm:justify-center">
        <button
          className={`px-8 py-3.5 text-sm font-semibold cursor-pointer rounded-[43px] max-md:px-6 max-md:py-3 ${
            !inStock
              ? "bg-zinc-100 text-zinc-400 border-[none]"
              : inCart
              ? "bg-red-500 text-white border-[none]"
              : "bg-green-600 text-white border-[none]"
          }`}
          onClick={() => inStock && onToggleCart(id)}
          disabled={!inStock}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          className="p-0 cursor-pointer border-[none]"
          onClick={() => onRemove(id)}
          aria-label="Remove from wishlist"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon" style="width: 24px; height: 24px"> <g clip-path="url(#clip0_2013_6339)"> <path d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z" stroke="#CCCCCC" stroke-miterlimit="10"></path> <path d="M16 8L8 16" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 16L8 8" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_2013_6339"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </svg>`,
            }}
          />
        </button>
      </div>
    </article>
  );
};

export default WishlistItem;