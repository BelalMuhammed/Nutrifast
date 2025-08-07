import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Shop from "../../Pages/Shop/Shop";
import ProductDetails from "../../Pages/ProductDetails/ProductDetails";
import Auth from "../../Pages/Auth/Auth";
import Layout from "../../Components/layout/LayOut";
import Cart from "../../Pages/Cart/Cart";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import Checkout from "../../Pages/Checkout/Checkout";
import VendorDashboard from "../../Pages/VendorDashboard/VendorDashboard";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import AdminDashboard from "../../Pages/AdminDashboard/AdminDashboard";
export default function AppRoutes() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },

        {
          path: "checkout",
          element: <Checkout />,
        },

        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "myOrders",
              element: <MyOrders />,
            },
            {
              path: "vendorDashboard",
              element: <VendorDashboard />,
            },
            {
              path: "adminDashboard",
              element: <AdminDashboard />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
