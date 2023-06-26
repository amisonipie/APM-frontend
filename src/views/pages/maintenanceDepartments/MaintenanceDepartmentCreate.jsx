import React from "react";
import { Form, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { observer } from "mobx-react-lite";
import { MaintenanceDepartmentIcon } from "assets/icons";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import { MaintenanceDepartmentModel } from "models/maintenanceDepartment";
import SideBarFormHeading from "views/components/sidebar/FormHeading";

const MaintenanceDepartmentCreate = observer((props) => {
  const dispatch = useDispatch();
  const MD = React.useMemo(
    () =>
      new MaintenanceDepartmentModel({ id: props?.row, callSites: true }),
    []
  );

  return (
    <Form onSubmit={MD.handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={MaintenanceDepartmentIcon}
        title={`${MD.idToUpdate ? "Update" : "Create"} Maintenance Department`}
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <CustomInput
            sm="12"
            col
            name="name"
            required
            value={MD.state.name}
            label="Department name"
            handleChange={MD.handleChange}
            placeholder="Enter maintenance department name"
            validation={MD.getValidationObject}
          />

          {/* {MD.canSelectSite && ( */}
          <CustomSelect
            sm="12"
            col
            label="Site"
            name="site_id"
            required
            options={MD.labs.data}
            value={MD.state.site_id}
            isDisabled={MD.idToUpdate}
            isLoading={MD.labs.loading}
            handleChange={MD.handleChange}
            // debounceSearch={MD.searchSites}
            validation={MD.getValidationObject}
          />
          {/* )} */}
        </Row>
      </FormContainer>

      <PrimaryButton
        type="submit"
        customClasses="solid w-100 py-2"
        isDisabled={MD.submitLoading || MD.state.loading}
        text={`${!MD.submitLoading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
});
export default MaintenanceDepartmentCreate;
