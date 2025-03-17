import React from "react";

function AddressInformation() {
  return (
    <section className="w-[68%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-wrap grow w-full bg-white rounded-md border border-solid border-[color:var(--Gray-Scale-Gray-100,#E6E6E6)] max-md:mt-6">
        <BillingAddress />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0040f7bd25103e9e16271f542921aece2c809fc7202211046f4572a425535a10?placeholderIfAbsent=true&apiKey=1b6dd8aee5454995bdff5445c5fb569a"
          className="object-contain shrink-0 w-px aspect-[0] stroke-[1px] stroke-neutral-200"
          alt="Divider"
        />
        <ShippingAddress />
      </div>
    </section>
  );
}

function BillingAddress() {
  return (
    <div className="flex flex-col my-auto">
      <h3 className="self-start ml-5 text-sm font-medium tracking-wide leading-none uppercase text-neutral-400 max-md:ml-2.5">
        Billing Address
      </h3>
      <hr className="shrink-0 mt-4 h-px border border-solid bg-neutral-200 border-neutral-200" />
      <div className="flex flex-col pr-2.5 pl-5 mt-3.5">
        <p className="self-start text-base text-zinc-900">BHR</p>
        <p className="self-start mt-2 text-sm text-stone-500">
          Infront of hostel, Room no 000
        </p>
        <div className="mt-14 whitespace-nowrap max-md:mt-10">
          <h4 className="text-xs font-medium tracking-wide leading-none uppercase text-neutral-400">
            Email
          </h4>
          <p className="mt-1 text-sm text-zinc-900">IITBBS.ac.in</p>
        </div>
        <div className="mt-3 whitespace-nowrap">
          <h4 className="text-xs font-medium tracking-wide leading-none uppercase text-neutral-400">
            Phone
          </h4>
          <p className="mt-1 text-sm text-zinc-900">000000000</p>
        </div>
      </div>
    </div>
  );
}

function ShippingAddress() {
  return (
    <div className="flex flex-col self-start mt-5 pr-5">
      <h3 className="self-start ml-5 text-sm font-medium tracking-wide leading-none uppercase text-neutral-400 max-md:ml-2.5">
        Shipping Address
      </h3>
      <hr className="shrink-0 mt-4 h-px border border-solid bg-neutral-200 border-neutral-200" />
      <div className="flex flex-col pr-2.5 pl-5 mt-3.5">
        <p className="self-start text-base text-zinc-900">BHR</p>
        <p className="self-start mt-2 text-sm text-stone-500">
          Infront of Hostel , Room no 000
        </p>
        <div className="mt-14 whitespace-nowrap max-md:mt-10">
          <h4 className="text-xs font-medium tracking-wide leading-none uppercase text-neutral-400">
            Email
          </h4>
          <p className="mt-1 text-sm text-zinc-900">IITBBS.ac.in</p>
        </div>
        <div className="mt-3 whitespace-nowrap">
          <h4 className="text-xs font-medium tracking-wide leading-none uppercase text-neutral-400">
            Phone
          </h4>
          <p className="mt-1 text-sm text-zinc-900">000000000</p>
        </div>
      </div>
    </div>
  );
}

export default AddressInformation;
