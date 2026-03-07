

import React from "react";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

 
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
