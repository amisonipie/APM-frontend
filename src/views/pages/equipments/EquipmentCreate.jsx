import React from "react";
import { FiTool } from "react-icons/fi";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import {
  Col, Form, FormGroup, Label, Row,
} from "reactstrap";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import { observer } from "mobx-react-lite";
import EquipmentModel from "models/equipment";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";

const EquipmentCreate = observer((props) => {
  const Equipment = React.useMemo(() => new EquipmentModel(props), []);

  return (
    <Form onSubmit={Equipment.handleSubmit} className="sidebarForm">
      {/* Heading   */}
      <SideBarFormHeading
        icon={<FiTool />}
        title={`${Equipment.idToUpdate ? "Update" : "Create"} Asset`}
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Name (English)</Label>
              <CustomInput
                type="text"
                name="nameEnglish"
                placeholder="Enter name in English"
                value={Equipment.state.nameEnglish}
                eventOnChangeHandler={(e) => {
                  Equipment.handleChange({ key: "nameEnglish", value: e.target.value });
                }}
              />
              {Equipment.isValidationError && (
                <FieldValidation
                  id="nameEnglish"
                  validations={Equipment.validation.nameEnglish}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="">Name (Arabic)</Label>

              <CustomInput
                type="text"
                name="nameArabic"
                placeholder="Enter name in Arabic"
                value={Equipment.state.nameArabic}
                eventOnChangeHandler={(e) => {
                  Equipment.handleChange({ key: "nameArabic", value: e.target.value });
                }}
              />
              {/* {isValidationError && (
                <FieldValidation
                  id="nameArabic"
                  validations={validation.nameArabic}
                  isTransparent={true}
                />
              )} */}
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Classification Level</Label>
              <CustomInput
                type="text"
                name="levelClassification"
                placeholder="Enter Classification Level"
                value={Equipment.state.levelClassification}
                eventOnChangeHandler={(e) => {
                  Equipment.handleChange({
                    key: "levelClassification",
                    value: e.target.value,
                  });
                }}
              />
              {Equipment.isValidationError && (
                <FieldValidation
                  id="levelClassification"
                  validations={Equipment.validation.levelClassification}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Type</Label>
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                isDisabled={Equipment.idToUpdate}
                name="field"
                instanceId="field"
                placeholder="Select"
                value={Equipment.state?.type}
                isLoading={Equipment.options.loading}
                options={Object?.values(Equipment.options?.data?.type || {})}
                additionalOnChangeHandler={(value) => {
                  Equipment.handleChange({ key: "type", value });
                }}
              />
              {Equipment.isValidationError && (
                <FieldValidation
                  id="type"
                  validations={Equipment.validation.type}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
        </Row>
      </FormContainer>
      {/* create/update equipment submit */}
      <PrimaryButton
        onClick={() => null}
        isDisabled={Equipment.loading || Equipment.state?.loading}
        type="submit"
        customClasses="solid w-100 py-2"
        text={`${!Equipment.loading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
});
export default EquipmentCreate;
