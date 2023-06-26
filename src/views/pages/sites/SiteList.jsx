import React from "react";
import { useSelector } from "react-redux";
import { modSite } from "utility/helper/apmModules";
import RenderList from "views/components/RenderList";
import { columns } from "views/components/sites/data";
import { canDo, createSite, editSite } from "utility/helper/permissions";

const SiteList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modSite.id}
      customCols={columns}
      isSmartSearch={false}
      isCreate={canDo(user, createSite)}
      // isDelete={canDo(user, deleteSite)}
      isEdit={canDo(user, editSite)}
      showActions
    />
  );
});

export default SiteList;
