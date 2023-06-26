import React from "react";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import { userRoleIcon } from "assets/icons/svgIcons";
import {
  Col, Form, FormGroup, Label, Row,
} from "reactstrap";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import { observer } from "mobx-react-lite";
import HMCModel from "models/hmc";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";

const HMCCreate = observer((props) => {
  const HMC = React.useMemo(() => new HMCModel(props), []);

  return (
    <Form onSubmit={HMC.handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={userRoleIcon}
        title={`${HMC.idToUpdate ? "Update" : "Create"} HMC`}
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Name</Label>
              <CustomInput
                type="text"
                name="name"
                placeholder="Enter HMC name"
                value={HMC.state?.name}
                eventOnChangeHandler={(e) => {
                  HMC.handleChange({ key: "name", value: e.target.value });
                }}
              />
              {HMC.isValidationError && (
                <FieldValidation
                  id="name"
                  validations={HMC.validation?.name}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Site</Label>
              {/* <Select
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable={true}
                isDisabled={HMC.idToUpdate}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="lab_id"
                instanceId="lab_id"
                placeholder="Select"
                value={HMC.state?.lab_id}
                onChange={(value) => {
                  HMC.handleChange({ key: "lab_id", value });
                }}
                isLoading={HMC.labs?.loading}
                getOptionLabel={(item) => item?.site_name}
                getOptionValue={(item) => item?._id}
                options={HMC.labs?.data || []}
              /> */}
              <CustomSelect
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable
                isDisabled={HMC.idToUpdate}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="lab_id"
                instanceId="lab_id"
                placeholder="Select"
                value={HMC.state?.lab_id}
                optionsCustoms={{
                  value: "_id",
                  label: "site_name",
                }}
                customOptionLabel={(e) => e.site_name}
                customOptionValue={(e) => e._id}
                additionalOnChangeHandler={(value) => {
                  HMC.handleChange({ key: "lab_id", value });
                }}
                isLoading={HMC.labs?.loading}
                getOptionLabel={(item) => item?.site_name}
                getOptionValue={(item) => item?._id}
                options={HMC.labs?.data || []}
              />
              {HMC.isValidationError && (
                <FieldValidation
                  id="lab_id"
                  validations={HMC.validation.lab_id}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Type</Label>
              {/* <Select
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable={true}
                isDisabled={HMC.idToUpdate}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="type"
                instanceId="type"
                placeholder="Select"
                value={HMC.state?.type}
                onChange={(value) => {
                  HMC.handleChange({ key: "type", value });
                }}
                isLoading={HMC.options.loading}
                options={
                  Object?.keys(HMC.options?.data?.type || {})?.map((item) => {
                    return { label: item, value: HMC.options?.data?.type[item] };
                  }) || []
                }
              /> */}
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                isDisabled={HMC.idToUpdate}
                name="type"
                instanceId="type"
                placeholder="Select"
                value={HMC.state?.type}
                additionalOnChangeHandler={(value) => {
                  HMC.handleChange({ key: "type", value });
                }}
                optionsCustoms={{
                  value: "value",
                  label: "label",
                }}
                customOptionLabel={(e) => e.label}
                customOptionValue={(e) => e.value}
                isLoading={HMC.options.loading}
                options={
                  Object?.keys(HMC.options?.data?.type || {})?.map((item) => ({ label: item, value: HMC.options?.data?.type[item] })) || []
                }
              />
              {HMC.isValidationError && (
                <FieldValidation
                  id="type"
                  validations={HMC.validation.type}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
        </Row>
      </FormContainer>

      <PrimaryButton
        onClick={() => null}
        isDisabled={HMC.loading || HMC.state?.loading}
        type="submit"
        customClasses="solid w-100 py-2"
        text={`${!HMC.loading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
});
export default HMCCreate;
