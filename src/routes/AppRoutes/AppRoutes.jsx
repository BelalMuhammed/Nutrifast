// import AddProducts from "@/dashboard/pages/AddProducts";
// import Orders from "@/dashboard/pages/Orders";
// import Users from "@/dashboard/pages/Users";
// import VendorList from "@/dashboard/pages/VendorList";
// import VendorsApplications from "@/dashboard/pages/VendorsApplications";
// import Messages from "@/dashboard/pages/messages";
// import { lazy, Suspense } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "../../Components/layout/LayOut";
// import LoaderSpinner from "../../Components/shared/Loaders/Loader";
// import Login from "../../Pages/Auth/Login";
// import Register from "../../Pages/Auth/Register";
// import ResetPassword from "../../Pages/Auth/ResetPassword";
// import ContactUs from "../../Pages/ContactUs/ContactUs";
// import NotFound from "../../Pages/NotFound/NotFound";
// import Products from "../../dashboard/pages/Products";
// import ProtectedRoute from "../protectedRoute/ProtectedRoute";
// import AdminLogin from "@/Pages/Auth/AdminLogin";
// import ProductFilters from "@/dashboard/pages/ProductFilters";
// import TestDash from "@/Components/testDash";
// import EditProduct from "@/dashboard/pages/EditProduct";

// const Role = lazy(() => import("../../Pages/Auth/Role"));
// const Home = lazy(() => import("../../Pages/Home/Home"));
// const Shop = lazy(() => import("../../Pages/Shop/Shop"));
// const ProductDetails = lazy(() =>
//   import("../../Pages/ProductDetails/ProductDetails")
// );

// const Cart = lazy(() => import("../../Pages/Cart/Cart"));
// const Checkout = lazy(() => import("../../Pages/Checkout/Checkout"));
// const MyOrders = lazy(() => import("../../Pages/MyOrders/MyOrders"));
// const OrderDetails = lazy(() =>
//   import("../../Pages/orderDetails/OrderDetails")
// );

// const WishList = lazy(() => import("../../Pages/wishlist/WishList"));
// const MyProfile = lazy(() => import("../../Pages/MyProfile/MyProfile"));
// const VendorRegisteration = lazy(() =>
//   import("../../Pages/Auth/VendorRegistration")
// );

// // New dashboard pages
// const DashboardLayout = lazy(() => import("../../dashboard/DashboardLayout"));
// const Dashboard = lazy(() => import("../../dashboard/pages/Dashboard"));

// export default function AppRoutes() {
//   const routes = createBrowserRouter([
//     {
//       path: "",
//       element: (
//         <Suspense fallback={<LoaderSpinner />}>
//           <Layout />
//         </Suspense>
//       ),
//       children: [
//         {
//           index: true,
//           path: "/",
//           element: <Home />,
//         },

//         {
//           path: "reset-password",
//           element: <ResetPassword />,
//         },

//         {
//           path: "testTable",
//           element: <TestDash />,
//         },
//         {
//           path: "contact",
//           element: <ContactUs />,
//         },
//         {
//           path: "shop",
//           element: <Shop />,
//         },
//         {
//           path: "product/:id",
//           element: <ProductDetails />,
//         },
//         {
//           path: "checkout",
//           element: <Checkout />,
//         },
//         {
//           path: "cart",
//           element: <Cart />,
//         },
//         {
//           path: "wishList",
//           element: <WishList />,
//         },
//         {
//           path: "login",
//           element: <Login />,
//         },
//         {
//           path: "admin",
//           element: <AdminLogin />,
//         },
//         {
//           path: "choose-role",
//           element: <Role />,
//         },
//         {
//           path: "register",
//           element: <Register />,
//         },
//         {
//           path: "register/vendor",
//           element: <VendorRegisteration />,
//         },
//         {
//           element: <ProtectedRoute />,
//           children: [
//             {
//               path: "myProfile",
//               element: <MyProfile />,
//             },
//             {
//               path: "myOrders",
//               element: <MyOrders />,
//             },
//             {
//               path: "order/:id",
//               element: <OrderDetails />,
//             },
//           ],
//         },
//         {
//           path: "dashboard",
//           element: <DashboardLayout />,
//           children: [
//             { index: true, element: <Dashboard /> },
//             { path: "products", element: <Products /> },
//             { path: "orders", element: <Orders /> },
//             { path: "messages", element: <Messages /> },
//             { path: "addProducts", element: <AddProducts /> },
//             { path: "users", element: <Users /> },
//             { path: "vendorList", element: <VendorList /> },
//             { path: "vendorApplications", element: <VendorsApplications /> },
//             { path: "productsFilters", element: <ProductFilters /> },
//             { path: "EditProduct/:id", element: <EditProduct /> },
//           ],
//         },

