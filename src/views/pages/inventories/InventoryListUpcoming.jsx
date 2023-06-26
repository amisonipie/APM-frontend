import React from "react";
import RenderList from "views/components/RenderList";
import { modInventories } from "utility/helper/apmModules";
import { columns } from "views/components/inventories/data-upcoming";

const InventoryList = React.memo(() => (
  <RenderList
    module={modInventories.id}
    customCols={columns}
    otherParams={{ expiring: 1, expiring_days: 30 }}
  />
));

export default InventoryList;
