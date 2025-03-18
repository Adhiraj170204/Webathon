import React from "react";

function ProgressTracker() {
  return (
    <>
      <div className="flex z-10 flex-wrap gap-10 justify-between items-center mt-10 w-full text-sm leading-10 text-center text-green-600 whitespace-nowrap max-w-[800px] max-md:max-w-full">
        <img
          src="https://images.unsplash.com/photo-1604593686423-45bbaa773f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=70&h=70&q=80"
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
        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=760&h=5&q=80"
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
