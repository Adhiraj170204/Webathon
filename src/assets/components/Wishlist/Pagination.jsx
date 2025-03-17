import React from "react";

const Pagination = () => {
  return (
    <nav
      className="flex gap-3 justify-center items-center mt-6 max-sm:flex-wrap"
      aria-label="Pagination"
    >
      <button
        className="flex justify-center items-center w-9 h-9 rounded-full cursor-pointer bg-zinc-100 border-[none]"
        aria-label="Previous page"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon"> <path d="M12.9165 4.16665L7.08317 9.99998L12.9165 15.8333" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`,
          }}
        />
      </button>
      <div className="flex">
        {[1, 2, 3, 4, 5, "...", 21].map((page, index) => (
          <button
            key={index}
            className="w-9 h-9 text-base bg-white rounded-full cursor-pointer border-[none] text-stone-500"
            aria-label={
              typeof page === "number" ? `Page ${page}` : "More pages"
            }
            aria-current={page === 1 ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="flex justify-center items-center w-9 h-9 bg-white rounded-full border border-solid cursor-pointer border-neutral-200"
        aria-label="Next page"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon"> <path d="M7.0835 4.16665L12.9168 9.99998L7.0835 15.8333" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`,
          }}
        />
      </button>
    </nav>
  );
};

export default Pagination;
