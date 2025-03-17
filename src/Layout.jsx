import React from "react";
import { Outlet } from "react-router";
import Header from "./assets/components/header/Header";
import Footer from "./assets/components/footer/Footer";
import FeatureCard from "./assets/components/footer/FeatureCard";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <FeatureCard />
      <Footer />
    </>
  );
}

export default Layout;
