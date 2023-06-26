import React from "react";
import Drawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "views/components/PrimaryButton";
import {
  editAdditionalConfirmation,
  editConfirmation,
  showDisacrdConfirmation,
} from "redux/actions/renderList/renderListAction";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
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
  modWorkOrdersAssignTo
} from "utility/helper/apmModules";

import HMCCreate from "views/pages/hmcs/HMCCreate";
import UserForm from "views/pages/users/UserCreate";
import SiteCreate from "views/pages/sites/SiteCreate";
import RegionForm from "views/pages/regions/RegionCreate";
import EquipmentForm from "views/pages/equipments/EquipmentCreate";
import WorkorderForm from "views/pages/workOrders/WorkorderCreate";
import InventoryForm from "views/pages/inventories/InventoryCreate";
import ManufacturerForm from "views/pages/manufacturers/ManufacturerCreate";
import SiteDepartmentForm from "views/pages/siteDepartments/DepartmentCreate";
import OrganizationAdminSitesForm from "views/pages/organizationAdmin/OrganizationAdminAssignSites";
import MaintenanceDepartmentForm from "views/pages/maintenanceDepartments/MaintenanceDepartmentCreate";
import InventoryPlaningUpdate from "views/pages/inventoryPlanning/InventoryPlaningUpdate";
import AssignTo from "../workOrders/AssignTo";

const ModuleForm = ({ ...props }) => {
  switch (props?.moduleName) {
<<<<<<< HEAD
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
  case modWorkOrdersAssignTo.id:
     return <AssignTo {...props} />;
=======
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
    case "assignTo":
      return <AssignTo {...props} />;
>>>>>>> a763321d8a2557cae8ecacc25402e13c74dee32a

    default:
      return <div />;
  }
};

export default function CommonDrawer() {
  const dispatch = useDispatch();

  const { props, isEdit, isEditAdditional } = useSelector((state) => {
    return {
      props: state.drawer.drawer.commonDrawer,
      isEdit: state.renderList?.isEdit,
      isEditAdditional: state.renderList?.isEditAdditional,
    };
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;

    if (isEdit || isEditAdditional) {
      dispatch(showDisacrdConfirmation(true));
    } else {
      dispatch(editConfirmation(false));
      dispatch(editAdditionalConfirmation(false));
      dispatch(commonDrawer({ isOpen: false }));
    }
  };

  return (
    <div id={props?.id || "drawer"} className="NEW_DRAWER">
      {props?.showDrawerToggler && (
        <PrimaryButton
          isDisabled={props?.isDisabled}
          text={props?.text}
          icon={props?.icon}
          toolTip={props?.toolTip}
          customClasses={props?.customClasses}
          customTextClasses={props?.customTextClasses}
          customIconClasses={props?.customIconClasses}
          onClick={props.onClick}
        />
      )}
      <Drawer
        anchor="right"
        // ! Drawer is handled by props so it's not nessasory to add onClose prop
        open={!!props?.isOpen}
        // ! as we are closing through props abd disabling backdrop close
        onClose={toggleDrawer("right", false)}
        disableEscapeKeyDown
        className={`ml-medium-0 drawer drawer-second show-in-top ${props.customDrawerClasses}`}
      >
        <ModuleForm moduleName={props?.module} {...props} DRAWER="NEW" />
      </Drawer>
    </div>
  );
}
