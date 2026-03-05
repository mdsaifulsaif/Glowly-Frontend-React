import React from "react";
import { Outlet } from "react-router";
import Navber from "../components/shared/Navber";
import Footer from "../components/shared/Footer";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <main>
      <Navber />
      <Outlet />
      <ToastContainer position="top-right" />
      <Footer />
    </main>
  );
}

export default RootLayout;
