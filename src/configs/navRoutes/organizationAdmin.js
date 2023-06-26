import { organizationsIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "organizationAdmin",
    title: "Organizations",
    icon: organizationsIcon,
    pageTitle: "Organization Admins",
    navLink: "/organization-admin",
    type: "item",
    permissions: ["super_admin"],
  },
];
