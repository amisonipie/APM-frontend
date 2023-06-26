import React, { Fragment } from "react";
import AssignTo from "views/components/workOrders/AssignTo";

import { classification, site_model } from "utility/config";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import { getDetailPageActions, getReasonToReject, SelfAssignTo } from "views/components/workOrders/data";

import {
  workOrderApprovalQA,
  workOrderApprovalRequestor,
  workOrderApprovalSupervisor,
  workOrderAssignTechnician,
  workOrderResolveTechnician,
} from "utility/helper/endpoints";

import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Button, Form, FormGroup } from "reactstrap";
import { toggleTechnicianForm } from "redux/actions/workOrder";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "views/components/@custom/Input";
import PrimaryButton from "views/components/PrimaryButton";

function RedirectionReason(props) {
  const {
    rejection,
    formModal,
    workOrder,
    handleSubmit,
    setFormModal,
    isRedirected,
    handleRejection,
    current,
    handleModel,
    validation,
    isValidationError,
    loadingSubmission,
    closeModal,
  } = props;
  const showReason = !rejection.onRejection && isRedirected;
  // getting rejection reasons on the bases of user and steps
  const reasonToReject = getReasonToReject(workOrder);
  const dispatch = useDispatch();

  const handleCompleteWorkOrder = () => {
    dispatch(toggleTechnicianForm(true));
    setFormModal(false);
  };
  let woActionButtons = {
    1: {
      endPoint: workOrderAssignTechnician,
      texts: ["Re-Assign to", "Complete WOrkorder"],
      isDrawers: [true, false],
      showIcons: [false],
      components: ["assignTo", null],
      customClick: [false, SelfAssignTo],
    },
    3: {
      endPoint: workOrderResolveTechnician,
      texts: ["Complete Work Order"],
      isDrawers: [false],
      forceFlag: [1],
      components: [null],
      customClick: [handleCompleteWorkOrder],
    },
    4: {
      endPoint: workOrderApprovalSupervisor,
      texts: ["Reject", "Approve"],
      isDrawers: [false, false],
      components: [null, null],
    },
    5: {
      endPoint: workOrderApprovalQA,
      texts: ["Reject", "Approve"],
    },
    6: {
      endPoint: workOrderApprovalRequestor,
      texts: ["Reject", "Approve"],
    },
    array: [
      {
        flag: 0,
        comment: "",
      },
      {
        flag: 1,
        comment: "",
      },
    ],
  };

  if (current?.site_model === site_model.permanent && current?.classification === classification.generic) {
    woActionButtons = {
      2: woActionButtons[1],
      4: woActionButtons[3],
      5: woActionButtons[4],
      6: woActionButtons[5],
      array: woActionButtons.array,
    };
  }

  // makeshift

  if (current?.site_model === site_model.makeShift) {
    woActionButtons = {
      2: woActionButtons[3],
      array: woActionButtons.array,
    };
  }

  // imc

  if (current?.site_model === site_model.imc) {
    woActionButtons = {
      1: woActionButtons[1],
      3: woActionButtons[3],
      array: woActionButtons.array,
    };
  }

  if (current?.site_model === site_model.ascendServices) {
    woActionButtons = {
      1: {
        ...woActionButtons[1],
        texts: ["Re-Assign To"],
        components: ["assignTo"],
        isDrawers: [true],
        showIcons: [false],
      },
      2: {
        ...woActionButtons[1],
        texts: ["Re-Assign To", "Complete WOrkorder"],
        components: ["assignTo", false],
        isDrawers: [true, false],
        showIcons: [false, false],
      },
      array: woActionButtons.array,
    };
  }

  return (
    <Modal
      isOpen={formModal}
      toggle={() => props?.setFormModal(!formModal)}
      className="modal-dialog-centered"
      size="lg"
      style={{ maxWidth: "700px", width: "100%" }}
    >
      <ModalHeader toggle={() => setFormModal(!formModal)} className="custom-header font-weight-bold">
        {showReason ? "Redirection Reason" : "Rejection Reason"}
      </ModalHeader>
      <ModalBody>
        {showReason ? (
          <p>
            <span dangerouslySetInnerHTML={{ __html: reasonToReject }} />
          </p>
        ) : (
          <Form className="sidebarForm">
            <FormGroup>
              <CustomInput
                rows={10}
                bsSize="lg"
                type="textarea"
                customGroupClasses="w-350 mb-1 mb-lg-0"
                placeholder="write here...."
                label="Please Write the Reason for Rejection"
                eventOnChangeHandler={(e) =>
                  handleRejection({
                    key: "comment",
                    value: e.target.value,
                  })
                }
                value={rejection?.comment}
              />

              {isValidationError && <FieldValidation id="comment" validations={validation.comment} isTransparent />}
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter className="">
        {showReason ? (
          <div className="workOrder_detail__actions__btnContainer">
            {woActionButtons[current?.step]?.texts?.map((text, index) => {
              const item = woActionButtons.array[index];
              const { CustomProps } = getDetailPageActions({
                item,
                current,
                woActionButtons,
                isDisabled: false,
                index,
                handleSubmit,
                handleModel,
                state: { data: workOrder },
                btnText: text,
                isRedirectModel: true,
                loadingSubmission,
                closeModal,
              });
              return <PrimaryButton {...CustomProps} key={CustomProps.key} />;
            })}
          </div>
        ) : (
          <>
            {" "}
            <Button
              disabled={loadingSubmission?.on}
              color="danger"
              outline
              className="w-25 p-2"
              onClick={() => setFormModal(false)}
            >
              <span className="font-weight-bold">Cancel</span>
            </Button>
            <Button
              disabled={loadingSubmission?.on}
              color="success"
              className="w-25 p-2"
              onClick={() => handleSubmit({ ...rejection })}
            >
              <span className="font-weight-bold">{loadingSubmission?.on ? "Submitting..." : "Submit"}</span>
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default RedirectionReason;
