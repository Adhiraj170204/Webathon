import React from "react";

const BannerContent = () => {
  return (
    <div className="flex relative flex-col justify-center max-w-full w-[441px]">
      <header className="self-start">
        <h2 className="text-base font-medium tracking-wide leading-none uppercase">
          Summer Sale
        </h2>
        <p className="mt-3 text-6xl font-semibold leading-tight max-md:text-4xl">
          <span className="text-[#FF8A00]">37%</span>{" "}
          <span className="font-normal">OFF</span>
        </p>
      </header>
      <p className="mt-4 text-base leading-6 opacity-70 max-md:max-w-full">
        Free on all your order, Free Shipping and 30 days money-back guarantee
      </p>
    </div>
  );
};

export default BannerContent;
