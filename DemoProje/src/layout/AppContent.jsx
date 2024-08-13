import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../navigation/Routes.jsx";
import PrivateRoute from "../navigation/PrivateRoute";
import BackDrop from "../components/BackDrop.jsx";

const AppContent = () => {
  return (

      <Suspense  fallback={<BackDrop/>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <route.element />
                    </PrivateRoute>
                  }
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="configuration" replace />} />
        </Routes>
      </Suspense>
  );
};

export default React.memo(AppContent);
