"use client";
import React from "react";
import ActionButton from "./ActionButton";
import BannerContent from "./BannerContent";

const DiscountBanner = () => {
return (
    <section className="mx-5 flex relative flex-col items-end px-24 pt-16 pb-28 text-white rounded-xl min-h-[405px] max-md:px-10 max-md:pb-24">
        <img
            src="https://images.unsplash.com/photo-1594296385402-3cfcb55a1d91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Summer sale background"
            className="object-cover absolute inset-0 size-full rounded-xl"
            aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-end w-full">
            <BannerContent />
            <div className="mt-7 mr-72 max-md:mr-5">
                <ActionButton>Shop Now</ActionButton>
            </div>
        </div>
    </section>
);
};

export default DiscountBanner;
