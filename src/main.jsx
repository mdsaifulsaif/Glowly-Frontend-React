import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        {/* ToastContainer-ke ekbare top-e rakho */}
        <ToastContainer position="top-right" autoClose={3000} />
        <RootLayout />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