//         {
//           path: "*",
//           element: <NotFound />,
//         },
//       ],
//     },
//   ]);
//   return <RouterProvider router={routes} />;
// }
import AddProducts from "@/dashboard/pages/AddProducts";
import Orders from "@/dashboard/pages/Orders";
import Users from "@/dashboard/pages/Users";
import VendorList from "@/dashboard/pages/VendorList";
import VendorsApplications from "@/dashboard/pages/VendorsApplications";
import Messages from "@/dashboard/pages/Messages";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../Components/layout/LayOut";
import LoaderSpinner from "../../Components/shared/Loaders/Loader";
import Login from "../../Pages/Auth/Login";
import Register from "../../Pages/Auth/Register";
import ResetPassword from "../../Pages/Auth/ResetPassword";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import NotFound from "../../Pages/NotFound/NotFound";
import Products from "../../dashboard/pages/Products";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import AdminLogin from "@/Pages/Auth/AdminLogin";
import ProductFilters from "@/dashboard/pages/ProductFilters";
import EditProduct from "@/dashboard/pages/EditProduct";

const Role = lazy(() => import("../../Pages/Auth/Role"));
const Home = lazy(() => import("../../Pages/Home/Home"));
const Shop = lazy(() => import("../../Pages/Shop/Shop"));
const ProductDetails = lazy(() =>
  import("../../Pages/ProductDetails/ProductDetails")
);

const Cart = lazy(() => import("../../Pages/Cart/Cart"));
const Checkout = lazy(() => import("../../Pages/Checkout/Checkout"));
const MyOrders = lazy(() => import("../../Pages/MyOrders/MyOrders"));
const OrderDetails = lazy(() =>
  import("../../Pages/orderDetails/OrderDetails")
);

const WishList = lazy(() => import("../../Pages/wishlist/WishList"));
const MyProfile = lazy(() => import("../../Pages/MyProfile/MyProfile"));
const VendorRegisteration = lazy(() =>
  import("../../Pages/Auth/VendorRegistration")
);

// New dashboard pages
const DashboardLayout = lazy(() => import("../../dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("../../dashboard/pages/Dashboard"));

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

        { path: "reset-password", element: <ResetPassword /> },
        { path: "contact", element: <ContactUs /> },
        { path: "shop", element: <Shop /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "cart", element: <Cart /> },
        { path: "wishList", element: <WishList /> },
        { path: "login", element: <Login /> },
        { path: "admin", element: <AdminLogin /> },
        { path: "choose-role", element: <Role /> },
        { path: "register", element: <Register /> },
        { path: "register/vendor", element: <VendorRegisteration /> },

        // 🔒 Protected user routes
        {
          element: <ProtectedRoute allowedRoles={["user", "vendor", "admin"]} />,
          children: [
            { path: "myProfile", element: <MyProfile /> },
            { path: "myOrders", element: <MyOrders /> },
            { path: "order/:id", element: <OrderDetails /> },
          ],
        },

        // 🔒 Protected admin dashboard
        {
          path: "dashboard",
          element: <ProtectedRoute allowedRoles={["admin"]} />,
          children: [
            {
              element: <DashboardLayout />,
              children: [
                { index: true, element: <Dashboard /> },
                { path: "products", element: <Products /> },
                { path: "orders", element: <Orders /> },
                { path: "messages", element: <Messages /> },
                { path: "addProducts", element: <AddProducts /> },
                { path: "users", element: <Users /> },
                { path: "vendorList", element: <VendorList /> },
                { path: "vendorApplications", element: <VendorsApplications /> },
                { path: "productsFilters", element: <ProductFilters /> },
                { path: "EditProduct/:id", element: <EditProduct /> },
              ],
            },
          ],
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
