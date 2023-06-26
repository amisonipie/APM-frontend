import { lazy } from "react";

const InventoryRoutes = [
  // Dashboards
  {
    exact: true,
    path: "/inventories",
    component: lazy(() => import("views/pages/inventories/InventoryList")),
  },
  {
    exact: true,
    path: "/inventories-upcoming",
    component: lazy(() => import("views/pages/inventories/InventoryListUpcoming")),
  },

  {
    exact: true,
    path: "/inventories/work-order-create/:inventoryId",
    // component: lazy(() => import("views/pages/workOrders/WorkorderCreate")),
    component: lazy(() => import("views/pages/inventories/InventoryList")),
    // fullLayout: true,
  },

  {
    exact: true,
    path: "/inventories/planning",
    component: lazy(() => import("views/pages/inventoryPlanning/InventoryPlanningList")),
  },

  {
    exact: true,
    path: "/inventories/pm-calender",
    component: lazy(() => import("views/pages/inventories/PMCalender")),
  },
];

export default InventoryRoutes;
