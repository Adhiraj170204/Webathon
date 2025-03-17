"use client";
import React, { useState } from 'react';

// Star rating component for reusability
const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex gap-0.5 items-start">
      {[...Array(maxRating)].map((_, index) => (
        <div key={index}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[16px] h-[16px]"
          >
            <path
              d="M8.27554 11.921L11.428 13.918C11.831 14.173 12.331 13.7935 12.2115 13.323L11.301 9.74055C11.2753 9.64075 11.2783 9.53573 11.3096 9.43755C11.3409 9.33937 11.3993 9.25202 11.478 9.18554L14.305 6.83305C14.676 6.52404 14.485 5.90755 14.0075 5.87654L10.316 5.63655C10.2166 5.62949 10.1213 5.59436 10.0411 5.53523C9.96091 5.4761 9.89916 5.39541 9.86304 5.30254L8.48604 1.83555C8.44854 1.73701 8.38199 1.65221 8.29519 1.59237C8.20839 1.53253 8.10546 1.50049 8.00004 1.50049C7.89462 1.50049 7.79168 1.53253 7.70489 1.59237C7.61809 1.65221 7.55153 1.73701 7.51404 1.83555L6.13704 5.30254C6.10099 5.3955 6.03927 5.4763 5.95907 5.53552C5.87887 5.59474 5.78348 5.62995 5.68404 5.63704L1.99254 5.87704C1.51554 5.90754 1.32354 6.52404 1.69504 6.83305L4.52204 9.18604C4.60069 9.25248 4.65902 9.33974 4.69033 9.43783C4.72164 9.53591 4.72466 9.64083 4.69904 9.74055L3.85504 13.063C3.71154 13.6275 4.31204 14.083 4.79504 13.7765L7.72504 11.921C7.80739 11.8687 7.90295 11.8409 8.00054 11.8409C8.09812 11.8409 8.19369 11.8687 8.27604 11.921H8.27554Z"
              fill={index < rating ? "#FF8A00" : "#CCCCCC"}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Action buttons that appear on hover
const ActionButtons = ({ inCart, inWishlist, onCartToggle, onWishlistToggle, onQuickView }) => {
  return (
    <div className="flex gap-3 items-start">
      <button
        onClick={onCartToggle}
        className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: inCart ? '#00B307' : 'white', border: inCart ? 'none' : '1px solid #F2F2F2' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill={inCart ? "#00B307" : "white"} />
          <path
            d="M16.6667 18.3333H14.1667L12.5 27.5H27.5L25.8333 18.3333H23.3333M16.6667 18.3333V15.8333C16.6667 13.9924 18.1591 12.5 20 12.5V12.5C21.8409 12.5 23.3333 13.9924 23.3333 15.8333V18.3333M16.6667 18.3333H23.3333M16.6667 18.3333V20.8333M23.3333 18.3333V20.8333"
            stroke={inCart ? "white" : "#1A1A1A"}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={onQuickView}
        className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-white border border-[#F2F2F2]"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19.5" fill="white" stroke="#F2F2F2" />
          <path
            d="M20 13.541C13.75 13.541 11.25 20.0001 11.25 20.0001C11.25 20.0001 13.75 26.4577 20 26.4577C26.25 26.4577 28.75 20.0001 28.75 20.0001C28.75 20.0001 26.25 13.541 20 13.541V13.541Z"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 23.125C20.8288 23.125 21.6237 22.7958 22.2097 22.2097C22.7958 21.6237 23.125 20.8288 23.125 20C23.125 19.1712 22.7958 18.3763 22.2097 17.7903C21.6237 17.2042 20.8288 16.875 20 16.875C19.1712 16.875 18.3763 17.2042 17.7903 17.7903C17.2042 18.3763 16.875 19.1712 16.875 20C16.875 20.8288 17.2042 21.6237 17.7903 22.2097C18.3763 22.7958 19.1712 23.125 20 23.125V23.125Z"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={onWishlistToggle}
        className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: inWishlist ? '#FF0000' : 'white', border: inWishlist ? 'none' : '1px solid #F2F2F2' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19.5" fill={inWishlist ? "#FF0000" : "white"} stroke="#F2F2F2" />
          <path
            d="M19.9997 27.5453C3.33334 18.3335 15 8.33354 19.9997 14.6569C25 8.33354 36.6666 18.3335 19.9997 27.5453Z"
            stroke={inWishlist ? "white" : "#1A1A1A"}
            fill={inWishlist ? "#FF0000" : "none"}
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
};

const HotDealsCard = ({
  image,
  altText,
  name,
  price,
  originalPrice,
  rating = 4,
  specialStyle = false,
  specialTextColor = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const handleCartToggle = () => {
    setInCart(!inCart);
  };

  const handleWishlistToggle = () => {
    setInWishlist(!inWishlist);
  };

  const handleQuickView = () => {
    // Quick view functionality would go here
    console.log('Quick view for', name);
  };

  return (
    <article
      className={`flex items-start bg-white rounded-md border ${specialStyle ? 'border-green-800 shadow-sm' : 'border-neutral-200'} w-[312px] h-[120px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={altText}
        className="w-[112px] h-[112px] p-[5px] object-cover"
      />
      <div className="flex flex-col gap-1.5 justify-center px-3 pt-6 pb-6">
        <div className="flex flex-col items-start">
          <h3 className={`w-72 text-sm leading-5 ${specialTextColor ? specialTextColor : 'text-neutral-600'}`}>
            {name}
          </h3>
          <div className="flex gap-0.5 items-start">
            <span className="text-base font-medium leading-6 text-zinc-900">{price}</span>
            {originalPrice && (
              <span className="text-base leading-6 text-neutral-400">{originalPrice}</span>
            )}
          </div>
        </div>

        {isHovered ? (
          <ActionButtons
            inCart={inCart}
            inWishlist={inWishlist}
            onCartToggle={handleCartToggle}
            onWishlistToggle={handleWishlistToggle}
            onQuickView={handleQuickView}
          />
        ) : (
          <StarRating rating={rating} />
        )}
      </div>
    </article>
  );
};

export default HotDealsCard;
