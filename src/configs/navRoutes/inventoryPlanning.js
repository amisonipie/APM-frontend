import { assetPlanningIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "inventoryPlanning",
    title: "Asset Planning",
    icon: assetPlanningIcon,
    pageTitle: "Asset Planning",
    navLink: "/inventories/planning",
    type: "item",
    permissions: ["super_admin"],
  },
];
