import { lazy } from "react";

const PagesRoutes = [
  {
    path: "/login",
    component: lazy(() => import("views/pages/authentication/Login")),
    authLayout: true,
    // fullLayout: true,
  },
  {
    path: "/forgot-password",
    component: lazy(() => import("views/pages/authentication/ForgotPassword")),
    authLayout: true,
    exact: true,
    // fullLayout: true,
  },
  {
    path: "/reset-password",
    component: lazy(() => import("views/pages/authentication/ResetPassword")),
    authLayout: true,
    exact: true,
    // fullLayout: true,
  },
  {
    path: "/reset-password/:token/:email",
    component: lazy(() => import("views/pages/authentication/ResetPassword")),
    authLayout: true,
    // fullLayout: true,
  },

  {
    path: "",
    component: lazy(() => import("views/pages/notFound")),
    fullLayout: true,
  },
];

export default PagesRoutes;
