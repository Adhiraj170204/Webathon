"use client";
import React from "react";

function BillingAddress() {
  return (
    <section className="flex-1 max-w-[872px]">
      <h2 className="mb-9 text-2xl font-medium text-zinc-900">
        Billing Information
      </h2>
      <form>
        <div className="flex gap-4 mb-4 max-sm:flex-col">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="mb-2 text-sm text-zinc-900 block"
            >
              First name
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                placeholder="Your first name"
                className="px-4 py-3.5 w-full text-base bg-white rounded-md border border-solid border-neutral-200 text-neutral-400"
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="mb-2 text-sm text-zinc-900 block"
            >
              Last name
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                placeholder="Your last name"
                className="px-4 py-3.5 w-full text-base bg-white rounded-md border border-solid border-neutral-200 text-neutral-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4 max-sm:flex-col">
          <div className="flex-1">
            <label htmlFor="email" className="mb-2 text-sm text-zinc-900 block">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="px-4 py-3.5 w-full text-base bg-white rounded-md border border-solid border-neutral-200 text-neutral-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4 max-sm:flex-col">
          <div className="flex-1">
            <label htmlFor="phone" className="mb-2 text-sm text-zinc-900 block">
              Phone
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                placeholder="Phone number"
                className="px-4 py-3.5 w-full text-base bg-white rounded-md border border-solid border-neutral-200 text-neutral-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4 max-sm:flex-col">
          <div className="flex-1">
            <label
              htmlFor="hostel"
              className="mb-2 text-sm text-zinc-900 block"
            >
              Hostel
            </label>
            <div className="relative">
              <select
                id="hostel"
                disabled
                className="px-4 py-3.5 pr-10 w-full text-base bg-white rounded-md border border-solid appearance-none border-neutral-200 text-neutral-400"
              >
                <option>Select</option>
              </select>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-icon" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none"> <path d="M3.33317 6.16669L7.99984 10.8334L12.6665 6.16669" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="block" className="mb-2 text-sm text-zinc-900 block">
              Block
            </label>
            <div className="relative">
              <select
                id="block"
                disabled
                className="px-4 py-3.5 pr-10 w-full text-base bg-white rounded-md border border-solid appearance-none border-neutral-200 text-neutral-400"
              >
                <option>Selects</option>
              </select>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-icon" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none"> <path d="M3.33317 6.16669L7.99984 10.8334L12.6665 6.16669" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="room" className="mb-2 text-sm text-zinc-900 block">
              Room
            </label>
            <div className="relative">
              <input
                type="text"
                id="room"
                placeholder="000"
                className="px-4 py-3.5 w-full text-base bg-white rounded-md border border-solid border-neutral-200 text-neutral-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 items-center mt-5">
          <input
            type="checkbox"
            id="ship-different"
            className="w-5 h-5 rounded border border-solid border-stone-300"
          />
          <label htmlFor="ship-different" className="text-sm text-neutral-600">
            Ship to a different address
          </label>
        </div>

        <hr className="mx-0 my-6 h-px bg-neutral-200" />

        <div className="text-center">
          <p className="mx-0 my-4 text-sm text-neutral-600">or</p>
          <button
            type="button"
            className="flex gap-2 justify-center items-center text-base text-neutral-600 mx-auto"
          >
            <span>Use Current Location</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/77d3dd24e88c4bed3ef11759461f8f9392dc9851"
              alt="Google maps"
              className="h-[21px] w-[21px]"
            />
          </button>
        </div>
      </form>

      <section className="mt-6">
        <h2 className="mb-9 text-2xl font-medium text-zinc-900">
          Additional Info
        </h2>
        <div className="flex-1">
          <label
            htmlFor="orderNotes"
            className="mb-2 text-sm text-zinc-900 block"
          >
            Order Notes (Optional)
          </label>
          <textarea
            id="orderNotes"
            placeholder="Notes about your order, e.g. special notes for delivery"
            className="px-4 py-3.5 w-full text-base bg-white rounded-md border border-solid resize-none border-neutral-200 h-[100px] text-neutral-400"
          />
        </div>
      </section>
    </section>
  );
}

export default BillingAddress;
