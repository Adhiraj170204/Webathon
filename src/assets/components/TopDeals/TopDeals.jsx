"use client";
import * as React from "react";
import FontProvider from "./FontProvider";
import SaleBanner from "./SaleBanner";
import SalesOfMonth from './SalesOfMonth'

const TopDeals = () => {
  return (
    <div className="mt-8 mx-0">
      <header className="flex justify-between items-center px-11 py-0 mx-auto my-0 max-w-[1320px] max-md:px-8 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <h2 className="text-3xl font-bold leading-10 text-zinc-900 max-md:text-3xl max-sm:text-2xl">
          TOP DEALS
        </h2>
        <a
          href="#"
          className="flex gap-3 items-center cursor-pointer hover:opacity-90 transition-opacity"
          aria-label="View all top deals"
        >
          <span className="text-base font-medium text-green-600 max-sm:text-sm">
            View All
          </span>
          {/* <svg
            width="91"
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
            />
            <path
              d="M83.95 5.97559L90 11.9996L83.95 18.0246"
              stroke="#00B307"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
        </a>
      </header>
      <FontProvider>
        <SalesOfMonth />
      </FontProvider>
    </div>
  );
};

export default TopDeals;
