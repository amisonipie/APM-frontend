import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { modManufacturer } from "utility/helper/apmModules";
import { columns } from "views/components/manufacturers/data";
import {
  canDo,
  createManufacturer,
  editManufacturer,
} from "utility/helper/permissions";

const ManufacturerList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modManufacturer.id}
      customCols={columns}
      isSmartSearch={false}
      isCreate={canDo(user, createManufacturer)}
      // isDelete={canDo(user, deleteManufacturer)}
      isEdit={canDo(user, editManufacturer)}
      showActions
    />
  );
});

export default ManufacturerList;
