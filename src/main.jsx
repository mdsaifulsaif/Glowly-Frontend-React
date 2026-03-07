import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* 1. Toaster-কে RouterProvider এর বাইরে এবং উপরে রাখো */}
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}>
        <ToastContainer position="top-right" autoClose={3000} />
        <RootLayout />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
