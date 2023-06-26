import { observer } from "mobx-react-lite";
import { Form, TabContent } from "reactstrap";
import React, { useMemo, useEffect } from "react";
import { InventoriesModal } from "models/inventory";
import ListingTabs from "views/components/ListingTabs";
import InfoTab from "views/components/inventories/InfoTab";
import { inventoryStrokeIcon } from "assets/icons/svgIcons";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import WoHistoryTab from "views/components/inventories/WoHistoryTab";

const InventoryCreate = observer((props) => {
  const Inventories = useMemo(
    () => new InventoriesModal({ id: props?.row?._id, rowList : props?.row, isCreate: true }),
    [],
  );

  // GET INVENTORY DATA BY ID / FORM OPTIONS / LABS / DEPARTMENTS
  // useEffect(() => {
  //   Inventories.getLabs();
  //   Inventories.getOptionsAndFieldsData();
  // }, []);

  return (
    <Form onSubmit={(e) => Inventories.handleSubmit(e)} className="sidebarForm">
      {/* HEADING  */}
      <SideBarFormHeading
        icon={inventoryStrokeIcon}
        title={Inventories.getFormHeading}
        zeroMargin={Inventories.idToUpdate}
      />

      {/* // NAV TBS ---START */}
      {Inventories.idToUpdate && (
        <div className="tabsAndFilter">
          <ListingTabs
            sideBarTabs
            isDisabled={false}
            toggle={Inventories.toggleTabs}
            tabs={Inventories.getSideBarTabs || []}
            activeTab={Inventories.sideBarActiveTab}
          />
        </div>
      )}

      <TabContent activeTab={Inventories.sideBarActiveTab}>
        <InfoTab Inventories={Inventories} />
        <WoHistoryTab Inventories={Inventories} />
      </TabContent>
    </Form>
  );
});
export default InventoryCreate;
