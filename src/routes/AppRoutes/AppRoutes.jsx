
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
import AboutUs from "../../Pages/AboutUs/AboutUs";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import Products from "../../dashboard/pages/Products";
import Orders from "@/dashboard/pages/Orders";

const Role = lazy(() => import("../../Pages/role/Role"));
const Home = lazy(() => import("../../Pages/Home/Home"));
const Shop = lazy(() => import("../../Pages/Shop/Shop"));
const ProductDetails = lazy(() =>
  import("../../Pages/ProductDetails/ProductDetails")
);

const Cart = lazy(() => import("../../Pages/Cart/Cart"));
const Checkout = lazy(() => import("../../Pages/Checkout/Checkout"));
const MyOrders = lazy(() => import("../../Pages/MyOrders/MyOrders"));

const WishList = lazy(() => import("../../Pages/wishlist/WishList"));
const VendorRegisteration = lazy(() =>
  import("../../Pages/vindorRegisteration/VendorRegistration")
);
const SearchPage = lazy(() => import("../../Pages/search/SearchPage"));

// New dashboard pages
const DashboardLayout = lazy(() => import("../../dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("../../dashboard/pages/Dashboard"));
// const Users = lazy(() => import("../../dashboard/pages/Users"));
// const Orders = lazy(() => import("../../dashboard/pages/Orders"));
// const Settings = lazy(() => import("../../dashboard/pages/Settings"));

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
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "search",
          element: <SearchPage />,
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
        // {
        //   element: <ProtectedRoute />,
        //   children: [
        //     {
        //       path: "myOrders",
        //       element: <MyOrders />,
        //     },
        //     // {
        //     //   path: "vendorDashboard",
        //     //   element: <VendorDashboard />,
        //     // },

        //     // ✅ New protected dashboard routes
        //     {
        //       path: "dashboard",
        //       element: <DashboardLayout />,
        //       children: [
        //         { index: true, element: <Dashboard /> },
        //         // { path: "users", element: <Users /> },
        //         // { path: "orders", element: <Orders /> },
        //         // { path: "settings", element: <Settings /> },
        //       ],
        //     },
        //   ],
        // },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "products", element: <Products /> },
             { path: "orders", element: <Orders /> },
            // { path: "users", element: <Users /> },
            // { path: "orders", element: <Orders /> },
            // { path: "settings", element: <Settings /> },
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