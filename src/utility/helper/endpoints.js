// work orders
export const getAllWorkOrders = "/workorders";
export const workOrderDetail = "/workorders/show";
export const workOrderAssignSupervisor = "/workorders/step/assignSupervisor";
export const workOrderConfirmSupervisor = "/workorders/step/confirmSupervisor";
export const workOrderAssignTechnician = "/workorders/step/assignTechnician";
export const workOrderConfirmTechnician = "/workorders/step/confirmTechnician";
export const workOrderResolveTechnician = "/workorders/step/resolveTechnician";
export const workOrderResolveTechnicianAsDraft = "/workorders/step/resolveTechnician/draft";
export const workOrderApprovalSupervisor = "/workorders/step/approvalSupervisor";

export const workOrderRating = "/workorders/rating";
export const workOrderApprovalQA = "/workorders/step/approvalQA";
export const workOrderApprovalRequestor = "/workorders/step/approvalRequestor";
export const workOrderCreate = "/workorders/create";
export const getTechnicianFormOptions = "/workorders/technician/form";
export const exportWorkOrderPDF = "workorders/export/pdf";

// Dashboard

export const getDashboardOverview = "/dashboard/overview";
export const getDashboardWorkorderOverview = "/dashboard/overview/workOrder";
export const getMapData = "/dashboard/geomap";
export const getMapFormOptions = "/dashboard/geomap/formOptions";
export const inventoryAnalytics = "/dashboard/inventoryAnalytics";
export const generalExcelImport = "/excel/import/generalImport";
export const getImportLogsUrl = "/import/log";

// Auth
export const signIn = "/login";
export const forgotPassword = "/password/email";
export const resetPasswordUA = "/password/reset";
export const resetPassword = "/users/setPassword";

// users
export const getAllUsers = "/users";
export const getUser = "/users/show";
export const updateUser = "/users/update";
export const createUser = "/users/create";
export const activateUsers = "/users/active";
export const userSubRoles = "/users/create/subroles";

// Inventories
export const createInventory = "/inventories";
export const getInventory = "/inventories/show";
export const getAllInventories = "/inventories";
export const getInventoryById = "/inventories/find";
export const updateInventory = "/inventories/update";
export const exportInventory = "/excel/export/workorderCreationUrls";
export const inventoryFormOptions = "/inventories/formOptions?withEquipments=1";
export const inventoriesPlanning = "/assetPlanning/update";
export const inventoriesPMCalender = "/inventories/pmCalendar";

// Regions
export const getRegion = "/regions/show";
export const createRegion = "/regions/create";
export const updateRegion = "/regions/update";
export const getRegionsList = "/regions?per_page=0&page=0";

// Lab
export const allSites = "/sites";
export const getSite = "/sites/show";
export const updateSite = "/sites/update";
export const createSite = "/sites/create";
export const siteFormOptions = "/sites/formOptions";
export const sitesList = "/sites?per_page=0&page=0";

// hmc
export const getHMCs = "/hmcs";
export const getHMC = "/hmcs/show";
export const updateHMC = "/hmcs/update";
export const createHMC = "/hmcs/create";
export const hmcFormOptions = "/hmcs/formOptions";

// Equipment
export const getEquipment = "/equipments/show";
export const updateEquipment = "/equipments/update";
export const createEquipment = "/equipments/create";
export const equipmentFormOptions = "/equipments/formOptions";
export const getEquipmentsList = "/equipments?per_page=0&page=0";

// Manufacturer
export const getManufacturer = "/manufacturers/show";
export const createManufacturer = "/manufacturers/create";
export const updateManufacturer = "/manufacturers/update";
export const getManufacturersList = "/manufacturers?per_page=0&page=0";

// SUPPORT
export const supportLogin = "/login";
export const supportStoreTickets = "/store-tickets";
export const supportGetDynamicFields = "/team-dynamicfields";

// SITE DEPARTMENTS
export const getDepartmentsList = "/siteDepartments";
export const getDepartment = "/siteDepartments/show";
export const createDepartment = "/siteDepartments/create";
export const updateDepartment = "/siteDepartments/update";

// Maintenance DEPARTMENTS
export const getMaintenanceDepartmentsList = "/maintenanceDepartments";
export const getMaintenanceDepartment = "/maintenanceDepartments/show";
export const createMaintenanceDepartment = "/maintenanceDepartments/create";
export const updateMaintenanceDepartment = "/maintenanceDepartments/update";

// ORGANIZATION ADMINS
export const assignLabs = "/organization/admins/assignLabs";
export const getOrganizationAdminsList = "/organization/admins";
export const getOrganizationAdmin = "/organization/admins/show";
export const createOrganizationAdmin = "/organization/admins/create";
export const updateOrganizationAdmin = "/organization/admins/update";
