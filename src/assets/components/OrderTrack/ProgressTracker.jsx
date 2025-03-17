import React from "react";

function ProgressTracker() {
  return (
    <>
      <div className="flex z-10 flex-wrap gap-10 justify-between items-center mt-10 w-full text-sm leading-10 text-center text-green-600 whitespace-nowrap max-w-[800px] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/61521198fbb94bc3475e42280ecf48adacc1f55a83245bcaf3506455fb3af969?placeholderIfAbsent=true&apiKey=1b6dd8aee5454995bdff5445c5fb569a"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
          alt="Progress step 1"
        />
        <div className="self-stretch my-auto w-10 font-medium text-white">
          <div className="px-1 w-10 h-10 bg-green-600 rounded-full">02</div>
        </div>
        <div className="self-stretch my-auto w-10">
          <div className="z-10 px-1 bg-white rounded-full border border-green-600 border-dashed h-[41px] stroke-[1px] w-[41px]">
            03
          </div>
        </div>
        <div className="self-stretch my-auto w-10">
          <div className="z-10 px-1 bg-white rounded-full border border-green-600 border-dashed h-[41px] stroke-[1px] w-[41px]">
            04
          </div>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc14e590e812a4bd82b9b7547735b6306cf2a644757f4424fd167f3368e195df?placeholderIfAbsent=true&apiKey=1b6dd8aee5454995bdff5445c5fb569a"
        className="object-contain -mt-5 w-full max-w-[760px] max-md:max-w-full"
        alt="Progress line"
      />
      <div className="flex gap-10 mt-7 w-full text-sm text-center text-green-800 max-w-[844px] max-md:max-w-full">
        <div className="grow shrink w-[91px]">Order received</div>
        <div className="font-medium">Processing</div>
        <div className="text-zinc-800">On the way</div>
        <div className="text-zinc-800">Delivered</div>
      </div>
    </>
  );
}

export default ProgressTracker;
