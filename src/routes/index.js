// ** Routes Imports
import HMCRoutes from "./hmcs";
import UserRoutes from "./users";
import SitesRoutes from "./sites";
import PagesRoutes from "./Pages";
import RegionRoutes from "./regions";
import DashboardRoutes from "./dashboard";
import WorkOrderRoutes from "./workOrders";
import equipmentRoutes from "./equipments";
import InventoryRoutes from "./inventories";
import SiteDepartmentsRoutes from "./siteDepartments";
import ManufacturerRoutes from "./manufacturers";
import OrganizationAdminRoutes from "./organizationAdmin";
import MaintenanceDepartmentsRoutes from "./maintenanceDepartments";

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...HMCRoutes,
  ...UserRoutes,
  ...SitesRoutes,
  ...RegionRoutes,
  ...InventoryRoutes,
  ...equipmentRoutes,
  ...WorkOrderRoutes,
  ...ManufacturerRoutes,
  ...SiteDepartmentsRoutes,
  ...OrganizationAdminRoutes,
  ...MaintenanceDepartmentsRoutes,
  ...PagesRoutes,
];

export { Routes };
