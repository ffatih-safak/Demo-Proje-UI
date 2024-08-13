import React from "react";


const Configuration = React.lazy(() => import("../pages/Configuration"));

const routes = [
  { path: "/configuration", name: "configuration", element: Configuration },
];

export const findRoute = (routeName) => {
  return routes.find((d) => d.name == routeName);
};
export default routes;
