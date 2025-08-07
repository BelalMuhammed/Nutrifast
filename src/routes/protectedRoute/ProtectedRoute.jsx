import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const currentUser = JSON.parce(localStorage.getItem("currentUser"));

  return currentUser ? <Outlet /> : <Navigate to="/Auth" />;
}
