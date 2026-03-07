import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Register from "../pages/register";
import Login from "../pages/login";
import About from "../pages/About";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactUsPage from "../pages/ContactUsPage";
import MyAccountPage from "../pages/MyAccountPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardOverview from "../dasboardPages/DashboardOverview";
import ProductPage from "../dasboardPages/ProductPage";
import OrderPage from "../dasboardPages/OrderPage";
import NotFound from "../components/NotFound";
import OrderDetails from "../components/OrderDetails";
import CategoryPage from "../dasboardPages/CategoryPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/Product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: <ContactUsPage />,
      },
      {
        path: "/my-account",
        element: (
          <ProtectedRoute>
            <MyAccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
