import React, { useState } from "react";

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  isSale,
  salePercentage,
  rating,
  isGreen = false,
  showWishlist = false,
  showQuickView = false,
}) => {
  const [isCartButtonGreen, setIsCartButtonGreen] = useState(false);
  const [isWishlistRed, setIsWishlistRed] = useState(false);

  const toggleCartButtonColor = () => {
    setIsCartButtonGreen((prev) => !prev);
  };

  const toggleWishlistColor = () => {
    setIsWishlistRed((prev) => !prev);
  };

  // Generate star rating elements
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <i key={i} className="text-xs text-amber-500 ti ti-star-filled" />,
      );
    }
    return stars;
  };

  return (
    <article className="relative bg-white border border-solid transition-all border-neutral-200 duration-[0.3s] ease-[ease]">
      <div className="relative p-1.5">
        <img src={image} alt={name} className="object-cover w-full h-[230px]" />

        {isSale && (
          <div className="flex absolute top-4 left-4 gap-1 px-2 py-1 bg-red-500 rounded">
            <span className="text-sm text-white">Sale</span>
            <span className="text-sm text-white">{salePercentage}%</span>
          </div>
        )}

        <div
          className={`flex absolute top-4 right-4 justify-center items-center w-10 h-10 rounded-full border border-solid cursor-pointer ${
            isWishlistRed ? "bg-red-500" : "bg-white"
          } border-zinc-100`}
          onClick={toggleWishlistColor}
        >
          <i className={`ti ti-heart ${isWishlistRed ? "text-white" : ""}`} />
        </div>

        {showQuickView && (
          <div className="flex absolute right-4 top-16 justify-center items-center w-10 h-10 bg-white rounded-full border border-solid cursor-pointer border-zinc-100">
            <i className="ti ti-eye" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <h3
          className={`text-sm ${isGreen ? "text-green-800" : "text-neutral-600"}`}
        >
          {name}
        </h3>

        {originalPrice ? (
          <div className="flex gap-1 items-center">
            <span className="text-base text-zinc-900">${price.toFixed(2)}</span>
            <span className="text-base line-through text-neutral-400">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
        ) : (
          <div className="gap-1 text-base text-zinc-900">
            ${price.toFixed(2)}
          </div>
        )}

        <div className="flex gap-0.5">{renderStars()}</div>
      </div>

      <div onClick={toggleCartButtonColor}>
        <svg
          layer-name="Add To Cart"
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cart-icon"
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            background: isCartButtonGreen ? "#00B307" : "#F2F2F2",
          }}
        >
          <circle cx="20" cy="20.5" r="20" fill={isCartButtonGreen ? "#00B307" : "#F2F2F2"}></circle>
          <path
            d="M16.6667 19.3333H14.1667L12.5 28.5H27.5L25.8333 19.3333H23.3333M16.6667 19.3333V16.8333C16.6667 14.9924 18.1591 13.5 20 13.5V13.5C21.8409 13.5 23.3333 14.9924 23.3333 16.8333V19.3333M16.6667 19.3333H23.3333M16.6667 19.3333V21.8333M23.3333 19.3333V21.8333"
            stroke={isCartButtonGreen ? "white" : "#1A1A1A"}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </article>
  );
};

export default ProductCard;