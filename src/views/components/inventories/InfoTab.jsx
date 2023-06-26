import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row, TabPane } from "reactstrap";
import { classification } from "utility/config";
import FileUploader from "views/components/DropZone";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import CustomFormSwitch from "views/components/CustomSwitch/FormSwitch";
import {
  infoIcon,
  inventoryIcon,
  locationIcon,
  PMIcon,
  warrantyIcon,
} from "assets/icons/svgIcons";

import { canDo, updateInventory } from "utility/helper/permissions";
import AdditionalWarranty from "./AdditionalWarranty";
import InventoriesModal from "./InventoriesModal";
import { useDispatch, useSelector } from "react-redux";
import { showDisacrdConfirmation } from "redux/actions/renderList/renderListAction";
const InfoTab = observer((props) => {
  const dispatch = useDispatch();

  const { isEdit,isEditAdditional } = useSelector((state) => {
    return {
      props: state.drawer.drawer.commonDrawer,
      isEdit: state.renderList?.isEdit,
      isEditAdditional : state.renderList?.isEditAdditional
    };
  });
  return (
    <>
      <TabPane tabId="1">
        {/* // ACTION BUTTONS===================== */}
        {props?.Inventories.idToUpdate &&
          canDo(props?.Inventories?.user, updateInventory) && (
          <>
            <div className="sideBarActionBtn">
                  <PrimaryButton
                    isDisabled={
                      props?.Inventories?.state.loading === true ? true : false
                    }
                    // isDisabled={true}
                    text={props?.Inventories.getModeBtnText}
                    customClasses="primary-outline"
                    onClick={(e) => {
                      if (props?.Inventories.getModeBtnText === "Cancel") {
                        if (isEdit || isEditAdditional) {
                          dispatch(showDisacrdConfirmation(true));
                        } else {
                          return props?.Inventories.toggleEditMode(e);
                        }
                      } else {
                        return props?.Inventories.toggleEditMode(e);
                      }
                    }}
                  />
                  {/* <PrimaryButton
                text={props?.Inventories.getPrintBtnText}
                customClasses="solid"
                onClick={props?.Inventories.printInventoryDetail}
              /> */}
            </div>
          </>

        )}
        {/* FIELDS==================== */}

        {/* ASSET INFO */}
        <FormContainer icon={inventoryIcon} label="Asset Info">
          <Row>
            <CustomSelect
              col
              required
              name="type"
              label="Type"
              isDisabled={
                props?.Inventories.idToUpdate || props?.Inventories?.isRetired
              }
              value={props?.Inventories.state?.type}
              isLoading={props?.Inventories.options.loading}
              handleChange={props?.Inventories.handleChange}
              isDetailView={props?.Inventories.isDetailView}
              customOptions={Object.values(
                props?.Inventories.options?.inventory?.CLASSIFICATION || {},
              )}
              validation={props?.Inventories.getValidationObject}
            />
            {(props?.Inventories.isDetailView
              || props?.Inventories?.idToUpdate) && (
              <CustomInput
                col
                name="asset_id"
                label="Asset ID"
                isDisabled={props?.Inventories.idToUpdate}
                value={props?.Inventories.state?.inventoryId}
                isDetailView={props?.Inventories.isDetailView}
              />
            )}
            <CustomSelect
              col
              required
              name="equipment_id"
              label="Asset Name"
              isDisabled={
                !props?.Inventories?.state?.type
                || props?.Inventories?.isRetired
              }
              handleChange={props?.Inventories.handleChange}
              value={props?.Inventories.state?.equipment_id}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              customOptions={props?.Inventories.options?.equipments}
              validation={props?.Inventories.getValidationObject}
            />

            <CustomSelect
              col
              required
              name="manufacturer_id"
              label="Manufacturer"
              isDisabled={props?.Inventories?.isRetired}
              // isDisabled={props?.Inventories.idToUpdate}
              handleChange={props?.Inventories.handleChange}
              value={props?.Inventories.state?.manufacturer_id}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              customOptions={props?.Inventories.options?.manufacturers}
              validation={props?.Inventories.getValidationObject}
            />

            <CustomInput
              col
              name="model"
              required
              label="Model"
              isDisabled={props?.Inventories?.isRetired}
              handleChange={props?.Inventories.handleChange}
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.state?.model}
              validation={props?.Inventories.getValidationObject}
            />

            <CustomInput
              col
              required
              name="serialNumber"
              label="Serial Number"
              isDisabled={props?.Inventories?.isRetired}
              placeholder="eg: T3536E65"
              handleChange={props?.Inventories.handleChange}
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.state?.serialNumber}
              validation={props?.Inventories.getValidationObject}
            />

            <CustomInput
              col
              name="referenceNumber"
              label="Reference Number"
              isDisabled={props?.Inventories?.isRetired}
              placeholder="eg: T3536E65"
              handleChange={props?.Inventories.handleChangeAdditional}
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.additionalFields?.referenceNumber}
            />

            <CustomSelect
              col
              required
              name="acquisitionMethod"
              isDisabled={props?.Inventories?.isRetired}
              label="Acquisition Method"
              // isDisabled={props?.Inventories.idToUpdate}
              handleChange={props?.Inventories.handleChange}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              validation={props?.Inventories.getValidationObject}
              value={props?.Inventories.state?.acquisitionMethod}
              options={props?.Inventories.options?.inventory?.ACQUISITION}
            />
            <CustomInput
              col
              name="sequence"
              isDisabled={props?.Inventories?.isRetired}
              label="Sequence #"
              value={props?.Inventories.state?.sequence}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChange}
            />

            <CustomInput
              col
              name="purchasePrice"
              type="number"
              isDisabled={props?.Inventories?.isRetired}
              label="Purchase Price"
              placeholder="eg : SAR 89"
              handleChange={props?.Inventories.handleChange}
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.state?.purchasePrice}
            />

            {props?.Inventories.idToUpdate && (
              <>
                <CustomSelect
                  col
                  required
                  label="Status"
                  name="status"
                  isLoading={props?.Inventories.options.loading}
                  handleChange={props?.Inventories.handleChange}
                  isDetailView={props?.Inventories.isDetailView}
                  options={props?.Inventories.options?.inventory?.STATUS}
                  value={props.Inventories?.state?.status}
                  validation={props?.Inventories.getValidationObject}
                />

                {!props?.Inventories?.hideCurrentStatus && (
                  <CustomSelect
                    isDisabled={true || props?.Inventories?.isRetired}
                    col
                    required
                    label="Functional Status"
                    name="currentStatus"
                    isLoading={props?.Inventories.options.loading}
                    handleChange={props?.Inventories.handleChange}
                    isDetailView={props?.Inventories.isDetailView}
                    value={props?.Inventories.state?.currentStatus}
                    validation={props?.Inventories.getValidationObject}
                    options={
                      props?.Inventories.options?.inventory?.CURRENT_STATUS
                    }
                  />
                )}
              </>
            )}

            <CustomInput
              col
              name="agent"
              isDisabled={props?.Inventories?.isRetired}
              // required={true}
              label="Supplier"
              placeholder="eg: John"
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.state?.agent}
              handleChange={props?.Inventories.handleChange}
              // validation={props?.Inventories.getValidationObject}
            />
            {/* show class field only if medical Type asset is selected      */}
            {props?.Inventories.state?.type?.VALUE
              === classification.medical && (
              <CustomSelect
                col
                required
                isDisabled={props?.Inventories?.isRetired}
                name="class"
                label="Class"
                value={props?.Inventories.state?.class}
                // isDisabled={props?.Inventories.idToUpdate}
                handleChange={props?.Inventories.handleChange}
                isDetailView={props?.Inventories.isDetailView}
                isLoading={props?.Inventories.options.loading}
                validation={props?.Inventories.getValidationObject}
                options={props?.Inventories.options?.inventory?.CLASS}
              />
            )}

            {/* IMC fields  */}
            {props?.Inventories.IMCModel && (
              <>
                <CustomInput
                  col
                  type="number"
                  isDisabled={props?.Inventories?.isRetired}
                  name="purchaseOrderNumber"
                  label="Purchase Order Number"
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={
                    props?.Inventories.additionalFields?.purchaseOrderNumber
                  }
                />

                <CustomInput
                  col
                  isDisabled={props?.Inventories?.isRetired}
                  type="date"
                  placeholder="DD/MM/YY"
                  name="purchaseOrderDate"
                  label="Purchase Order Date"
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields?.purchaseOrderDate}
                />

                <CustomInput
                  sm="12"
                  col
                  type="textarea"
                  isDisabled={props?.Inventories?.isRetired}
                  name="assetDescription"
                  label="Asset Description"
                  placeholder="Write description here"
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields?.assetDescription}
                />

                <CustomInput
                  col
                  name="assetType"
                  isDisabled={props?.Inventories?.isRetired}
                  label="Asset Type"
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields?.assetType}
                />
                <CustomSelect
                  col
                  name="assetPriority"
                  isDisabled={props?.Inventories?.isRetired}
                  label="Asset Priority"
                  // isDisabled={props?.Inventories.idToUpdate}
                  isLoading={props?.Inventories.options.loading}
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields?.assetPriority}
                  options={
                    props?.Inventories.options?.inventory?.ASSET_PRIORITY
                  }
                />

                <CustomSelect
                  col
                  name="assetSeverity"
                  isDisabled={props?.Inventories?.isRetired}
                  label="Asset Severity"
                  isLoading={props?.Inventories.options.loading}
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields?.assetSeverity}
                  options={
                    props?.Inventories.options?.inventory?.ASSET_SEVERITY
                  }
                />

                {/* start  operationalManual  */}

                <CustomSelect
                  col
                  name="isOperationalManual"
                  isDisabled={props?.Inventories?.isRetired}
                  label="Operational Manual"
                  isLoading={props?.Inventories.options.loading}
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleConditionalChange}
                  customOptions={props?.Inventories.conditionalStatesOptions}
                  value={
                    props?.Inventories.conditionalStates?.isOperationalManual
                  }
                />

                {props?.Inventories.conditionalStates?.isOperationalManual
                  ?.VALUE ? (
                    <CustomInput
                      isDisabled={props?.Inventories?.isRetired}
                      col
                      name="operationalManual"
                      label="Insert link"
                      isDetailView={props?.Inventories.isDetailView}
                      handleChange={props?.Inventories.handleChangeAdditional}
                      value={
                        props?.Inventories.additionalFields?.operationalManual
                      }
                    />
                  ) : (
                    <div />
                  )}
                {/* end operationalManual  */}

                <CustomSelect
                  col
                  name="userTrained"
                  isDisabled={props?.Inventories?.isRetired}
                  label="User Trained"
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields?.userTrained}
                  isLoading={props?.Inventories.options.loading}
                  isDetailView={props?.Inventories.isDetailView}
                  options={props?.Inventories.options?.inventory?.USER_TRAINED}
                />

                {/* start  serviceManual  */}

                <CustomSelect
                  col
                  name="isServiceManual"
                  isDisabled={props?.Inventories?.isRetired}
                  label="Service Manual"
                  handleChange={props?.Inventories.handleConditionalChange}
                  value={props?.Inventories.conditionalStates?.isServiceManual}
                  isLoading={props?.Inventories.options.loading}
                  isDetailView={props?.Inventories.isDetailView}
                  customOptions={props?.Inventories.conditionalStatesOptions}
                />

                {props?.Inventories.conditionalStates.isServiceManual?.VALUE ? (
                  <CustomInput
                    col
                    name="serviceManual"
                    isDisabled={props?.Inventories?.isRetired}
                    label="Insert link"
                    isDetailView={props?.Inventories.isDetailView}
                    handleChange={props?.Inventories.handleChangeAdditional}
                    value={props?.Inventories.additionalFields?.serviceManual}
                  />
                ) : (
                  <div />
                )}
                {/* end serviceManual  */}

                <CustomSelect
                  col
                  name="assetPlug"
                  label="Asset Plug"
                  isDisabled={props?.Inventories?.isRetired}
                  isLoading={props?.Inventories.options.loading}
                  value={props?.Inventories.additionalFields?.assetPlug}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  isDetailView={props?.Inventories.isDetailView}
                  options={props?.Inventories.options?.inventory?.ASSET_PLUG}
                />

                <CustomSelect
                  col
                  name="categoryNumber"
                  label="Category Number"
                  isDisabled={props?.Inventories?.isRetired}
                  isDetailView={props?.Inventories.isDetailView}
                  isLoading={props?.Inventories.options.loading}
                  handleChange={props?.Inventories.handleChangeAdditional}
                  value={props?.Inventories.additionalFields.categoryNumber}
                  options={
                    props?.Inventories.options?.inventory?.CATEGORY_NUMBER
                  }
                />
              </>
            )}
          </Row>
        </FormContainer>

        {/* INITIAL INFO  */}
        {/* <FormContainer icon={flagIcon} label="Initial Info">
        <Row>
          <CustomInput
            col={true}
            name={"agent"}
            required={true}
            label={"Supplier"}
            placeholder="eg: John"
            isDetailView={props?.Inventories.isDetailView}
            value={props?.Inventories.state?.agent}
            handleChange={props?.Inventories.handleChange}
            validation={props?.Inventories.getValidationObject}
          />

          <CustomSelect
            col={true}
            required={true}
            label={"Maintenance Department"}
            name={"maintenance_department_id"}
            handleChange={props?.Inventories.handleChange}
            placeholder="Select"
            isDetailView={props?.Inventories.isDetailView}
            validation={props?.Inventories.getValidationObject}
            value={props?.Inventories.state?.maintenance_department_id}
            customOptions={props?.Inventories.maintenanceDepartments.data}
            isLoading={props?.Inventories.maintenanceDepartments.loading}
            isDisabled={props?.Inventories.isMaintenanceFieldDisabled}
          />

          <CustomSelect
            col={true}
            // isMulti={true}
            label={"Department"}
            name={"site_department_id"}
            isLoading={props?.Inventories.siteDepartments.loading}
            isDetailView={props?.Inventories.isDetailView}
            handleChange={props?.Inventories.handleChangeAdditional}
            customOptions={props?.Inventories.siteDepartments?.data}
            value={props?.Inventories.additionalFields?.site_department_id}
          />

          <CustomInput
            col={true}
            type="date"
            placeholder="DD/MM/YY"
            name={"departmentMoveDate"}
            label={"Current Department Move Date"}
            isDetailView={props?.Inventories.isDetailView}
            handleChange={props?.Inventories.handleChangeAdditional}
            value={props?.Inventories.additionalFields?.departmentMoveDate}
          />
        </Row>
                </FormContainer> */}
        {/* WARRANTY INFO */}
        <FormContainer icon={warrantyIcon} label="Warranty">
          <Row>
            <CustomInput
              col
              type="date"
              required
              placeholder="DD/MM/YY"
              name="installationDate"
              label="Installation Date"
              isDisabled={props?.Inventories?.isRetired}
              max={new Date().toDateString()}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChange}
              value={props?.Inventories.state?.installationDate}
              validation={props?.Inventories.getValidationObject}
            />
            <CustomSelect
              col
              required
              name="warrantyStatus"
              label="Warranty Status"
              isDisabled={props?.Inventories?.isRetired}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChange}
              value={props?.Inventories.state?.warrantyStatus}
              options={props?.Inventories.options?.inventory?.WARRANTY}
              validation={props?.Inventories.getValidationObject}
            />
            <AdditionalWarranty
              options={props?.Inventories.options}
              isDisabled={props?.Inventories?.isRetired}
              deleteAWC={props?.Inventories.removeWarranty}
              isDetailView={props?.Inventories.isDetailView}
              warrantyStatus={props?.Inventories.state?.warrantyStatus?.VALUE}
              warranties={props?.Inventories.additionalFields?.warranties}
              handleChange={props?.Inventories.handleChangeAdditional}
            />
          </Row>
        </FormContainer>
        {/* PREVENTIVE MAINTENANCE = */}
        {/* HIDING PREVENTIVE MAINTENANCE SECTION WHILE EDIT MODE */}
        {/* {(!props?.Inventories?.isDetailView && props?.Inventories?.idToUpdate && (<div />)) || ( */}
        <FormContainer icon={PMIcon} label="Preventive Maintenance">
          <Row>
            <Col xs="12" className="mb-2">
              <CustomFormSwitch
                label="PM required ?"
                isDetailView={props?.Inventories.isDetailView}
                checked={props?.Inventories.state?.pmRequired}
                isDisabled={props?.Inventories?.isRetired}
                switchLabel={
                  props?.Inventories.state?.pmRequired ? "Yes" : "No"
                }
                switchClasses="listing__actions__cardViewContainer__cardView--switch"
                handleChange={(e) => {
                  props.Inventories.handleChange({
                    key: "pmRequired",
                    value: !props?.Inventories.state?.pmRequired,
                  });
                }}
                switchLabelClasses={`${props?.Inventories.state?.pmRequired
                  ? "text-success"
                  : "text-danger"
                }`}
              />
            </Col>
            {props?.Inventories.state?.pmRequired && (
              <>
                <CustomSelect
                  col
                  required
                  name="pmFrequency"
                  isDisabled={props?.Inventories?.isRetired}
                  label="PM Frequency"
                  isLoading={props?.Inventories.options.loading}
                  handleChange={props?.Inventories.handleChange}
                  isDetailView={props?.Inventories.isDetailView}
                  value={props?.Inventories.state?.pmFrequency}
                  options={props?.Inventories.options?.inventory?.PM_FREQUENCY}
                  validation={props?.Inventories.getValidationObject}
                />

                <CustomInput
                  col
                  type="date"
                  required
                  name="pmStartDate"
                  isDisabled={props?.Inventories?.isRetired}
                  placeholder="DD/MM/YY"
                  label="PM Start Date"
                  value={props?.Inventories.state?.pmStartDate}
                  isDetailView={props?.Inventories.isDetailView}
                  handleChange={props?.Inventories.handleChange}
                  validation={props?.Inventories.getValidationObject}
                />

                <CustomSelect
                  col
                  sm={`${props?.Inventories.is3rdPartyVendor ? "6" : "12"}`}
                  required
                  name="pmDoneBy"
                  isDisabled={props?.Inventories?.isRetired}
                  label="PM Done By"
                  isLoading={props?.Inventories.options.loading}
                  handleChange={props?.Inventories.handleChange}
                  isDetailView={props?.Inventories.isDetailView}
                  value={props?.Inventories.state?.pmDoneBy}
                  options={props?.Inventories.options?.inventory?.PM_DONE_BY}
                  validation={props?.Inventories.getValidationObject}
                />

                {props?.Inventories.is3rdPartyVendor && (
                  <CustomInput
                    col
                    required
                    isDisabled={props?.Inventories?.isRetired}
                    name="pmVendor"
                    label="3rd Party Vendor"
                    value={props?.Inventories.state?.pmVendor}
                    isDetailView={props?.Inventories.isDetailView}
                    handleChange={props?.Inventories.handleChange}
                    validation={props?.Inventories.getValidationObject}
                  />
                )}
              </>
            )}
          </Row>
        </FormContainer>
        {/* // )} */}
        {/* LOCATION */}
        <FormContainer icon={locationIcon} label="Location">
          <Row>
            <CustomSelect
              sm="12"
              col
              name="site_id"
              label="Site"
              required
              isDisabled={
                props?.Inventories?.isRetired || props?.Inventories.idToUpdate
              }
              value={props?.Inventories.state?.site_id}
              isLoading={props?.Inventories.labs.loading}
              customOptions={props?.Inventories.labs.data}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChange}
              // debounceSearch={props?.Inventories.searchSites}
              validation={props?.Inventories.getValidationObject}
            />
            <CustomInput
              col
              label="Region"
              name="region"
              isDisabled
              placeholder="e.g Riyadh"
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.state?.site_id?.region?.name || ""}
              handleChange={props?.Inventories.handleChange}
            />
            <CustomInput
              col
              label="City"
              placeholder="e.g Riyadh"
              name="city"
              isDisabled
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.state?.site_id?.city || ""}
              handleChange={props?.Inventories.handleChangeAdditional}
            />
            <CustomSelect
              col
              // isMulti={true}
              label="Department"
              name="site_department_id"
              isDisabled={props?.Inventories?.isRetired}
              isLoading={props?.Inventories.siteDepartments.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              customOptions={props?.Inventories.siteDepartments?.data}
              value={props?.Inventories.additionalFields?.site_department_id}
            />

            {/* IMC field  */}
            {props?.Inventories.IMCModel && (
              <CustomInput
                col
                sm="12"
                type="textarea"
                isDisabled={props?.Inventories?.isRetired}
                placeholder="Write Description here"
                name="locationDescription"
                isDetailView={props?.Inventories.isDetailView}
                label="Location Description"
                value={props?.Inventories.additionalFields?.locationDescription}
                handleChange={props?.Inventories.handleChangeAdditional}
              />
            )}

            <CustomInput
              col
              type="date"
              isDisabled={props?.Inventories?.isRetired}
              placeholder="DD/MM/YY"
              name="departmentMoveDate"
              label="Current Department Move Date"
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              value={props?.Inventories.additionalFields?.departmentMoveDate}
            />
            <CustomInput
              col
              label="Building"
              isDisabled={props?.Inventories?.isRetired}
              name="building"
              placeholder="e:g Building"
              value={props?.Inventories.state?.building}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChange}
            />
            <CustomInput
              col
              label="Floor"
              isDisabled={props?.Inventories?.isRetired}
              name="floor"
              placeholder="e-g 3rd Floor"
              value={props?.Inventories.state?.floor}
              handleChange={props?.Inventories.handleChange}
              isDetailView={props?.Inventories.isDetailView}
            />
            <CustomInput
              sm="6"
              col
              label="Room"
              name="room"
              isDisabled={props?.Inventories?.isRetired}
              placeholder="e:g Room no 5"
              value={props?.Inventories.state?.room}
              handleChange={props?.Inventories.handleChange}
              isDetailView={props?.Inventories.isDetailView}
            />
            <CustomSelect
              col
              required
              label="Maintenance Department"
              name="maintenance_department_id"
              handleChange={props?.Inventories.handleChange}
              placeholder="Select"
              isDetailView={props?.Inventories.isDetailView}
              validation={props?.Inventories.getValidationObject}
              value={props?.Inventories.state?.maintenance_department_id}
              customOptions={props?.Inventories.maintenanceDepartments.data}
              isLoading={props?.Inventories.maintenanceDepartments.loading}
              isDisabled={
                props?.Inventories.isMaintenanceFieldDisabled
                || props?.Inventories?.isRetired
              }
            />
          </Row>
        </FormContainer>
        {/* ADDITIONAL INFO */}
        <FormContainer icon={infoIcon} label="Additional Info">
          <Row>
            <CustomInput
              col
              name="ipAddress"
              isDisabled={props?.Inventories?.isRetired}
              isDetailView={props?.Inventories.isDetailView}
              label="IP Address"
              value={props?.Inventories.additionalFields?.ipAddress}
              handleChange={props?.Inventories.handleChangeAdditional}
            />

            <CustomInput
              col
              name="macAddress"
              label="MAC Address"
              isDisabled={props?.Inventories?.isRetired}
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.additionalFields?.macAddress}
              handleChange={props?.Inventories.handleChangeAdditional}
            />

            <CustomInput
              col
              name="udiName"
              label="UDI Name"
              isDisabled={props?.Inventories?.isRetired}
              isDetailView={props?.Inventories.isDetailView}
              value={props?.Inventories.additionalFields?.udiName}
              handleChange={props?.Inventories.handleChangeAdditional}
            />

            <CustomInput
              col
              name="udiCode"
              isDisabled={props?.Inventories?.isRetired}
              isDetailView={props?.Inventories.isDetailView}
              label="UDI Code"
              value={props?.Inventories.additionalFields?.udiCode}
              handleChange={props?.Inventories.handleChangeAdditional}
            />
          </Row>
        </FormContainer>
        {/* EQUIPMENT PLANNING */}
        <FormContainer icon={infoIcon} label="Planning">
          <Row>
            <CustomSelect
              col
              name="utilization"
              isDisabled={props?.Inventories?.isRetired}
              label="Utilization"
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              value={props?.Inventories.additionalFields?.utilization}
              options={props?.Inventories.options?.inventory?.UTILIZATION}
            />

            <CustomSelect
              col
              name="technicalPerformance"
              label="Technical Performance"
              isDisabled={props?.Inventories?.isRetired}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              value={props?.Inventories.additionalFields?.technicalPerformance}
              options={
                props?.Inventories.options?.inventory?.TECHNICAL_PERFORMANCE
              }
            />

            <CustomSelect
              col
              name="failureFrequency"
              label="Failure Frequency"
              isDisabled={props?.Inventories?.isRetired}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              value={props?.Inventories.additionalFields?.failureFrequency}
              options={props?.Inventories.options?.inventory?.FAILURE_FREQUENCY}
            />

            <CustomSelect
              col
              name="estimatedAge"
              label="Estimated Age"
              isDisabled={props?.Inventories?.isRetired}
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              value={props?.Inventories.additionalFields?.estimatedAge}
              options={props?.Inventories.options?.inventory?.ESTIMATED_AGE}
            />

            <CustomSelect
              sm="12"
              col
              name="dueForReplacement"
              isDisabled={props?.Inventories?.isRetired}
              label="Due for Replacement"
              isLoading={props?.Inventories.options.loading}
              isDetailView={props?.Inventories.isDetailView}
              handleChange={props?.Inventories.handleChangeAdditional}
              value={props?.Inventories.additionalFields?.dueForReplacement}
              options={
                props?.Inventories.options?.inventory?.DUE_FOR_REPLACEMENT
              }
            />
          </Row>
        </FormContainer>
        {/* FILES UPLOAD */}
        <div className="fileUploadContainer">
          <FileUploader
            handleChange={(e) => {
              props.Inventories.handleChange({
                key: "fileUpload",
                value: e,
              });
            }}
            isDisabled={props?.Inventories?.isRetired}
            isLoading={props?.Inventories.state.loading}
            accept=".jpg, .jpeg, .png, .svg, .pdf, .xlsx, .xls"
            size={5000000}
            isDetailView={props?.Inventories.isDetailView}
            value={props?.Inventories.state?.fileUpload}
          />
        </div>
        {/* SUBMIT BUTTON */}
        {!props?.Inventories.isDetailView && (
          <PrimaryButton
            onClick={() => null}
            isDisabled={
              props?.Inventories.loading || props?.Inventories.state?.loading
            }
            type="submit"
            customClasses="solid w-100 py-2"
            text={`${!props?.Inventories.loading ? "Submit" : "Submitting.."}`}
          />
        )}
      </TabPane>

      {props.Inventories.inventoriesStatusModal && (
        <InventoriesModal {...props} />
      )}
    </>
  );
});

export default InfoTab;
