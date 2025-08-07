import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Auth from "./Pages/Auth/Auth";
import Layout from "./Components/layout/LayOut";
import Cart from "./Pages/Cart/Cart";
import ProtectedRoute from "./routes/protectedRoute/ProtectedRoute";
import Checkout from "./Pages/Checkout/Checkout";
import VendorDashboard from "./Pages/VendorDashboard/VendorDashboard";
import MyOrders from "./Pages/MyOrders/MyOrders";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

function App() {
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
          path: "checkout",
          element: <Checkout />,
        },
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
        {
          path:"cart",
          element: (
              <Cart/>
          ),
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
