import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { modWorkOrders } from "utility/helper/apmModules";
import { columns, columnsOverdue } from "views/components/workOrders/data";
import CardView from "views/components/workOrders/CardView";
import {
  canDo,
  createWorkorderMedical,
  createWorkorderNonMedical,
  workorderViewMedicalNonMedical,
} from "utility/helper/permissions";
import { useHistory } from "react-router-dom";
import { getPath } from "utility/helper/getParamsURL";
import { canDoDirect } from "utility/helper/directPermissions";
import { IOFilter } from "models/workOrder";

const WorkOrderList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));
  const history = useHistory();
  const params = history?.location?.pathname;

  return (
    <RenderList
      otherParams={
        getPath(params) === "overdue"
          ? { category_filter: "OVERDUE_PREVENTIVE_MAINTENANCE" }
          : null
      }
      isTabs
      isFilter
      isCardView
      isSmartSearch
      customCols={getPath(params) === "overdue" ? columnsOverdue : columns}
      cardViewChild={CardView}
      module={modWorkOrders.id}
      filtersIO={IOFilter}
      isCreate={canDo(user, [
        createWorkorderMedical,
        createWorkorderNonMedical,
      ])}
      isSiteFilter
      isClassificationFilter={canDoDirect(user, workorderViewMedicalNonMedical)}
      // ! Check permission
      isWOFilter
    />
  );
});

export default WorkOrderList;
