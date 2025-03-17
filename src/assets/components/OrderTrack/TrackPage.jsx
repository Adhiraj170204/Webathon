"use client";
import React from "react";
import OrderTracking from "./OrderTracking";

function TrackPage() {
  return (
    <main className="flex justify-center w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="w-full max-w-[1200px]">
        <OrderTracking />
      </div>
    </main>
  );
}

export default TrackPage;
