import { lazy } from "react";

const HMCRoutes = [
  {
    exact: true,
    path: "/hmcs",
    component: lazy(() => import("views/pages/hmcs/HMCList")),
  },
];

export default HMCRoutes;
