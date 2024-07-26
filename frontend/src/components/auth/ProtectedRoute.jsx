import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";
const ProtectedRoute = ({ admin, children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // For pausing all actions that can cause a bug during fetching
  // isAuthenticated initial state will be false when fetching ,thus making it redirect to login page when reloading
  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;