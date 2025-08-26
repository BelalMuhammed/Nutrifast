import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../lib/storage";

export default function ProtectedRoute({ allowedRoles }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    // Not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Logged in but role not allowed → redirect (maybe home or 403 page)
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

