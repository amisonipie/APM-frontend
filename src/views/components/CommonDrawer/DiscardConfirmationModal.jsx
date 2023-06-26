import React from "react";
import { Button, Modal } from "react-bootstrap";
import PrimaryButton from "../PrimaryButton";
import CloseModal from "assets/icons/close-circle-PMC.svg";
import { assetWarningIcon } from "assets/icons/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import {
  editAdditionalConfirmation,
  editConfirmation,
  showDisacrdConfirmation,
} from "redux/actions/renderList/renderListAction";
import "./index.scss";
const DiscardConfirmationModal = (props) => {
  const dispatch = useDispatch();

  const { isDiscardConfirmation } = useSelector((state) => {
    return { isDiscardConfirmation: state.renderList?.isDiscardConfirmation };
  });

  return (
    <Modal
      className="Modal-main Modal-discard-confirmation"
      show={isDiscardConfirmation}
      backdrop="static"
      keyboard={false}
      backdropClassName={"showModalTop"}
      size="sm"
      centered={true}
      onHide={props.Inventories?.closeInventoriesModal}
    >
      <Modal.Header className={"borderless close_btn_modal"}>
        <Modal.Title></Modal.Title>
        <img
          src={CloseModal}
          alt="close"
          onClick={() => {
            dispatch(showDisacrdConfirmation(false));
          }}
          className="click-able"
        />
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mt-4">
          {assetWarningIcon}
          <Modal.Title className="h1 pr-4 pl-4 mt-3">
            <div className="w-100  retire-asset">
              Are You Sure?
              <p className="mt-1 mr-0 ms-0 mb-0 p-0 text-modal-discard">
                Please Select Yes if You Want to Discard Changes
              </p>
            </div>
          </Modal.Title>
        </div>
      </Modal.Body>

      <div className="d-flex mt-auto mb-3 mx-3">
        <Button
          variant="outline-danger"
          type="button"
          onClick={() => {
            dispatch(showDisacrdConfirmation(false));
          }}
          className="btn btn-outline-dange w-50 p-2 mr-1 mt-1 custom-btn-style"
        >
          <div>Cancel</div>
        </Button>
        <PrimaryButton
          onClick={() => {
            dispatch(showDisacrdConfirmation(false));
            setTimeout(()=>{
              dispatch(editConfirmation(false));
              dispatch(editAdditionalConfirmation(false))
              dispatch(commonDrawer({ isOpen: false }));
            },500)
          }}
          type="button"
          customClasses="primary solid w-50 p-2 mt-1 custom-btn-style"
          text={`Yes`}
        />
      </div>
    </Modal>
  );
};
export default DiscardConfirmationModal;
