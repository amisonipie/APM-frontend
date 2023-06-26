import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { modInventoryPlanning } from "utility/helper/apmModules";
import { canDo, updateInventoryPlanning } from "utility/helper/permissions";
import { InventoriesModal } from "models/inventory";
import { observer } from "mobx-react-lite";

const InventoryPlanningList = observer(() => {
  const Inventories = React.useMemo(() => new InventoriesModal(), []);

  // React.useEffect(() => {
  //   Inventories.getOptionsAndFieldsData();
  // }, []);

  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));
  return (
    <RenderList
      showActions
      customCols={Inventories.getEQPColumns}
      isSmartSearch={false}
      module={modInventoryPlanning.id}
      isEdit={canDo(user, updateInventoryPlanning)}
      isCreate={false}
      isSiteFilter

    // isDelete={canDo(user, deleteManufacturer)}
    />
  );
});

export default InventoryPlanningList;
