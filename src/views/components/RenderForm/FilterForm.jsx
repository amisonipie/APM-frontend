import React from "react";
import TemporaryDrawer from "views/components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import WorkOrderFilter from "views/pages/workOrders/WorkOrderFilter";
import InventoryFilter from "views/pages/inventories/InventoryFilter";
import { toggleGetData } from "redux/actions/renderList/renderListAction";
import { modInventories, modWorkOrders } from "utility/helper/apmModules";

function ModuleForm({ ...props }) {
  switch (props?.moduleName) {
  case modInventories.id:
    return <InventoryFilter {...props} />;
  case modWorkOrders.id:
    return <WorkOrderFilter {...props} />;
  default:
    return <div />;
  }
}
function RenderFilterForm(props) {
  const dispatch = useDispatch();
  const { drawer } = useSelector((state) => ({ drawer: state?.renderList }));
  return (
    <TemporaryDrawer
      onClick={() => dispatch(toggleGetData({ isToggle: true, type: "filter" }))}
      icon={props?.icon}
      toolTip={props?.toolTip}
      text={props?.text}
      customClasses="solid mr-0 ml-1 mb-sm-0 mb-1"
      customTextClasses="d-none d-sm-block"
      customIconClasses="stroke"
      isOpen={
        (props?.isOpen || drawer.toggleDrawer) && drawer.type === "filter"
      }
      showDrawerToggler={props?.showDrawerToggler}
    >
      <ModuleForm moduleName={props?.module} {...props} />
    </TemporaryDrawer>
  );
}

export default RenderFilterForm;
