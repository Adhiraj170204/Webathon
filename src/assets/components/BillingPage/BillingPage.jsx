"use client";
import React from "react";
import BillingAddress from "./BillingAddress";
import OrderSummary from "./OrderSummary";

function BillingPage() {
  return (
    <main className="flex gap-16 pt-8 px-18 mx-2 pb-20  max-md:flex-col max-md:p-5 max-sm:p-4">
      <BillingAddress />
      <OrderSummary />
    </main>
  );
}

export default BillingPage;
