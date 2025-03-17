"use client";
import React from "react";
import ActionButton from "./ActionButton";
import BannerContent from "./BannerContent";

const DiscountBanner = () => {
return (
    <section className="mx-5 flex relative flex-col items-end px-24 pt-16 pb-28 text-white rounded-xl min-h-[405px] max-md:px-10 max-md:pb-24">
        <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8edd6a3bdff96d05732532496fd519a88ee059219f4ff52339fa6fa829336136?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
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
