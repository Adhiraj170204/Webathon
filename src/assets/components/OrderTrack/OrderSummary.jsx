"use client";
import React from "react";
import OrderHeader from "./OrderHeader";
import AddressInformation from "./AddressInformation";
import OrderSummary from "./OrderSummary";
import ProgressTracker from "./ProgressTracker";
import ProductList from "./ProductList";

function OrderTracking() {
  return (
    <div className="flex overflow-hidden flex-col pr-2.5 max-w-[995px]">
      <OrderHeader />
      <div className="flex flex-col items-center pt-px pb-5 mt-16 mr-32 w-full bg-white rounded-lg border border-solid border-[color:var(--Gray-Scale-Gray-100,#E6E6E6)] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap items-center self-stretch px-6 py-4 bg-white rounded-lg shadow-sm max-md:px-5 max-md:mr-0 max-md:max-w-full">
          <div className="flex gap-2 items-center self-stretch my-auto text-sm min-w-60 text-neutral-600">
            <h2 className="self-stretch my-auto text-xl font-medium text-zinc-900">
              Order Details
            </h2>
            <span className="self-stretch my-auto">•</span>
            <time className="self-stretch my-auto">March 16,2025</time>
            <span className="self-stretch my-auto">•</span>
            <span className="self-stretch my-auto">3 Products</span>
          </div>
          <button className="self-stretch my-auto text-base font-medium text-green-600">
            Back to List
          </button>
        </div>

        <div className="mt-6 w-full max-w-[936px] max-md:max-w-full" space={24}>
          <div className="flex gap-5 max-md:flex-col">
            <AddressInformation />
            <OrderSummary />
          </div>
        </div>

        <ProgressTracker />
        <ProductList />
      </div>
    </div>
  );
}

export default OrderTracking;
