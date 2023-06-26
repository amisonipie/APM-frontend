import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { modDepartment } from "utility/helper/apmModules";
import { columns } from "views/components/siteDepartments/data";
import {
  canDo,
  createSiteDepartment,
  editSiteDepartment,
} from "utility/helper/permissions";

const SiteDepartmentList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modDepartment.id}
      customCols={columns}
      isSmartSearch={false}
      isCreate={canDo(user, createSiteDepartment)}
      isEdit={canDo(user, editSiteDepartment)}
      showActions
      isSiteFilter
    />
  );
});

export default SiteDepartmentList;
