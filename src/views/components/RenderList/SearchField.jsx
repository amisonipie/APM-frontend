import React from "react";
import { useSelector } from "react-redux";
import {
  modInventories,
  modUsers,
  modWorkOrders,
} from "utility/helper/apmModules";
import CustomInput from "views/components/@custom/Input";

function SearchField(props) {
  const { moduleFilterData } = useSelector((state) => ({
    moduleFilterData: state?.renderList?.filterSideBarRight[props.module] || {},
  }));

  const [keyword, setKeyword] = React.useState(moduleFilterData?.filteredFields?.keyword ?? "");

  // const getStoreFilterData = () => {
  //   if (moduleFilterData?.localStateFilteredFields) {
  //     let filteredData = JSON.parse(moduleFilterData?.localStateFilteredFields);

  //     filteredData.startDateFrom = filteredData?.startDateFrom ? new Date(filteredData?.startDateFrom) : "";
  //     filteredData.startDateTo = filteredData?.startDateTo ? new Date(filteredData?.startDateTo) : "";

  //     return filteredData;
  //   }
  //   return {};
  // }
  // const getStoreUIFilterData = () => {
  //   if (moduleFilterData?.uiTabFilteredFields) {
  //     return moduleFilterData?.uiTabFilteredFields;
  //   }
  //   return {};
  // }

  const handleChange = (e) => {
    const value = e instanceof Object ? "" : e;
    setKeyword(value);
    props.bouncer(value);

    // const uiFilters = getStoreUIFilterData()
    // let localData = getStoreFilterData();
    // const stateToSubmit = cloneDeep({ ...localData });
    // const data = cloneDeep(TR.dataToSubmit(stateToSubmit));
    // data["keyword"] = value;

    // store.dispatch(
    //   filterListingData({
    //     filteredData: data,
    //     localState: data,
    //     module: props?.module,
    //     uiTabFilteredData: uiFilters
    //   })
    // );
  };

  const getPlaceHolder = () => {
    switch (props?.module) {
    case modInventories.id:
      return "Search by Asset";
    case modWorkOrders.id:
      return "Search by Work Orders ID";
    case modUsers.id:
      return "Search by Users";
    default:
      return "Search here";
    }
  };

  return (
    <CustomInput
      searchIcon
      name="filter"
      type="text"
      value={keyword}
      customColClasses={props?.customColClasses}
      customGroupClasses={`w-350 mb-lg-0 mt-1 mt-lg-0 ${props.customGroupClasses}`}
      placeholder={getPlaceHolder()}
      additionalOnChangeHandler={handleChange}
    />
  );
}

export default SearchField;
