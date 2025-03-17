"use client";
import React from "react";
import SaleBanner from "./SaleBanner";
import CountdownTimer from "./CountdownTimer";

function SaleBanners() {
  return (
    <section className="flex gap-6 p-5 mx-auto my-0 max-w-[1320px] max-md:flex-col max-md:gap-5 max-md:items-center">
      {/* Sale of the Month Banner */}
      <SaleBanner
        label="Best Deals"
        title="Sale of the Month"
        bgColor="bg-blue-600"
        textColor="text-white"
        buttonStyle="bg-white text-blue-600"
      >
        <CountdownTimer />
      </SaleBanner>

      {/* Summer Sale Banner */}
      <SaleBanner
        label="Summer Sale"
        title="75% off"
        titleColor="text-green-600"
        bgColor="bg-gray-100"
        buttonStyle="bg-green-100 text-green-600"
      />

      {/* Fresh Fruit Banner */}
      <SaleBanner
        label="Summer Sale"
        title="100% Fresh Fruit"
        bgColor="bg-yellow-50"
        buttonStyle="bg-green-100 text-green-600"
      >
        <div className="flex gap-3 items-center mx-0 my-4">
          <span className="text-lg">Up to</span>
          <div className="px-3 py-1.5 text-lg font-semibold text-yellow-400 rounded-md bg-zinc-900">
            64% OFF
          </div>
        </div>
      </SaleBanner>
    </section>
  );
}

export default SaleBanners;
