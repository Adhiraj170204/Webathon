import React from "react";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Red Capsicum",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/30c6dc18a70fe68f8073da4de5c19c27c0be166c555870800c6487114d48cf8d?placeholderIfAbsent=true&apiKey=1b6dd8aee5454995bdff5445c5fb569a",
      price: "$14.00",
      quantity: "x5",
      subtotal: "$70.00",
    },
    {
      id: 2,
      name: "Green Capsicum",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/119f743cdff91cca727dbc9fa98b62a67629b7709886e98085a5d0eddce709c8?placeholderIfAbsent=true&apiKey=1b6dd8aee5454995bdff5445c5fb569a",
      price: "$14.00",
      quantity: "x2",
      subtotal: "$28.00",
    },
    {
      id: 3,
      name: "Green Chili",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f8a3117a9a4a163958e0f9c1b7deb5256bb6835038e0fe27c8fed9779e06e62a?placeholderIfAbsent=true&apiKey=1b6dd8aee5454995bdff5445c5fb569a",
      price: "$26.70",
      quantity: "x10",
      subtotal: "$267.00",
    },
  ];

  return (
    <section className="w-full mt-10">
      <div className="flex flex-wrap gap-5 justify-between self-stretch py-3 pr-20 pl-5 w-full text-xs font-medium tracking-wide leading-none uppercase whitespace-nowrap bg-zinc-100 text-neutral-600 max-md:pr-5">
        <div>Product</div>
        <div className="flex gap-10 max-md:max-w-full">
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch px-5 mt-3 w-full text-sm text-zinc-900 max-md:px-5 max-md:max-w-full">
        {products.map((product, index) => (
          <React.Fragment key={product.id}>
            <ProductItem product={product} />
            {index < products.length - 1 && (
              <hr className="shrink-0 self-stretch mt-2 h-px border border-solid bg-neutral-200 border-neutral-200 max-md:max-w-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function ProductItem({ product }) {
  return (
    <div className="flex flex-wrap gap-5 justify-between w-full max-w-[812px] max-md:max-w-full">
      <div className="flex gap-3">
        <img
          src={product.image}
          className="object-contain shrink-0 aspect-square w-[70px]"
          alt={product.name}
        />
        <div className="my-auto basis-auto">{product.name}</div>
      </div>
      <div className="flex gap-10 my-auto whitespace-nowrap">
        <div>{product.price}</div>
        <div>{product.quantity}</div>
        <div className="font-medium">{product.subtotal}</div>
      </div>
    </div>
  );
}

export default ProductList;
