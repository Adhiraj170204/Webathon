"use client";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard.jsx";

const PopularCategories = () => {
  // Sample data for categories
  const initialCategories = [
    { id: 1, title: "Fresh Fruit", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 2, title: "Fresh Vegetables", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 3, title: "Meat & Fish", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 4, title: "Snacks", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 5, title: "Beverages", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 6, title: "Beauty & Health", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 7, title: "Bread & Bakery", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 8, title: "Baking Needs", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 9, title: "Cooking", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 10, title: "Homeware", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 11, title: "Dish Detergents", image: "https://placehold.co/190x130", isHighlighted: false },
    { id: 12, title: "Oil", image: "https://placehold.co/190x130", isHighlighted: false },
  ];

  const [categories, setCategories] = useState(initialCategories);

  const handleMouseEnter = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, isHighlighted: true }
          : category
      )
    );
  };

  const handleMouseLeave = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, isHighlighted: false }
          : category
      )
    );
  };

  return (
    <section className="flex justify-between items-center px-4 py-12 w-full">
      <div className="mx-14 w-full">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900">
            Popular Categories
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

        <div className="grid grid-cols-6 gap-6 mb-6 max-md:grid-cols-3 max-sm:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={() => handleMouseLeave(category.id)}
            >
              <CategoryCard
                title={category.title}
                image={category.image}
                isHighlighted={category.isHighlighted}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;