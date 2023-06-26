import React from "react";
import HMCCreate from "views/pages/hmcs/HMCCreate";
import UserForm from "views/pages/users/UserCreate";
import SiteCreate from "views/pages/sites/SiteCreate";
import TemporaryDrawer from "views/components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import RegionForm from "views/pages/regions/RegionCreate";
import EquipmentForm from "views/pages/equipments/EquipmentCreate";
import WorkorderForm from "views/pages/workOrders/WorkorderCreate";
import InventoryForm from "views/pages/inventories/InventoryCreate";
import ManufacturerForm from "views/pages/manufacturers/ManufacturerCreate";
import SiteDepartmentForm from "views/pages/siteDepartments/DepartmentCreate";
import OrganizationAdminSitesForm from "views/pages/organizationAdmin/OrganizationAdminAssignSites";
import MaintenanceDepartmentForm from "views/pages/maintenanceDepartments/MaintenanceDepartmentCreate";

// modules
import {
  modHMC,
  modSite,
  modUsers,
  modRegion,
  modEquipment,
  modDepartment,
  modWorkOrders,
  modInventories,
  modManufacturer,
  modOrganizationAdmins,
  modInventoryPlanning,
  modMaintenanceDepartment,
} from "utility/helper/apmModules";

// other imports
import { toggleGetData } from "redux/actions/renderList/renderListAction";
import InventoryPlaningUpdate from "views/pages/inventoryPlanning/InventoryPlaningUpdate";
import { observer } from "mobx-react-lite";

const ModuleForm = observer(({ ...props }) => {
  switch (props?.moduleName) {
  case modUsers.id:
    return <UserForm {...props} />;
  case modHMC.id:
    return <HMCCreate {...props} />;
  case modSite.id:
    return <SiteCreate {...props} />;
  case modRegion.id:
    return <RegionForm {...props} />;
  case modEquipment.id:
    return <EquipmentForm {...props} />;
  case modInventories.id:
    return <InventoryForm {...props} />;
  case modManufacturer.id:
    return <ManufacturerForm {...props} />;
  case modDepartment.id:
    return <SiteDepartmentForm {...props} />;
  case modInventoryPlanning.id:
    return <InventoryPlaningUpdate {...props} />;
  case modOrganizationAdmins.id:
    return <OrganizationAdminSitesForm {...props} />;
  case modWorkOrders.id:
    return <WorkorderForm inventory={props?.row} {...props} />;
  case modMaintenanceDepartment.id:
    return <MaintenanceDepartmentForm {...props} />;

  default:
    return <div />;
  }
});
const RenderModuleForm = observer((props) => {
  const dispatch = useDispatch();
  const { drawer } = useSelector((state) => ({ drawer: state?.renderList }));
  return (
    <>
      <TemporaryDrawer
        onClick={() =>
          dispatch(toggleGetData({ isToggle: true, type: "create" }))
        }
        icon={props?.icon}
        toolTip={props?.toolTip}
        text={props?.text}
        customDrawerClasses={"show-in-top"}
        customClasses={`solid mr-0 ml-medium-0 ml-1  mb-sm-0 ${props?.customClasses}`}
        customTextClasses={"d-none d-sm-block"}
        customIconClasses={"stroke"}
        isOpen={
          props?.isOpen || (drawer.toggleDrawer && drawer.type === "create")
        }
        showDrawerToggler={props?.showDrawerToggler}
      >
        <ModuleForm moduleName={props?.module} {...props} />
      </TemporaryDrawer>
    </>
  );
});

export default RenderModuleForm;
