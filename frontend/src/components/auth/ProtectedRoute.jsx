import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { homeFor } from "../../utils/roles";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Rol equivocado para esta sección: lo mandamos a su propio panel
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={homeFor(user?.role)} replace />;
  }

  return children;
}
