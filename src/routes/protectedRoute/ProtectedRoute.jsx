import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return currentUser ? <Outlet /> : <Navigate to="/Auth" />;
}
