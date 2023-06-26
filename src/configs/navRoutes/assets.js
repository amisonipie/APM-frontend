import { assetsIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "assets",
    title: "Assets",
    icon: assetsIcon,
    // navLink:assets",
    navLink: "#",
    type: "item",
    permissions: [
      "super_admin",
      "site_admin",
      "staff",
      "engineer",
      "hmc_admin",
      "hmc_supervisor",
      "hmc_technician",
      "qa",
      "helpdesk",
    ],
  },
];
