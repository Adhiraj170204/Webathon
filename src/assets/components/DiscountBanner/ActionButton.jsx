"use client";
import React from "react";

const ActionButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-10 py-4 text-base font-semibold leading-tight text-white bg-green-600 rounded-[43px] hover:bg-green-700 transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
