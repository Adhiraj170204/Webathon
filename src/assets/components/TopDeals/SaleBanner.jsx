import React from "react";

function SaleBanner({
  label,
  title,
  bgColor = "bg-white",
  textColor = "text-black",
  titleColor,
  buttonStyle = "bg-blue-600 text-white",
  children,
}) {
  return (
    <article
      className={`flex relative flex-col items-center pt-9 rounded-lg h-[536px] w-[424px] ${bgColor} max-md:w-full max-md:max-w-[424px] max-sm:pt-5 max-sm:h-[400px]`}
    >
      <header
        className={`mb-4 text-sm font-medium tracking-wide uppercase ${textColor}`}
      >
        {label}
      </header>

      <h2
        className={`text-4xl font-semibold leading-10 text-center ${titleColor || textColor} max-sm:text-3xl`}
      >
        {title}
      </h2>

      {children}

      <button
        className={`flex gap-3 items-center px-8 py-3.5 text-sm font-semibold cursor-pointer border-[none] rounded-[43px] ${buttonStyle} max-sm:px-6 max-sm:py-3`}
      >
        <span>Shop Now</span>
        <i className="ti ti-arrow-right" />
      </button>
    </article>
  );
}

export default SaleBanner;
