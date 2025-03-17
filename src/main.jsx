import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import PopularCategories from "./assets/components/home/PopularCategory.jsx";
import BannerAd from "./assets/components/home/BannerAd.jsx";
import HotDeals from "./assets/components/Deals/HotDeals.jsx";
import PopularProducts from "./assets/components/PopularProducts/PopularProducts.jsx";
import NewProducts from "./assets/components/NewProduct/NewProducts.jsx";
import DiscountBanner from "./assets/components/DiscountBanner/DiscountBanner.jsx";
import TopDeals from "./assets/components/TopDeals/TopDeals.jsx";
import WishlistPage from "./assets/components/Wishlist/WishlistPage.jsx";

let router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: [
          <PopularCategories />,
          <PopularProducts />,
          <NewProducts />,
          <BannerAd />,
          <HotDeals />,
        ],
      },
      {
        path: "/allCategories",
        element: [
          <PopularCategories />,
          <PopularProducts />,
          <NewProducts />,
          <TopDeals />,
          <NewProducts />,
          <DiscountBanner />,
          <HotDeals />,
        ],
      },
      {
        path: "/shop",
        element: [<NewProducts />, <DiscountBanner />, <HotDeals />],
      },
      {
        path: "/wishlist",
        element: [
          <WishlistPage />,
          <NewProducts />,
          <DiscountBanner />,
          <HotDeals />,
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
