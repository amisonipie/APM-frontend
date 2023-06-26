import { lazy } from "react";

const WorkOrderRoutes = [
  {
    path: "/work-orders/list",
    exact: true,
    component: lazy(() => import("views/pages/workOrders/WorkOrderList")),
  },
  {
    exact: true,
    path: "/work-orders/list/corrective",
    component: lazy(() => import("views/pages/workOrders/WorkOrderList")),
  },
  {
    exact: true,
    path: "/work-orders/list/preventive",
    component: lazy(() => import("views/pages/workOrders/WorkOrderList")),
  },
  {
    exact: true,
    path: "/work-orders/list/overdue",
    component: lazy(() => import("views/pages/workOrders/WorkOrderList")),
  },
  {
    path: "/work-orders/list/:workOrderId",
    component: lazy(() => import("views/pages/workOrders/WorkOrderDetail")),
  },
];

export default WorkOrderRoutes;
