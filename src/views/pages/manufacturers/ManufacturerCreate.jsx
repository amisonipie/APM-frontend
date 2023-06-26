import { FaUsersCog } from "react-icons/fa";
import React from "react";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import {
  Col, Form, FormGroup, Label, Row,
} from "reactstrap";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import { observer } from "mobx-react-lite";
import ManufacturerModel from "models/manufacturer";
import CustomInput from "views/components/@custom/Input";

const ManufacturerCreate = observer((props) => {
  const Manufacturer = React.useMemo(() => new ManufacturerModel(props), []);

  return (
    <Form onSubmit={Manufacturer.handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={<FaUsersCog />}
        title={`${Manufacturer.idToUpdate ? "Update" : "Create"} Manufacturer`}
      />
      {/* manufacture create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Name</Label>
              <CustomInput
                type="text"
                name="name"
                placeholder="Enter Manufacturer name"
                value={Manufacturer.state?.name}
                eventOnChangeHandler={(e) => {
                  Manufacturer.handleChange({ key: "name", value: e.target.value });
                }}
              />
              {Manufacturer.isValidationError && (
                <FieldValidation
                  id="name"
                  validations={Manufacturer.validation?.name}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
        </Row>
      </FormContainer>
      {/* manufacture submit btn */}
      <PrimaryButton
        onClick={() => null}
        isDisabled={Manufacturer.loading || Manufacturer.state?.loading}
        type="submit"
        customClasses="solid w-100 py-2"
        text={`${!Manufacturer.loading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
});
export default ManufacturerCreate;
