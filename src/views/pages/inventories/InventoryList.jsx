/* eslint-disable no-underscore-dangle */
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { errorHandler, SC } from "utility/helper";
import { InventoriesModal, IOFilter } from "models/inventory";
import RenderList from "views/components/RenderList";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import { getInventoryById } from "utility/helper/endpoints";
import React, { Fragment, useEffect, useState } from "react";
import { handleExportContent } from "views/components/inventories/data";
import { modInventories, modWorkOrders } from "utility/helper/apmModules";
import {
  commonDrawer,
  toggleSideBarRouteBase,
} from "redux/actions/drawer/drawerActions";

import {
  canDo,
  createInventory,
  createWorkorderMedical,
  createWorkorderNonMedical,
  inventoryViewMedicalNonMedical,
  inventoryExport,
} from "utility/helper/permissions";
import { canDoDirect } from "utility/helper/directPermissions";
import PrimaryButton from "views/components/PrimaryButton";

const MySwal = withReactContent(Swal);

const InventoryList = observer(() => {
  const Inventories = React.useMemo(() => new InventoriesModal(), []);
  const params = useParams();
  const dispatch = useDispatch();
  const [inventory, setInventory] = useState({});
  const { user, drawer } = useSelector((state) => ({
    user: state?.auth?.login?.data,
    drawer: state?.drawer?.drawer,
  }));

  // show workOrderForm if openSideBarRouteBase
  // state From redux is true and inventory found against url base inventory id
  const showWorkOrderForm = drawer?.openSideBarRouteBase && Object.keys(inventory)?.length > 0;

  // Un Authorized message to create a work order
  const showWOCRestriction = () => {
    MySwal.fire({
      title: "Not Authorized!",
      icon: "info",
      html: (
        <strong className="mb-5">
          Sorry! You are not authorized to Create a work order!
        </strong>
      ),
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const getInventoryForWorkOrder = async ({ inventoryID }) => {
    try {
      const response = await SC.getCall({
        url: `${getInventoryById}/${inventoryID}`,
      });
      const data = response.data || {};
      dispatch(toggleSideBarRouteBase(true));
      setInventory(data);
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  useEffect(() => {
    // url-base inventory id and user exist in redux and have
    // access to create work order then only request for create work Order
    if (user?._id) {
      if (params?.inventoryId) {
        if (canDo(user, [createWorkorderMedical, createWorkorderNonMedical])) {
          getInventoryForWorkOrder({ inventoryID: params?.inventoryId });
        } else {
          showWOCRestriction();
        }
      }
    }
  }, [user?._id]);

  // const ExpandableComp = ({ data }) => {
  //   return <ExpandableComponent data={data} options={Inventories.options} />;
  // };
  return (
    <>
      {/* <PMClendarTopBar /> */}
      {showWorkOrderForm && (
        <PrimaryButton
          customClasses={"d-none"}
          customTextClasses={"d-none d-sm-block"}
          customIconClasses={"stroke"}
          onClick={() =>
            dispatch(
              commonDrawer({
                isOpen: showWorkOrderForm,
                type: "create",
                module: modWorkOrders.id,
                row: inventory,
              }),
            )
          }
        />
      )}
      <RenderList
        module={modInventories.id}
        customCols={Inventories.getInventoryColumns}
        exportExcl={{ fileName: "Inventory", handleExportContent }}
        // ExpandableComponent={ExpandableComp}
        isSmartSearch
        isRequestEquipment={false}
        isCreate={canDo(user, createInventory)}
        isFilter
        filtersIO={IOFilter}
        isExport={canDo(user, inventoryExport)}
        // isDelete={canDo(user, deleteInventory)}
        // isEdit={canDo(user, updateInventory)}
        isCWO={canDo(user, [createWorkorderMedical, createWorkorderNonMedical])}
        showActions
        isSiteFilter
        isClassificationFilter={canDoDirect(
          user,
          inventoryViewMedicalNonMedical,
        )}
      />
    </>
  );
});

export default InventoryList;
