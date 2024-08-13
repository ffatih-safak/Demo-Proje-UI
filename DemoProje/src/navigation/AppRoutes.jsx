import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
  import React from "react";
  import UnAuthorizedRoute from "./UnAuthorizedRoute";
  import Login from "../pages/Login";
  import Register from "../pages/Register";
  import DefaultLayout from "../layout/DefaultLayout";
  const AppRoutes = () => {
    return (
          <Routes>
            <Route
              path="/login"
              element={
                <UnAuthorizedRoute>
                  <Login />
                </UnAuthorizedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <UnAuthorizedRoute>
                  <Register />
                </UnAuthorizedRoute>
              }
            />
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
  
    );
  };
  export default AppRoutes;