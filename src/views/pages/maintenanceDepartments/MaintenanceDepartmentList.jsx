import React from "react";
import { observer } from "mobx-react-lite";
import RenderList from "views/components/RenderList";
import CustomSelect from "views/components/@custom/Select";
import { modMaintenanceDepartment } from "utility/helper/apmModules";
import { MaintenanceDepartmentModel } from "models/maintenanceDepartment";
import {
  canDo,
  editMaintenanceDepartment,
  createMaintenanceDepartment,
} from "utility/helper/permissions";
import { addSquare } from "views/layouts/components/navbar/data";

import "./style.scss";
import PrimaryButton from "views/components/PrimaryButton";
import { useDispatch } from "react-redux";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

const MaintenanceDepartmentList = observer((props) => {
  const dispatch = useDispatch();
  const MD = React.useMemo(
    () =>
      new MaintenanceDepartmentModel({
        callSites: true,
        callListingData: true,
      }),
    [],
  );

  return (
    <div className="mdList">
      <div className="mdList__Actions">
        {/* {MD.canSelectSite && ( */}
        <CustomSelect
          col
          isMulti
          value={MD.selectedSite}
          placeholder="Select Site"
          customOptions={MD.labs.data}
          isLoading={MD.labs.loading}
          // debounceSearch={MD.searchSites}
          additionalOnChangeHandler={MD.filterListingData}
        />
        {/* )} */}

        {canDo(MD.userModel.user, createMaintenanceDepartment) && (
          <PrimaryButton
            isDisabled={props?.isDisabled}
            text={"Add Department"}
            icon={addSquare}
            toolTip={"Add_Department"}
            customClasses={`solid mr-0 ml-medium-0 ml-1  mb-sm-0 h-44 ${props?.customCreateBtnClasses}`}
            customTextClasses={"d-none d-sm-block"}
            customIconClasses={"stroke"}
            onClick={() =>
              dispatch(
                commonDrawer({
                  isOpen: true,
                  type: "create",
                  module: modMaintenanceDepartment?.id,
                }),
              )
            }
          />
        )}
      </div>
      <RenderList
        hideReset
        showActions
        isLocalData
        data={MD.listingData}
        customCols={MD.columns}
        getListingData={MD.getListingData}
        module={modMaintenanceDepartment.id}
        isEdit={canDo(MD.userModel.user, editMaintenanceDepartment)}
        hideListingAction
      />
    </div>
  );
});

export default MaintenanceDepartmentList;
