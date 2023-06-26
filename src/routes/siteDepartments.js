import { lazy } from "react";

const siteDepartments = [
  // Dashboards
  {
    exact: true,
    path: "/siteDepartments",
    component: lazy(() => import("views/pages/siteDepartments/DepartmentList")),
  },
];

export default siteDepartments;
