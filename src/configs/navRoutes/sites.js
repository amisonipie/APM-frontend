import { hospitalIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "sites",
    title: "Sites",
    icon: hospitalIcon,
    pageTitle: "Sites List",
    navLink: "/sites",
    type: "item",
    permissions: ["super_admin"],
  },
];
