import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  
  const { loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    <Navigate to="/" replace />
    return loginWithRedirect();
  }

  return children;
};

export default ProtectedRoute