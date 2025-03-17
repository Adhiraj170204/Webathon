"use client";
import React, { memo } from "react";

const FooterLinkSection = memo(({ title, links }) => {
  return (
    <section>
      <h2 className="text-base font-medium text-zinc-900">{title}</h2>
      <nav className="mt-4 text-sm text-stone-500">
        {links.map((link, index) => (
          <a
            href="#"
            key={index}
            className={`block ${index > 0 ? "mt-3" : ""} hover:text-stone-700`}
          >
            {link}
          </a>
        ))}
      </nav>
    </section>
  );
});

FooterLinkSection.displayName = "FooterLinkSection";

const FooterLogo = () => {
  return (
    <section className="flex flex-col items-start text-sm font-medium min-w-60 text-zinc-900 w-[336px]">
      <header className="flex gap-2 items-center text-3xl tracking-tighter leading-none whitespace-nowrap">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/86ca8460a65c4552b17fc409b88c8fcd60eb2a8e17afa183fdc9980d42c7a9b3?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
          alt="IITMART logo"
          className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
        />
        <h1 className="self-stretch my-auto">IITMART</h1>
      </header>
      <p className="self-stretch mt-4 leading-5 text-zinc-500">
        Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui,
        eget bibendum magna congue nec.
      </p>
      <div className="flex gap-4 items-center mt-4 whitespace-nowrap">
        <p className="gap-2.5 self-stretch py-1.5 my-auto shadow-sm bg-zinc-100">
          99999999
        </p>
        <span className="self-stretch my-auto text-base text-zinc-500">or</span>
        <p className="gap-2.5 self-stretch py-1.5 my-auto shadow-sm bg-zinc-100">
          iitbbs.ac.in
        </p>
      </div>
    </section>
  );
};

const FooterMobileApp = () => {
  return (
    <section className="min-w-60">
      <h2 className="text-base font-medium text-zinc-900">
        Download Mobile App
      </h2>
      <div className="flex gap-2 items-start mt-4">
        <a href="#" className="flex gap-1.5 items-center p-2.5 bg-white">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/245ed2179bce3a4494c22a5b5f3ccd0b6e4d93d0e5ee9d777fa3b2812281c11f?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
            alt="App Store"
            className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
          />
          <div className="self-stretch my-auto w-[100px]">
            <p className="text-xs leading-tight text-neutral-600">
              Download on the
            </p>
            <p className="text-base font-medium text-zinc-900">App Store</p>
          </div>
        </a>
        <a href="#" className="flex gap-1.5 items-center p-2.5 bg-white">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e00e4eae83d33aff02ae1bc5155fb5c572c462af07c5eb0ad090d67cd2605ae?placeholderIfAbsent=true&apiKey=63d8526c80984e739e99de5a54a83b53"
            alt="Google Play"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div className="self-stretch my-auto w-[100px]">
            <p className="text-xs leading-tight text-neutral-600">
              Download on the
            </p>
            <p className="text-base font-medium text-zinc-900">Google play</p>
          </div>
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  // Define these arrays outside of the component or use useMemo if they're dynamic
  const accountLinks = [
    "My Account",
    "Order History",
    "Shoping Cart",
    "Wishlist",
  ];
  const helpLinks = ["Contact", "Faqs", "Terms & Condition", "Privacy Policy"];
  const proxyLinks = ["About", "Shop", "Product", "Track Order"];

  return (
    <footer className="flex flex-wrap gap-10 justify-between items-start px-16 py-16 bg-zinc-100 max-md:px-5">
      <FooterLogo />
      <FooterLinkSection title="My Account" links={accountLinks} />
      <FooterLinkSection title="Helps" links={helpLinks} />
      <FooterLinkSection title="Proxy" links={proxyLinks} />
      <FooterMobileApp />
    </footer>
  );
};

export default Footer;
