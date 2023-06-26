// ** Navigation sections imports

import hmcs from "./hmcs";
import users from "./users";
import sites from "./sites";
import regions from "./regions";
import dashboard from "./dashboard";
import workOrders from "./workOrders";
import equipments from "./equipments";
import inventories from "./inventories";
import manufacturers from "./manufacturers";
import siteDepartments from "./siteDepartments";
import organizationAdmin from "./organizationAdmin";
import inventoryPlanning from "./inventoryPlanning";
import maintenanceDepartment from "./maintenanceDepartment";

// ** Merge & Export
export default [
  ...dashboard,
  ...workOrders,
  ...users,
  ...inventories,
  ...inventoryPlanning,
  ...equipments,
  ...regions,
  ...sites,
  ...siteDepartments,
  ...maintenanceDepartment,
  ...hmcs,
  ...manufacturers,
  ...organizationAdmin,
];
