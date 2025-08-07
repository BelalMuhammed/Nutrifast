import React from "react";
import { Routes, Route } from "react-router-dom";
import LayOut from "../../Components/layout/LayOut";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import Home from "../../Pages/Home/Home";
import AdminDashboard from "../../Pages/AdminDashboard/AdminDashboard";
import Auth from "../../Pages/Auth/Auth";
import Cart from "../../Pages/Cart/Cart";
import Checkout from "../../Pages/Checkout/Checkout";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import NotFound from "../../Pages/NotFound/NotFound";
import ProductDetails from "../../Pages/ProductDetails/ProductDetails";
import Shop from "../../Pages/Shop/Shop";
import VendorDashboard from "../../Pages/VendorDashboard/VendorDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="Auth" element={<Auth />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="Checkout" element={<Checkout />} />
        <Route path="ProductDetails" element={<ProductDetails />} />
        <Route path="Auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="MyOrders" element={<MyOrders />} />
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="VendorDashboard" element={<VendorDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
