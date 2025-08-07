import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

// Lazy loaded pages
const Home = lazy(() => import("./Pages/Home/Home"));
const Shop = lazy(() => import("./Pages/Shop/Shop"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails/ProductDetails"));
const Auth = lazy(() => import("./Pages/Auth/Auth"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
const VendorDashboard = lazy(() => import("./Pages/VendorDashboard/VendorDashboard"));
const MyOrders = lazy(() => import("./Pages/MyOrders/MyOrders"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard/AdminDashboard"));

// Regular imports
import Layout from "./Components/layout/LayOut";
import ProtectedRoute from "./routes/protectedRoute/ProtectedRoute";
import { Spinner } from "flowbite-react";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "myOrders", element: <MyOrders /> },
        { path: "vendorDashboard", element: <VendorDashboard /> },
        { path: "adminDashboard", element: <AdminDashboard /> },
        { path: "cart", element: <Cart /> },
        { path: "auth", element: <Auth /> },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Spinner/>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
