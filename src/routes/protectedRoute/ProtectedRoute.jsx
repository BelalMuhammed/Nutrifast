import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../lib/storage";

export default function ProtectedRoute() {
  const currentUser = getCurrentUser();

  return currentUser ? <Outlet /> : <Navigate to='/Auth' />;
}
