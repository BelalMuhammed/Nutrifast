import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoaderSpinner from "../../Components/shared/Loaders/Loader";
import Layout from "../../Components/layout/LayOut";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import NotFound from "../../Pages/NotFound/NotFound";
import Login from "../../Pages/Auth/Login";
import Register from "../../Pages/Auth/Register";
import VendorRegistration from "../../Pages/vindorRegisteration/VendorRegistration";

const Role = lazy(() => import("../../Pages/role/Role"));

const Home = lazy(() => import("../../Pages/Home/Home"));
const Shop = lazy(() => import("../../Pages/Shop/Shop"));
const ProductDetails = lazy(() =>
  import("../../Pages/ProductDetails/ProductDetails")
);
const Auth = lazy(() => import("../../Pages/Auth/Auth"));
const Cart = lazy(() => import("../../Pages/Cart/Cart"));
const Checkout = lazy(() => import("../../Pages/Checkout/Checkout"));
const MyOrders = lazy(() => import("../../Pages/MyOrders/MyOrders"));
const AdminDashboard = lazy(() =>
  import("../../Pages/AdminDashboard/AdminDashboard")
);

const WishList = lazy(() => import("../../Pages/wishlist/WishList"));
const VendorRegisteration = lazy(() =>
  import("../../Pages/vindorRegisteration/VendorRegistration")
);

export default function AppRoutes() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense fallback={<LoaderSpinner />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: "/",
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
          path: "wishList",
          element: <WishList />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "choose-role",
          element: <Role />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "vendorRegisteration",
          element: <VendorRegisteration />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "myOrders",
              element: <MyOrders />,
            },
            // {
            //   path: "vendorDashboard",
            //   element: <VendorDashboard />,
            // },
            {
              path: "adminDashboard",
              element: <AdminDashboard />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
