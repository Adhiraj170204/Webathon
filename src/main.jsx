import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import AllCategories from "./pages/AllCategories.jsx";
import Shop from "./pages/Shop.jsx";
import WishlistPage from "./pages/Wishlist.jsx";
import CartPage from "./pages/Cart.jsx";
import BillingPage from "./pages/Billing.jsx";
import TrackPage from './pages/Track.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import SellerDashboard from './pages/seller/Dashboard.jsx';
import SellerProducts from './pages/seller/Products.jsx';
import SellerOrders from './pages/seller/Orders.jsx';
import SellerPromotions from './pages/seller/Promotions.jsx';
import SellerLogin from './pages/seller/Login.jsx';
import SellerRegister from './pages/seller/Register.jsx';
import Profile from './pages/Profile.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import AppProvider from './context/AppContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/allCategories",
        element: <AllCategories />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/wishlist",
        element: <WishlistPage />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/billing",
        element: <BillingPage />
      },
      { 
        path: "/track", 
        element: <TrackPage /> 
      },
      {
        path: "/product/:id",
        element: <ProductDetails />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/order-history",
        element: <OrderHistory />
      },
      {
        path: "/seller/login",
        element: <SellerLogin />
      },
      {
        path: "/seller/register",
        element: <SellerRegister />
      },
      {
        path: "/seller/dashboard",
        element: <SellerDashboard />
      },
      {
        path: "/seller/products",
        element: <SellerProducts />
      },
      {
        path: "/seller/orders",
        element: <SellerOrders />
      },
      {
        path: "/seller/promotions",
        element: <SellerPromotions />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <NotificationProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </NotificationProvider>
    </ErrorBoundary>
  </StrictMode>
);
