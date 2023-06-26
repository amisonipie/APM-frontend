import { lazy } from "react";

const ManufacturerRoutes = [
  // Dashboards
  {
    exact: true,
    path: "/manufacturers",
    component: lazy(() => import("views/pages/manufacturers/ManufacturerList")),
  },
];

export default ManufacturerRoutes;
