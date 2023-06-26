import { userRole } from "utility/config";
import { Form, FormGroup } from "reactstrap";
import CustomInput from "views/components/@custom/Input";
import React, { useEffect, useMemo } from "react";
import CustomSelect from "views/components/@custom/Select";
import { modInventories } from "utility/helper/apmModules";
import { RiSearchLine } from "react-icons/ri";
import { observer } from "mobx-react-lite";
import { InventoriesModal } from "models/inventory";

const InventoryFilter = observer((props) => {
  const InventoriesFilterModel = useMemo(
    () => new InventoriesModal(props),
    [],
  );

  const FiltersList = [
    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        isSearchable
        placeholder="Select Sites"
        name="site_ids"
        isMulti
        value={props?.state?.site_ids}
        isLoading={InventoriesFilterModel.labsLoading}
        debounceSearch={InventoriesFilterModel.findLabs}
        handleChange={props.handleChange}
        isClearable
        options={InventoriesFilterModel.labs?.data}
        optionsCustoms={{
          value: "_id",
          label: "site_name",
        }}
      />
    </FormGroup>,
    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        icon={<RiSearchLine />}
        isMulti
        isClearable
        isSearchable
        placeholder="Search Department"
        name="site_department_id"
        handleChange={props.handleChange}
        value={props?.state?.site_department_id}
        options={InventoriesFilterModel.siteDepartments?.data}
        debounceSearch={InventoriesFilterModel.findSiteDepartment}
        isLoading={InventoriesFilterModel.siteDepartments?.loading}
        optionsCustoms={{
          value: "VALUE",
          label: "LABEL",
        }}
      />
    </FormGroup>,
    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        icon={<RiSearchLine />}
        isSearchable
        placeholder="Search Devices"
        isMulti
        value={props.state?.equipment_id}
        isLoading={InventoriesFilterModel.equipmentsLoading}
        debounceSearch={InventoriesFilterModel.findEquipment}
        name="equipment_id"
        isClearable
        handleChange={props.handleChange}
        options={InventoriesFilterModel.equipments.data}
      />
    </FormGroup>,

    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        icon={<RiSearchLine />}
        isMulti
        isSearchable
        placeholder="Search Manufacturer"
        name="manufacturer_id"
        value={props?.state?.manufacturer_id}
        isLoading={InventoriesFilterModel.manufacturersLoading}
        debounceSearch={InventoriesFilterModel.findManufacturer}
        handleChange={props?.handleChange}
        options={InventoriesFilterModel.manufacturers?.data}
        optionsCustoms={{
          value: "_id",
          label: "name",
        }}
      />
    </FormGroup>,

    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        isSearchable
        placeholder="Select Class"
        name="class"
        isMulti
        value={props?.state?.class}
        isLoading={InventoriesFilterModel.filterOptions?.loading}
        handleChange={props.handleChange}
        isClearable
        customOptions={Object.values(
          InventoriesFilterModel.filterOptions?.data?.inventory?.CLASS || {},
        )}
      />
    </FormGroup>,
    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        isSearchable
        placeholder="Select PM Frequency"
        name="pmFrequency"
        isMulti
        value={props?.state?.pmFrequency}
        isLoading={InventoriesFilterModel.filterOptions?.loading}
        handleChange={props.handleChange}
        isClearable
        customOptions={Object.values(
          InventoriesFilterModel.filterOptions?.data?.inventory?.PM_FREQUENCY
          || {},
        )}
      />
    </FormGroup>,

    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomInput
        type="text"
        name="model"
        placeholder="Model"
        value={props?.state?.model}
        handleChange={props.handleChange}
      />
    </FormGroup>,

    <>
      {InventoriesFilterModel.user?.role === userRole.superAdmin && (
        <FormGroup className="w-350 h-44 mr-0 mr-md-1">
          <CustomSelect
            isSearchable
            placeholder="Select Regions"
            name="region_ids"
            isMulti
            value={props?.state?.region_ids}
            isLoading={InventoriesFilterModel.regionsLoading}
            handleChange={props.handleChange}
            isClearable
            options={InventoriesFilterModel.regions?.data}
            optionsCustoms={{
              value: "_id",
              label: "name",
            }}
          />
        </FormGroup>
      )}
    </>,

    <FormGroup className="w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        isSearchable
        placeholder="Select Sites"
        name="site_ids"
        isMulti
        value={props?.state?.site_ids}
        isLoading={InventoriesFilterModel.labsLoading}
        debounceSearch={InventoriesFilterModel.findLabs}
        handleChange={props.handleChange}
        isClearable
        options={InventoriesFilterModel.labs?.data}
        optionsCustoms={{
          value: "_id",
          label: "site_name",
        }}
      />
    </FormGroup>,

    <FormGroup className="w-350 dateGroup mr-0 mr-md-1">
      <CustomInput
        type="date"
        placeholder="Next PM Date : DD/MM/YY"
        name="nextPMDate"
        // minDate={props?.state.installationDateFrom}
        value={props?.state.nextPMDate}
        handleChange={props?.handleChange}
      />
    </FormGroup>,

    <FormGroup className="w-350 dateGroup mr-0 mr-md-1">
      <CustomInput
        type="date"
        className="form-control"
        placeholder="Installation Start Date : DD/MM/YY"
        name="installationDateFrom"
        value={props?.state?.installationDateFrom}
        handleChange={props?.handleChange}
        onClear={() => {
          props.handleChange({
            key: "installationDateTo",
            value: null,
          });
        }}
      />
    </FormGroup>,

    <FormGroup className="w-350 dateGroup mr-0 mr-md-1">
      <CustomInput
        type="date"
        isDisabled={props?.state.installationDateFrom === null}
        placeholder="Installation End Date : DD/MM/YY"
        name="installationDateTo"
        minDate={props?.state.installationDateFrom}
        value={props?.state.installationDateTo}
        handleChange={props?.handleChange}
      />
    </FormGroup>,
  ];

  const [maxToShow, setMaxToShow] = React.useState(2);
  const [filterContainerWidth, setFilterContainerWidth] = React.useState(0);
  // ! Screen size change hook for dynamic screen change
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("load", handleResize, false);
    window.addEventListener("resize", handleResize, false);
    // ! clean up function
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    const containerEl = document.getElementById(modInventories.id);
    // ! Default width = 236
    const width = props?.width || 236;
    const filterContainerWidth = containerEl.clientWidth;
    setFilterContainerWidth(filterContainerWidth);

    // ! taking 100 as default spacing style of all
    let count = Math.floor((filterContainerWidth - 100) / width);
    count = count > 0 ? count - 1 : count;
    if (props?.isModal) {
      count++;
    }
    setMaxToShow(count || 2);
    const filterLength = FiltersList.length;

    if (count + 1 >= filterLength) {
      props.setShowMoreFilter(false);
    } else {
      props.setShowMoreFilter(true);
    }
  }, [dimensions, props?.isModal]);

  return (
    <Form className="d-flex ml-sm-1">
      <div
        id={modInventories.id}
        className={`w-100 d-flex flex-wrap  ${props?.isModal ? "overflow-auto" : ""
        }`}
      >
        {/* // ! search filter */}
        {[0, -1, 1, 2].includes(maxToShow)
            && filterContainerWidth === 0
            && props.children
            && props.children}
        {FiltersList.filter((elements, idx) => {
          if (props?.isModal) {
            if (
              [0, -1, 1, 2].includes(maxToShow)
                && filterContainerWidth === 0
            ) {
              return (
                <React.Fragment key={`${idx}-${maxToShow}`}>
                  {elements}
                </React.Fragment>
              );
            } if (idx > maxToShow) {
              return (
                <React.Fragment key={`${idx}-${maxToShow}`}>
                  {elements}
                </React.Fragment>
              );
            }
          } else if (idx <= maxToShow) {
            return (
              <React.Fragment key={`${idx}-${maxToShow}`}>
                {elements}
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
    </Form>
  );
});
export default InventoryFilter;
