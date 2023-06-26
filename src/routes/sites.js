import { lazy } from "react";

const SiteRoutes = [
  {
    exact: true,
    path: "/sites",
    component: lazy(() => import("views/pages/sites/SiteList")),
  },
];

export default SiteRoutes;
