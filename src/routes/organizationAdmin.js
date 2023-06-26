import { lazy } from "react";

const OrganizationAdminRoutes = [
  // OrganizationAdmin
  {
    exact: true,
    path: "/organization-admin",
    component: lazy(() => import("views/pages/organizationAdmin/OrganizationAdminList")),
  },
];

export default OrganizationAdminRoutes;
