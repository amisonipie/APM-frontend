import { equipmentAssetsIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "equipment",
    title: "Assets",
    icon: equipmentAssetsIcon,
    pageTitle: "Assets List",
    navLink: "/equipments",
    type: "item",
    permissions: ["super_admin"],
  },
];
