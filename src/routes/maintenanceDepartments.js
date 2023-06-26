import { lazy } from "react";

const maintenanceDepartments = [
  // Dashboards
  {
    exact: true,
    path: "/maintenanceDepartments",
    component: lazy(() => import("views/pages/maintenanceDepartments/MaintenanceDepartmentList")),
  },
];

export default maintenanceDepartments;
