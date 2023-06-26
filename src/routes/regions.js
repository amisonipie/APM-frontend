import { lazy } from "react";

const RegionRoutes = [
  {
    exact: true,
    path: "/regions",
    component: lazy(() => import("views/pages/regions/RegionList")),
  },
];

export default RegionRoutes;
