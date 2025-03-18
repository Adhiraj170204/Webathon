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
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
          >
            <path
              d="M19.8125 14.5417C19.8125 12.3342 21.175 10.4884 23.1583 9.625C22.1292 8.14833 20.4008 7.14583 18.4058 7.14583C14.6067 7.14583 13.7358 9.60417 11.3458 9.60417C8.9325 9.60417 7.7875 7.14583 4.60917 7.14583C2.8225 7.14583 1.1925 8.0225 0 9.3625C0 14.6533 3.8675 22.5167 7.0175 22.5167C8.5925 22.5167 9.16 21.5375 11.3458 21.5375C13.5767 21.5375 13.9417 22.5167 15.5167 22.5167C17.0917 22.5167 18.6667 19.3717 20.2417 16.7883C20.0117 16.0942 19.8125 15.3417 19.8125 14.5417Z"
              fill="#000000"
            />
            <path
              d="M16.275 5.44083C16.6746 4.95834 16.9456 4.38813 17.0636 3.78093C17.1815 3.17374 17.1428 2.5474 16.9511 1.96107C16.7594 1.37474 16.4205 0.851312 15.9675 0.441336C15.5145 0.0313596 14.9646 -0.251 14.3842 -0.375C14.2647 0.259895 14.2899 0.918316 14.4576 1.54044C14.6253 2.16256 14.9309 2.73041 15.3496 3.19749C15.7683 3.66457 16.2883 4.01842 16.8683 4.22833C17.1008 4.31167 17.3333 4.375 17.5775 4.41417C17.1875 3.03333 16.1146 1.79167 14.4725 1.02083C14.5933 1.57611 14.5933 2.15196 14.4725 2.70724C14.3517 3.26252 14.1132 3.78131 13.7759 4.22335C13.4386 4.66539 13.0104 5.02002 12.5232 5.26266C12.036 5.5053 11.5022 5.63013 10.9608 5.625C10.4193 5.61987 9.88633 5.49239 9.40128 5.24727C8.91622 5.00215 8.49043 4.64531 8.15639 4.20152C7.82236 3.75772 7.58791 3.23778 7.47124 2.68201C7.35458 2.12624 7.35899 1.55059 7.4842 0.997167C6.66503 1.41117 5.96319 2.01984 5.45112 2.76919C4.93906 3.51854 4.63466 4.38382 4.57083 5.28583C5.30286 5.16308 6.05913 5.24744 6.7516 5.52956C7.44407 5.81169 8.04797 6.2809 8.49417 6.88583C9.20583 7.79667 9.33333 9.03833 9.09917 10C9.7775 10.0992 10.4167 9.94 10.8733 9.59083C11.6058 9.03833 12.1792 8.225 12.1792 7.02917C12.1792 5.83333 11.3117 4.9225 10.115 4.9225C9.33917 4.92417 8.6017 5.24634 8.06417 5.8125C7.54083 5.32083 7.175 4.69 6.9875 3.9725C6.53417 4.29583 6.15 4.70417 5.85583 5.16917C6.22271 5.3015 6.55483 5.50683 6.8358 5.7708C7.11677 6.03476 7.3415 6.35186 7.4968 6.70389C7.65209 7.05592 7.73469 7.43598 7.74009 7.82115C7.74548 8.20631 7.67359 8.58868 7.52833 8.94417C8.25567 9.05083 8.99897 8.97338 9.68323 8.7188C10.3675 8.46422 10.9705 8.04276 11.4292 7.49417C11.7233 7.12667 12.0408 6.68 12.0408 6.14417C12.0408 5.5025 11.655 4.96667 11.0833 4.96667C10.78 4.96667 10.5125 5.11833 10.3392 5.355C10.2217 5.18667 10.115 5.03083 10.0317 4.85083C10.5542 4.75167 11.1125 4.80833 11.5792 5.09417C11.7433 4.3925 12.0758 3.745 12.5417 3.21917C13.2533 3.73417 13.7567 4.44583 13.9767 5.25C14.2792 4.6675 14.3825 4.00583 14.2442 3.33833C14.9208 3.795 15.5042 4.375 15.9475 5.0225C16.05 4.88333 16.1583 4.655 16.275 4.375V5.44083Z"
              fill="#000000"
            />
          </svg>
          <div className="self-stretch my-auto w-[100px]">
            <p className="text-xs leading-tight text-neutral-600">
              Download on the
            </p>
            <p className="text-base font-medium text-zinc-900">App Store</p>
          </div>
        </a>
        <a href="#" className="flex gap-1.5 items-center p-2.5 bg-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          >
            <path
              d="M4.77736 1.12132L13.6573 9.99485L4.77736 18.8684C4.0515 18.3763 3.42456 17.7493 2.93237 17.0234C2.44019 16.2976 2.09147 15.4876 1.90458 14.6331C1.71769 13.7787 1.69682 12.8987 1.84332 12.0361C1.98982 11.1736 2.3008 10.3499 2.76095 9.60429C3.22111 8.85871 3.82082 8.207 4.52658 7.68713C5.23234 7.16725 6.03066 6.78902 6.87984 6.57343C7.72903 6.35784 8.61034 6.30928 9.47695 6.4307C10.3436 6.55212 11.1766 6.84077 11.9292 7.27902L4.77736 1.12132Z"
              fill="#EA4335"
            />
            <path
              d="M4.77736 1.12132L11.9292 7.27902C12.6818 6.84077 13.5148 6.55212 14.3814 6.4307C15.248 6.30928 16.1293 6.35784 16.9785 6.57343C17.8277 6.78902 18.626 7.16725 19.3318 7.68713C20.0375 8.207 20.6372 8.85871 21.0974 9.60429C21.5576 10.3499 21.8685 11.1736 22.015 12.0361C22.1615 12.8987 22.1407 13.7787 21.9538 14.6331C21.7669 15.4876 21.4182 16.2976 20.926 17.0234C20.4338 17.7493 19.8068 18.3763 19.081 18.8684L11.9292 12.7105L4.77736 18.8684V1.12132Z"
              fill="#FBBC05"
            />
            <path
              d="M19.081 18.8684L11.9292 12.7105L13.6573 9.99485L19.081 5.12132C19.8068 5.6134 20.4338 6.24034 20.926 6.96619C21.4182 7.69205 21.7669 8.50202 21.9538 9.35649C22.1407 10.2109 22.1615 11.091 22.015 11.9535C21.8685 12.8161 21.5576 13.6397 21.0974 14.3853C20.6372 15.1309 20.0375 15.7826 19.3318 16.3025C18.626 16.8224 17.8277 17.2006 16.9785 17.4162C16.1293 17.6318 15.248 17.6803 14.3814 17.5589C13.5148 17.4375 12.6818 17.1488 11.9292 16.7105L19.081 18.8684Z"
              fill="#34A853"
            />
            <path
              d="M19.081 5.12132L11.9292 12.7105L4.77736 5.12132C5.52324 4.62921 6.35118 4.28051 7.22395 4.09364C8.09672 3.90677 8.99561 3.88595 9.87555 4.03251C10.7555 4.17907 11.5957 4.49008 12.3557 4.95028C13.1158 5.41047 13.7796 6.01021 14.3099 6.71598L19.081 5.12132Z"
              fill="#4285F4"
            />
          </svg>
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
