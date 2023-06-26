import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { modEquipment } from "utility/helper/apmModules";
import { columns } from "views/components/equipments/data";
import {
  canDo,
  createEquipment,
  editEquipment,
} from "utility/helper/permissions";

const EquipmentList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modEquipment.id}
      customCols={columns}
      isSmartSearch={false}
      isCreate={canDo(user, createEquipment)}
      // isDelete={canDo(user, deleteEquipment)}
      isEdit={canDo(user, editEquipment)}
      showActions
    />
  );
});

export default EquipmentList;
