import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { modRegion } from "utility/helper/apmModules";
import { columns } from "views/components/regions/data";
import { canDo, createRegion, editRegion } from "utility/helper/permissions";

const RegionList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modRegion.id}
      customCols={columns}
      isSmartSearch={false}
      isCreate={canDo(user, createRegion)}
      // isDelete={canDo(user, deleteRegion)}
      isEdit={canDo(user, editRegion)}
      showActions
    />
  );
});

export default RegionList;
