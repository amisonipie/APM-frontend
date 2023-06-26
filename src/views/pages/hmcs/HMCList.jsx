import React from "react";
import { useSelector } from "react-redux";
import { modHMC } from "utility/helper/apmModules";
import RenderList from "views/components/RenderList";
import { columns } from "views/components/hmcs/data";
import { canDo, createHMC, editHMC } from "utility/helper/permissions";

const HMCList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modHMC.id}
      customCols={columns}
      isSmartSearch={false}
      isCreate={canDo(user, createHMC)}
      // isDelete={canDo(user, deleteHMC)}
      isEdit={canDo(user, editHMC)}
      showActions
    />
  );
});

export default HMCList;
