import React from "react";
import { TabPane } from "reactstrap";
import { observer } from "mobx-react-lite";
import RenderList from "views/components/RenderList";

const WoHistoryTab = observer((props) => (
  <TabPane tabId="2">
    <RenderList
      hideReset
      noHeader
      customCols={props?.Inventories?.getWoHistoryColumns}
      otherParams={{ inventory_id: props?.Inventories?.idToUpdate }}
      endpoint={props?.Inventories?.getEndpointWorkOrdersHistoryByInventoryID}
      customTableClasses="woHistoryTable"
    />
  </TabPane>
));

export default WoHistoryTab;
