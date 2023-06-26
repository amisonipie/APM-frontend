import { lazy } from "react";

const MedicalEquipmentRoutes = [
  // Dashboards
  {
    exact: true,
    path: "/equipments",
    component: lazy(() => import("views/pages/equipments/EquipmentList")),
  },
];

export default MedicalEquipmentRoutes;
