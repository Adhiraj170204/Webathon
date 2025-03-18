"use client";

import * as React from "react";

function Featured() {
  return (
    <section className="flex flex-wrap gap-8 justify-between items-center p-10 bg-white rounded-lg shadow-2xl max-md:px-5">
      <article className="flex gap-4 justify-center items-center self-stretch my-auto min-w-60">
        <img
          src="https://images.unsplash.com/photo-1609942072337-43f247e05345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40&q=80"
          alt="Free Shipping Icon"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
        />
        <div className="flex flex-col justify-center self-stretch my-auto min-w-60 w-[250px]">
          <h3 className="text-base font-semibold leading-tight text-zinc-900">
            Free Shipping
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            Free shipping on all your order
          </p>
        </div>
      </article>

      <article className="flex gap-4 justify-center items-center self-stretch my-auto min-w-60">
        <img
          src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40&q=80"
          alt="Customer Support Icon"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
        />
        <div className="flex flex-col justify-center self-stretch my-auto min-w-60 w-[250px]">
          <h3 className="text-base font-semibold leading-tight text-zinc-900">
            Customer Support 24/7
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            Instant access to Support
          </p>
        </div>
      </article>

      <article className="flex gap-4 justify-center items-center self-stretch my-auto min-w-60">
        <img
          src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40&q=80"
          alt="Secure Payment Icon"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
        />
        <div className="flex flex-col justify-center self-stretch my-auto min-w-60 w-[250px]">
          <h3 className="text-base font-semibold leading-tight text-zinc-900">
            100% Secure Payment
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            We ensure your money is save
          </p>
        </div>
      </article>

      <article className="flex gap-4 justify-center items-center self-stretch my-auto min-w-60">
        <img
          src="https://images.unsplash.com/photo-1633158829875-e5316a358c6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40&q=80"
          alt="Money Back Guarantee Icon"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
        />
        <div className="flex flex-col justify-center self-stretch my-auto min-w-60 w-[250px]">
          <h3 className="text-base font-semibold leading-tight text-zinc-900">
            Money-Back Guarantee
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            30 Days Money-Back Guarantee
          </p>
        </div>
      </article>
    </section>
  );
}

export default Featured;
