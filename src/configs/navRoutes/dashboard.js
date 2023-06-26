import { dashboardIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    pageTitle: "Dashboard",
    icon: dashboardIcon,
    // type: "collapse",
    navLink: "/",
    type: "item",
    permissions: [
      "super_admin",
      "site_admin",
      "organization_admin",
      "staff",
      "engineer",
      "hmc_admin",
      "hmc_supervisor",
      "hmc_technician",
      "qa",
      "helpdesk",
      "call_center",
    ],
    // children: [
    //   {
    //     id: "dashboardAssets",
    //     title: "Assets",
    //     icon: <FiCircle size={12} />,
    //     navLink: "/dashboards/add",
    //     type: "item",
    //     permissions: [
    //       "admin_hmc",
    //       "site_admin",
    //       "agent",
    //       "super_admin",
    //       "technician",
    //     ],
    //   },
    //   {
    //     id: "dashboardList",
    //     title: "List",
    //     icon: <FiCircle size={12} />,
    //     navLink: "/dashboards",
    //     type: "item",
    //     permissions: [
    //       "admin_hmc",
    //       "site_admin",
    //       "agent",
    //       "super_admin",
    //       "technician",
    //     ],
    //   },
    // ],
  },
];
