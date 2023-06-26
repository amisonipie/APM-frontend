import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Form, FormGroup } from "reactstrap";
import { WorkOrderModal } from "models/workOrder";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";
import { modWorkOrders } from "utility/helper/apmModules";
import { RiSearchLine } from "react-icons/ri";

const WorkOrderFilter = observer((props) => {
  const WorkOrders = React.useMemo(() => new WorkOrderModal(props), []);

  React.useEffect(() => {
    WorkOrders.getManufacturers({});
    WorkOrders.getEquipments({});
    WorkOrders.getSiteDepartment({});
  }, []);

  const FiltersList = [
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        isSearchable
        placeholder="Select Sites"
        name="site_ids"
        isMulti
        value={props?.state?.site_ids}
        isLoading={WorkOrders.labs.loading}
        debounceSearch={WorkOrders.findLabs}
        handleChange={props.handleChange}
        isClearable
        options={WorkOrders.labs?.data}
        optionsCustoms={{
          value: "_id",
          label: "site_name",
        }}
      />
    </FormGroup>,
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        icon={<RiSearchLine />}
        isMulti
        isClearable
        isSearchable
        placeholder="Search Department"
        name="site_department_id"
        handleChange={props.handleChange}
        value={props?.state?.site_department_id}
        options={WorkOrders.siteDepartment?.data}
        debounceSearch={WorkOrders.findSiteDepartment}
        isLoading={WorkOrders.siteDepartmentLoading}
        optionsCustoms={{
          value: "VALUE",
          label: "LABEL",
        }}
      />
    </FormGroup>,
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        isSearchable
        placeholder="Class"
        isMulti
        name="class"
        value={props?.state?.class}
        isLoading={WorkOrders.options.loading}
        debounceSearch={WorkOrders.findSiteDepartment}
        handleChange={props.handleChange}
        isClearable
        customOptions={Object.values(
          WorkOrders.options?.data?.inventory?.CLASS || {},
        )}
      />
    </FormGroup>,
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        icon={<RiSearchLine />}
        isSearchable
        placeholder="Search Manufacturer"
        name="manufacturer"
        isMulti
        value={props?.state?.manufacturer}
        isLoading={WorkOrders.manufacturersLoading}
        debounceSearch={WorkOrders.findManufacturer}
        handleChange={props.handleChange}
        isClearable
        options={WorkOrders.manufacturers?.data}
        optionsCustoms={{
          value: "_id",
          label: "name",
        }}
      />
    </FormGroup>,
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect
        icon={<RiSearchLine />}
        isSearchable
        placeholder="Search Devices"
        isMulti
        value={props.state?.equipment_id}
        isLoading={WorkOrders.equipmentsLoading}
        debounceSearch={WorkOrders.findEquipment}
        name="equipment_id"
        isClearable
        handleChange={props.handleChange}
        options={WorkOrders.equipments.data}
      />
    </FormGroup>,
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomInput
        type="text"
        name="model"
        placeholder="Model"
        value={props?.state?.model}
        handleChange={props.handleChange}
      />
    </FormGroup>,
    <FormGroup className="dateGroup filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomInput
        type="date"
        className="form-control "
        placeholder="Start Date"
        name="startDateFrom"
        value={props.state.startDateFrom}
        handleChange={props.handleChange}
        onClear={props.handleChange}
      />
    </FormGroup>,

    <FormGroup className="dateGroup filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomInput
        type="date"
        isDisabled={props.state.startDateFrom === null}
        className="form-control"
        placeholder="End Date"
        name="startDateTo"
        minDate={props?.state?.startDateFrom}
        value={props.state.startDateTo}
        handleChange={props.handleChange}
        onClear={props.handleChange}
      />
    </FormGroup>,
  ];

  const [maxToShow, setMaxToShow] = React.useState(2);
  const [filterContainerWidth, setFilterContainerWidth] = React.useState(0);

  // ! Scree size change hook for dynamic screen change
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
    const containerEl = document.getElementById(modWorkOrders.id);

    // ! Default width = 236
    const width = props?.width || 236;
    const filterContainerWidth = containerEl.clientWidth;
    setFilterContainerWidth(filterContainerWidth);
    // ! taking 100 as default spacing style of all
    let count = Math.floor((filterContainerWidth - 100) / width);
    count = count > 0 ? count - 1 : count;
    setMaxToShow(count || 2);
    if (props?.isModal) {
      count++;
    }
    const filterLength = FiltersList.length;

    if (count + 1 >= filterLength) {
      props.setShowMoreFilter(false);
    } else {
      props.setShowMoreFilter(true);
    }
  }, [dimensions, props?.isModal]);

  return (
    <Form className="d-flex ml-sm-1">
      <div id={modWorkOrders.id} className={`w-100 d-flex flex-wrap ${props?.isModal ? "overflow-auto" : ""}`}>
        {/* // ! search filter */}
        {([0, -1, 1, 2].includes(maxToShow) && filterContainerWidth === 0 && props.children && props.children)}
        {FiltersList.filter((elements, idx) => {
          if (props?.isModal) {
            if ([0, -1, 1, 2].includes(maxToShow) && filterContainerWidth === 0) {
              return <React.Fragment key={`${idx}-${maxToShow}`}>{elements}</React.Fragment>;
            } if (idx > maxToShow) {
              return <React.Fragment key={`${idx}-${maxToShow}`}>{elements}</React.Fragment>;
            }
          } else if (idx <= maxToShow) {
            return <React.Fragment key={`${idx}-${maxToShow}`}>{elements}</React.Fragment>;
          }
          return null;
        })}
      </div>
    </Form>
  );
});
export default WorkOrderFilter;
