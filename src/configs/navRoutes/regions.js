import { regionsIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "regions",
    title: "Regions",
    icon: regionsIcon,
    pageTitle: "Regions List",
    navLink: "/regions",
    type: "item",
    permissions: ["super_admin"],
  },
];
