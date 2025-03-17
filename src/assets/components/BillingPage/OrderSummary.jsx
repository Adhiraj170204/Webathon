"use client";
import React, { useState } from "react";

function OrderItem({ image, name, quantity, price }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-1.5 items-center">
        <img src={image} alt={name} className="h-[60px] w-[60px]" />
        <span className="text-sm text-zinc-900">{name}</span>
        <span className="text-sm text-zinc-900">x{quantity}</span>
      </div>
      <span className="text-sm font-medium text-zinc-900">{price}</span>
    </div>
  );
}

function PaymentOption({ id, label, checked, onChange }) {
  return (
    <div className="flex gap-1.5 items-center">
      <input
        type="radio"
        name="payment"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`w-5 h-5 rounded-full border-green-600 border-solid border-[1.5px] ${
          checked ? "bg-green-600" : ""
        }`}
      />
      <label htmlFor={id} className="text-sm text-neutral-600">
        {label}
      </label>
    </div>
  );
}

function OrderSummary() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <aside className="p-6 bg-white rounded-lg border border-solid border-neutral-200 w-[424px] max-md:w-full">
      <h2 className="mb-3 text-xl font-medium text-zinc-900">Order Summery</h2>

      <div>
        <OrderItem
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/0eaff0be9a962f21e3ffb386ae69acd956706e0b"
          name="Green Capsicum"
          quantity={5}
          price="$70.00"
        />

        <OrderItem
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/c13421cfc2fdc65ca441fed7d85afa7ede2200ed"
          name="Red Capsicum"
          quantity={1}
          price="$14.00"
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between px-0 py-3 text-sm">
          <span className="text-neutral-600">Subtotal:</span>
          <span className="font-medium text-zinc-900">$84.00</span>
        </div>

        <hr className="mx-0 my-6 h-px bg-neutral-200" />

        <div className="flex justify-between px-0 py-3 text-sm">
          <span className="text-neutral-600">Shipping:</span>
          <span className="font-medium text-zinc-900">Free</span>
        </div>

        <hr className="mx-0 my-6 h-px bg-neutral-200" />

        <div className="flex justify-between px-0 py-3 text-sm">
          <span className="text-base text-neutral-600">Total:</span>
          <span className="text-lg font-semibold text-zinc-900">$84.00</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-xl font-medium text-zinc-900">
          Payment Method
        </h3>

        <div className="flex flex-col gap-2.5">
          <PaymentOption
            id="cod"
            label="Cash on Delivery"
            checked={paymentMethod === "cod"}
            onChange={() => handlePaymentChange("cod")}
          />

          <PaymentOption
            id="paypal"
            label="Paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => handlePaymentChange("paypal")}
          />

          <PaymentOption
            id="amazon"
            label="Amazon Pay"
            checked={paymentMethod === "amazon"}
            onChange={() => handlePaymentChange("amazon")}
          />
        </div>
      </div>

      <button className="px-10 py-4 mt-6 w-full text-base font-semibold text-white bg-green-600 cursor-pointer border-[none] rounded-[43px] hover:bg-green-500 transition-colors">
        Place Order
      </button>
    </aside>
  );
}

export default OrderSummary;
