import React from "react";

const CategoryCard = ({ title, isHighlighted }) => {
  // Using a placeholder image for all cards as requested
  const placeholderImage = "https://placehold.co/190x130";

  return (
    <button
      className={`flex flex-col gap-4 items-center px-0 pt-4 pb-6 bg-white rounded-md border ${
        isHighlighted ? "border-green-800 shadow-sm" : "border-neutral-200"
      }`}
    >
      <img
        src={placeholderImage}
        alt={title}
        className="w-[190px] h-[130px] max-sm:w-full max-sm:h-auto"
      />
      <h3
        className={`text-lg text-center ${
          isHighlighted ? "text-green-800" : "text-zinc-900"
        }`}
      >
        {title}
      </h3>
    </button>
  );
};

export default CategoryCard;
