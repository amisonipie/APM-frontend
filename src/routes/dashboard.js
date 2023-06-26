import { lazy } from "react";

const DashboardRoutes = [
  // Dashboards
  {
    exact: true,
    path: "/",
    component: lazy(() => import("views/pages/dashboard")),
  },
  {
    exact: true,
    path: "/comparison/:comparisonID",
    component: lazy(() => import("views/pages/dashboard")),
  },
  // {
  //   exact: true,
  //   path: "/dashboarassets",
  //   component: lazy(() => import("views/pages/dashboarassets")),
  // },
  // {
  //   path: "/dashboards/kpis",
  //   component: lazy(() => import("views/pages/dashboards/kpis")),
  // },
  // {
  //   path: "/dashboards/map",
  //   component: lazy(() => import("views/pages/dashboards/map")),
  // },
];

export default DashboardRoutes;
