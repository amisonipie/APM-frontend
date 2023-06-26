import { siteDepartmentIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "siteDepartments",
    title: "Site Departments",
    icon: siteDepartmentIcon,
    pageTitle: "Site Departments List",
    navLink: "/siteDepartments",
    type: "item",
    permissions: ["super_admin", "site_admin"],
  },
];
