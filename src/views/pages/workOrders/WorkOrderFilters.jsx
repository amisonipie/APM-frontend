import React from "react";
import WorkOrderFilter from "views/pages/workOrders/WorkOrderFilter";
import { modWorkOrders } from "utility/helper/apmModules";

function ModuleForm({ ...props }) {
  switch (props?.moduleName) {
  case modWorkOrders.id:
    return <WorkOrderFilter {...props} />;
  default:
    return <div />;
  }
}
function WorkOrderFilters(props) {
  return (
    <ModuleForm moduleName={props?.module} {...props} />
  );
}

export default WorkOrderFilters;
