import { lazy } from "react";

const UserRoutes = [
  // Dashboards
  {
    exact: true,
    path: "/users",
    component: lazy(() => import("views/pages/users/UserList")),
  },
];

export default UserRoutes;
