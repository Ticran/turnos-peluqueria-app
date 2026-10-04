import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { homeFor } from "../../utils/roles";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Rol equivocado para esta sección: lo mandamos a su propio panel
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={homeFor(user?.role)} replace />;
  }

  return children;
}
