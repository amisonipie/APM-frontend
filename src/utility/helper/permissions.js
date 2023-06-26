// Inventory
export const createInventory = "inventory_create";
export const deleteInventory = "inventory_delete";
export const viewInventory = "inventory_view";
export const updateInventory = "inventory_update";
export const approveInventory = "inventory_approve";
export const updateInventoryPlanning = "inventory_planning_update";
export const inventoryViewMedical = "inventory_view_medical";
export const inventoryViewNonMedical = "inventory_view_nonmedical";
export const inventoryViewMedicalNonMedical = "inventory_view_medical_nonmedical";
export const inventoryExport = "inventory_export";

// User
export const viewUser = "user_view";
export const createUser = "user_create";
export const deleteUser = "user_delete";
export const editUser = "user_edit";
export const activateUser = "activate_edit";
export const userViewMedical = "user_view_medical";
export const userViewNonMedical = "user_view_nonmedical";
export const userViewMedicalNonMedical = "user_view_medical_nonmedical";

// Region
export const viewRegion = "region_view";
export const createRegion = "region_create";
export const deleteRegion = "region_delete";
export const editRegion = "region_edit";

// Manufacturer
export const viewManufacturer = "manufacturer_view";
export const createManufacturer = "manufacturer_create";
export const deleteManufacturer = "manufacturer_delete";
export const editManufacturer = "manufacturer_edit";

// Equipment
export const viewEquipment = "equipment_view";
export const createEquipment = "equipment_create";
export const deleteEquipment = "equipment_delete";
export const editEquipment = "equipment_edit";

// Site
export const viewSite = "site_view";
export const createSite = "site_create";
export const deleteSite = "site_delete";
export const editSite = "site_edit";

// Site Departments
export const viewSiteDepartment = "siteDepartment_view";
export const createSiteDepartment = "siteDepartment_create";
export const deleteSiteDepartment = "siteDepartment_delete";
export const editSiteDepartment = "siteDepartment_edit";

// Maintenance Departments
export const viewMaintenanceDepartment = "maintenance_department_view";
export const createMaintenanceDepartment = "maintenance_department_create";
export const deleteMaintenanceDepartment = "maintenance_department_delete";
export const editMaintenanceDepartment = "maintenance_department_edit";

// OrganizationAdmins
export const viewOrganizationAdmin = "organization_admin_view";
export const createOrganizationAdmin = "organization_admin_create";
export const deleteOrganizationAdmin = "organization_admin_delete";
export const editOrganizationAdmin = "organization_admin_edit";

// HMC
export const viewHMC = "hmc_view";
export const createHMC = "hmc_create";
export const deleteHMC = "hmc_delete";
export const editHMC = "hmc_edit";

// Workorder
export const createWorkorder = "create_workorder";
export const createWorkorderMedical = "workorder_create_medical";
export const createWorkorderNonMedical = "workorder_create_nonmedical";
export const workorderViewMedical = "workorder_view_medical";
export const workorderViewNonMedical = "workorder_view_nonmedical";
export const workorderViewMedicalNonMedical = "workorder_view_medical_nonmedical";

// DASHBOARD
export const dashboardViewMedical = "dashboard_view_medical";
export const dashboardViewNonMedical = "dashboard_view_nonmedical";
export const dashboardViewMedicalNonMedical = "dashboard_view_medical_nonmedical";

const super_admin_restricted_permissions = [
  createWorkorderMedical,
  createWorkorderNonMedical,
];

export const canDo = (user, actionToPerform) => {
  let isAuthorized = false;
  const isSuperAdmin = user?.role === "super_admin";
  const caseArr = actionToPerform instanceof Array ? actionToPerform : [actionToPerform];

  if (isSuperAdmin) {
    isAuthorized = !caseArr?.some((r) => super_admin_restricted_permissions?.includes(r));
  } else {
    isAuthorized = user?.permissions?.some((r) => caseArr?.includes(r));
  }

  return isAuthorized;
};
