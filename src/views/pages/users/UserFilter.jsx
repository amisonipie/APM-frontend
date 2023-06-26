import React, { useEffect } from "react";
import UserModel from "models/user";
import { observer } from "mobx-react-lite";
import { Form, FormGroup } from "reactstrap";
import CustomSelect from "views/components/@custom/Select";
import { modUsers } from "utility/helper/apmModules";

const UserFilter = observer((props) => {
  const Users = React.useMemo(() => new UserModel(), []);

  React.useEffect(() => {
    Users.getLabs({});
  }, []);

  React.useEffect(() => {
    if (Users.user?._id) Users.getRoles({});
  }, [Users.user]);

  const FiltersList = [
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect

        sm="12"
        isSearchable
        placeholder="Select Sites"
        name="site_ids"
        isMulti
        value={props?.state?.site_ids}
        isLoading={Users.labs.loading}
        debounceSearch={Users.findLabs}
        handleChange={props.handleChange}
        isClearable
        options={Users.labs?.data}
        optionsCustoms={{
          value: "_id",
          label: "site_name",
        }}
      />
    </FormGroup>,
    <FormGroup className="filters_select w-350 h-44 mr-0 mr-md-1">
      <CustomSelect

        sm="12"
        isSearchable
        placeholder="Select Roles"
        name="roles"
        isMulti
        value={props?.state?.roles}
        isLoading={Users.roles.loading}
        handleChange={props.handleChange}
        isClearable
        options={Users.roles?.data}
        optionsCustoms={{
          value: "role",
          label: "name",
        }}
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
    const containerEl = document.getElementById(modUsers.id);
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
    <Form className="d-flex ml-sm-1 h-100">
      <div id={modUsers.id} className={`w-100 d-flex flex-wrap  ${props?.isModal ? "flex-column overflow-auto h-100" : ""}`}>
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
export default UserFilter;
