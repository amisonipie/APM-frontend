import { site_model } from "utility/config";
import { observer } from "mobx-react-lite";
import { WorkOrderModal } from "models/workOrder";
import React, { Fragment } from "react";
import FileUploader from "views/components/DropZone";
import PrimaryButton from "views/components/PrimaryButton";
import { toggleDrop } from "views/layouts/components/navbar/data";
import FormContainer from "views/components/sidebar/FormContainer";
import { workOrderIcon } from "assets/icons/svgIcons";
import { getAssetInformation } from "views/components/workOrders/data";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import {
  Button,
  Col,
  Collapse,
  Form,
  FormGroup,
  Row,
  Table,
  Label,
} from "reactstrap";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomInput from "views/components/@custom/Input";

const WorkorderForm = observer((props) => {
  const WorkOrders = React.useMemo(() => new WorkOrderModal(props), []);

  return (
    <div>
      <Form onSubmit={WorkOrders.handleSubmit} className="sidebarForm">
        {/* Heading  */}
        <SideBarFormHeading icon={workOrderIcon} title="Create Work Order" />

        {/* Selected inventory details */}
        {WorkOrders?.inventory?.data && (
          <>
            <Button
              className={`${
                !WorkOrders?.inventory.data || WorkOrders.isOpen === false
                  ? "mb-2"
                  : "w-100 mb-0"
              }`}
              color="primary"
              onClick={WorkOrders.toggle}
              disabled={!WorkOrders?.inventory?.data}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  {!WorkOrders?.inventory?.data
                    ? "Please wait, getting asset details...."
                    : "Asset Details"}
                </span>
                <p>{toggleDrop}</p>
              </div>
            </Button>
            <Collapse isOpen={WorkOrders?.isOpen} className="mb-2">
              <div className="d-flex p-1 border">
                <Table striped dark>
                  <tbody>
                    {getAssetInformation(WorkOrders?.inventory?.data)?.map(
                      (item, index) => (
                        <tr key={index}>
                          <th scope="row">{item?.label}</th>
                          <td>{item?.value}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </Table>
              </div>
            </Collapse>
          </>
        )}

        {/* workorder details */}
        <FormContainer disableToggle>
          <Row>
            {!props?.inventory ? (
              <CustomInput
                sm="12"
                col
                type="text"
                required
                name="inventory"
                searchIcon
                isDisabled={props?.inventory}
                label="Search Inventory by ID"
                placeholder="Enter Inventory ID"
                value={WorkOrders?.state.inventory}
                handleChange={WorkOrders.handleChange}
                isLoading={WorkOrders?.inventory.loading}
                validation={WorkOrders.getValidationObject}
              />
            ) : null}

            <Col xs="12">
              <FormGroup>
                <Label className="required">Failure Description</Label>
                <CustomInput
                  bsSize="lg"
                  type="textarea"
                  placeholder={
                    WorkOrders?.user?.lab?.model === site_model.makeShift
                      ? "Write your name, phone number, department where device is located, and a description of failure."
                      : "Failure Description"
                  }
                  value={WorkOrders?.state.description}
                  rows="10"
                  eventOnChangeHandler={(e) => WorkOrders.handleChange({
                    key: "description",
                    value: e.target.value,
                  })}
                />

                {WorkOrders?.isValidationError && (
                  <FieldValidation
                    id="description"
                    validations={WorkOrders?.validation.description}
                    isTransparent
                  />
                )}
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <Label className="required">Department</Label>
                <CustomInput
                  type="text"
                  placeholder="Enter"
                  value={WorkOrders?.state.department}
                  eventOnChangeHandler={(e) => WorkOrders.handleChange({
                    key: "department",
                    value: e.target.value,
                  })}
                />

                {WorkOrders?.isValidationError && (
                  <FieldValidation
                    id="department"
                    validations={WorkOrders?.validation.department}
                    isTransparent
                  />
                )}
              </FormGroup>
            </Col>
          </Row>
        </FormContainer>
        {/* files upload */}
        <div className="fileUploadContainer">
          <FileUploader
            handleChange={(e) => WorkOrders.handleChange({ key: "uploadedFiles", value: e })}
            accept=".jpg, .jpeg, .png, .svg, .pdf, .xlsx, .xls"
            size={5000000}
            value={WorkOrders?.state.uploadedFiles}
            uploaderText="Upload"
          />
        </div>
        <PrimaryButton
          onClick={() => null}
          isDisabled={
            WorkOrders?.loading
            || WorkOrders?.inventory.loading
            || WorkOrders?.inventory.error
          }
          type="submit"
          customClasses="solid w-100 py-2"
          text={`${!WorkOrders?.loading ? "Submit" : "Submitting.."}`}
        />
      </Form>
    </div>
  );
});
export default WorkorderForm;
