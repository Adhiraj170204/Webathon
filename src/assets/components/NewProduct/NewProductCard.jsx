"use client";
import React, { useState } from "react";

const NewProductCard = ({
  image,
  name,
  price,
  discountedPrice,
  rating,
  salePercentage,
  hasQuickViewButton,
  isGreenCartButton,
}) => {
  const [isCartButtonGreen, setIsCartButtonGreen] = useState(isGreenCartButton);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isWishlistGreen, setIsWishlistGreen] = useState(false);

  const toggleCartButtonColor = () => {
    setIsCartButtonGreen((prev) => !prev);
  };

  const toggleWishlistColor = () => {
    setIsWishlistGreen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsHighlighted(true);
  };

  const handleMouseLeave = () => {
    setIsHighlighted(false);
  };

  // Generate star ratings based on the rating value (out of 5)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <div key={`full-${i}`}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="star"
            style={{ width: "12px", height: "12px", fill: "#FF8A00" }}
          >
            <path
              d="M6.20663 9.44066L8.57101 10.9384C8.87326 11.1297 9.24826 10.845 9.15863 10.4922L8.47576 7.80529C8.45647 7.73044 8.45869 7.65168 8.48217 7.57804C8.50566 7.50441 8.54945 7.43889 8.60851 7.38904L10.7288 5.62466C11.007 5.39291 10.8638 4.93054 10.5056 4.90729L7.73701 4.72729C7.66246 4.722 7.59096 4.69565 7.53081 4.6513C7.47066 4.60695 7.42435 4.54643 7.39726 4.47679L6.36451 1.87654C6.33638 1.80264 6.28647 1.73903 6.22137 1.69416C6.15627 1.64928 6.07907 1.62524 6.00001 1.62524C5.92094 1.62524 5.84374 1.64928 5.77864 1.69416C5.71354 1.73903 5.66363 1.80264 5.63551 1.87654L4.60276 4.47679C4.57572 4.5465 4.52943 4.6071 4.46928 4.65152C4.40913 4.69594 4.33759 4.72234 4.26301 4.72766L1.49438 4.90766C1.13663 4.93054 0.992631 5.39291 1.27126 5.62466L3.39151 7.38941C3.4505 7.43924 3.49424 7.50469 3.51772 7.57825C3.54121 7.65181 3.54347 7.7305 3.52426 7.80529L2.89126 10.2972C2.78363 10.7205 3.23401 11.0622 3.59626 10.8323L5.79376 9.44066C5.85552 9.4014 5.92719 9.38054 6.00038 9.38054C6.07357 9.38054 6.14524 9.4014 6.20701 9.44066H6.20663Z"
              fill="#FF8A00"
            ></path>
          </svg>
        </div>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <div key={`empty-${i}`}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="star-empty"
            style={{ width: "12px", height: "12px", fill: "#CCCCCC" }}
          >
            <path
              d="M6.20663 9.44066L8.57101 10.9384C8.87326 11.1297 9.24826 10.845 9.15863 10.4922L8.47576 7.80529C8.45647 7.73044 8.45869 7.65168 8.48217 7.57804C8.50566 7.50441 8.54945 7.43889 8.60851 7.38904L10.7288 5.62466C11.007 5.39291 10.8638 4.93054 10.5056 4.90729L7.73701 4.72729C7.66246 4.722 7.59096 4.69565 7.53081 4.6513C7.47066 4.60695 7.42435 4.54643 7.39726 4.47679L6.36451 1.87654C6.33638 1.80264 6.28647 1.73903 6.22137 1.69416C6.15627 1.64928 6.07907 1.62524 6.00001 1.62524C5.92094 1.62524 5.84374 1.64928 5.77864 1.69416C5.71354 1.73903 5.66363 1.80264 5.63551 1.87654L4.60276 4.47679C4.57572 4.5465 4.52943 4.6071 4.46928 4.65152C4.40913 4.69594 4.33759 4.72234 4.26301 4.72766L1.49438 4.90766C1.13663 4.93054 0.992631 5.39291 1.27126 5.62466L3.39151 7.38941C3.4505 7.43924 3.49424 7.50469 3.51772 7.57825C3.54121 7.65181 3.54347 7.7305 3.52426 7.80529L2.89126 10.2972C2.78363 10.7205 3.23401 11.0622 3.59626 10.8323L5.79376 9.44066C5.85552 9.4014 5.92719 9.38054 6.00038 9.38054C6.07357 9.38054 6.14524 9.4014 6.20701 9.44066H6.20663Z"
              fill="#CCCCCC"
            ></path>
          </svg>
        </div>
      );
    }

    return stars;
  };

  // Render cart button (gray or green)
  const renderCartButton = () => {
    if (isCartButtonGreen) {
      return (
        <div onClick={toggleCartButtonColor}>
          <svg
            layer-name="Add To Cart"
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cart-icon-green"
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              background: "#00B307",
            }}
          >
            <circle cx="20" cy="20.5" r="20" fill="#00B307"></circle>
            <path
              d="M16.6667 18.8333H14.1667L12.5 28H27.5L25.8333 18.8333H23.3333M16.6667 18.8333V16.3333C16.6667 14.4924 18.1591 13 20 13V13C21.8409 13 23.3333 14.4924 23.3333 16.3333V18.8333M16.6667 18.8333H23.3333M16.6667 18.8333V21.3333M23.3333 18.8333V21.3333"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      );
    } else {
      return (
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
              background: "#F2F2F2",
            }}
          >
            <circle cx="20" cy="20.5" r="20" fill="#F2F2F2"></circle>
            <path
              d="M16.6667 19.3333H14.1667L12.5 28.5H27.5L25.8333 19.3333H23.3333M16.6667 19.3333V16.8333C16.6667 14.9924 18.1591 13.5 20 13.5V13.5C21.8409 13.5 23.3333 14.9924 23.3333 16.8333V19.3333M16.6667 19.3333H23.3333M16.6667 19.3333V21.8333M23.3333 19.3333V21.8333"
              stroke="#1A1A1A"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      );
    }
  };

  return (
    <article
      className={`relative bg-white border border-solid border-neutral-200 h-[327px] ${
        isHighlighted ? "shadow-lg" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative p-1.5 h-60">
        <img src={image} className="object-contain size-full" alt={name} />

        {/* Sale badge */}
        {salePercentage && (
          <div className="flex absolute top-4 left-4 gap-1 px-2 py-1 text-sm text-white bg-red-500 rounded">
            <span>Sale</span>
            <span>{salePercentage}%</span>
          </div>
        )}

        {/* Wishlist button */}
        <div
          className={`flex absolute top-4 right-4 justify-center items-center w-10 h-10 rounded-full border border-solid cursor-pointer ${
            isWishlistGreen ? "bg-green-500" : "text-red-500"
          } border-zinc-100`}
          onClick={toggleWishlistColor}
        >
          <svg
            layer-name="Add To wishlist"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="wishlist-icon "
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            <circle
              cx="20"
              cy="20"
              r="19.5"
              fill="white"
              stroke="#F2F2F2"
            ></circle>
            <path
              d="M19.9997 27.5451C3.33334 18.3333 15 8.3333 19.9997 14.6567C25 8.3333 36.6666 18.3333 19.9997 27.5451Z"
              stroke={isWishlistGreen ? "red" : "#1A1A1A"}
              strokeWidth="2"
            ></path>
          </svg>
        </div>

        {/* Quick view button */}
        {hasQuickViewButton && (
          <div>
            <svg
              layer-name="Quick View"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="quick-view-icon"
              style={{
                position: "absolute",
                top: "62px",
                right: "16px",
                width: "40px",
                height: "40px",
                background: "#FFF",
                border: "1px solid #F2F2F2",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <circle
                cx="20"
                cy="20"
                r="19.5"
                fill="white"
                stroke="#F2F2F2"
              ></circle>
              <path
                d="M20 13.541C13.75 13.541 11.25 20.0001 11.25 20.0001C11.25 20.0001 13.75 26.4577 20 26.4577C26.25 26.4577 28.75 20.0001 28.75 20.0001C28.75 20.0001 26.25 13.541 20 13.541V13.541Z"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20 23.125C20.8288 23.125 21.6237 22.7958 22.2097 22.2097C22.7958 21.6237 23.125 20.8288 23.125 20C23.125 19.1712 22.7958 18.3763 22.2097 17.7903C21.6237 17.2042 20.8288 16.875 20 16.875C19.1712 16.875 18.3763 17.2042 17.7903 17.7903C17.2042 18.3763 16.875 19.1712 16.875 20C16.875 20.8288 17.2042 21.6237 17.7903 22.2097C18.3763 22.7958 19.1712 23.125 20 23.125V23.125Z"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="text-sm text-neutral-600">{name}</h3>

        {/* Price display */}
        {discountedPrice ? (
          <div className="flex gap-0.5 items-center">
            <span className="text-base text-zinc-900">${discountedPrice}</span>
            <span className="text-base line-through text-neutral-400">
              ${price}
            </span>
          </div>
        ) : (
          <div className="gap-0.5 text-base text-zinc-900">${price}</div>
        )}

        {/* Star rating */}
        <div className="flex gap-0.5">{renderStars(rating)}</div>
      </div>

      {/* Cart button */}
      {renderCartButton()}
    </article>
  );
};

export default NewProductCard;