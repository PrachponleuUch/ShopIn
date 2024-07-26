import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
// import ListProducts from "../admin/ListProducts";
// import NewProduct from "../admin/NewProduct";
// import UpdateProduct from "../admin/UpdateProduct";
// import UploadImages from "../admin/UploadImages";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;