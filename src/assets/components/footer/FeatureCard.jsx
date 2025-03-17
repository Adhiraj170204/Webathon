"use client";

import * as React from "react";

function Featured() {
  return (
    <section className="flex flex-wrap gap-8 justify-between items-center p-10 bg-white rounded-lg shadow-2xl max-md:px-5">
      <article className="flex gap-4 justify-center items-center self-stretch my-auto min-w-60">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a7387d1a758ab80c3774390d6f2197620fae2d452c79a294372b959383eabaf?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
          alt=""
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b1015ae414ed7a798c71f9dffb2a5d6b071832cd6bde23d3c290ca28bc2ac5d?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
          alt=""
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7faac4ef9e75ba651df0e6743a8dd60f9ccc53b2d6f886fec44824b5b3c726bf?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
          alt=""
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5b10b6b0f789f2eb4aa7db27f49360bad1b47bfc2ff6ecbc2ed6042b0bd3d8a?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
          alt=""
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
