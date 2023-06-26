import { MaintenanceDepartmentIcon } from "assets/icons";

export default [
  {
    id: "maintenanceDepartment",
    title: "Maintenance Department",
    icon: MaintenanceDepartmentIcon,
    pageTitle: "Maintenance Department",
    navLink: "/maintenanceDepartments",
    type: "item",
    permissions: [
      "super_admin",
      "site_admin",
      "organization_admin",
      "engineer",
      "hmc_admin",
      "hmc_supervisor",
      "hmc_technician",
      "qa",
      "helpdesk",
    ],
  },
];
