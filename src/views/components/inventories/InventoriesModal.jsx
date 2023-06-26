import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import CloseModal from "assets/icons/close-circle-PMC.svg";
import { assetErrorIcon, assetWarningIcon } from "assets/icons/svgIcons";
import { inventoryStatus } from "utility/config";
import PrimaryButton from "../PrimaryButton";

const InventoriesModal = observer((props) => (
  <Modal
    className="Modal-main"
    show={props.Inventories?.inventoriesStatusModal}
    backdrop="static"
    keyboard={false}
    size="sm"
    onHide={props.Inventories?.closeInventoriesModal}
  >
    <Modal.Header className="borderless">
      <Modal.Title />
      <img
        src={CloseModal}
        alt="close"
        onClick={props.Inventories?.closeInventoriesModal}
        className="click-able"
      />
    </Modal.Header>
    <Modal.Body>
      {props.Inventories?.assetRetireConfirmation && (
        <div className="text-center mt-2">
          {assetWarningIcon}
          <Modal.Title className="h1 mt-3">
            <div className="w-75 mx-auto retire-asset">
              Are you sure you want to Retire this Asset?
            </div>
          </Modal.Title>
        </div>
      )}
      {props.Inventories?.assetRetireError && (
        <div className="text-center mt-2">
          {assetErrorIcon}
          <Modal.Title className="h1 text-danger mt-3">
            <div className="w-75 mx-auto retire-asset">
              {props?.Inventories?.isRetired
                && props?.Inventories?.state?.status?.VALUE
                  === inventoryStatus?.retired
                ? "Asset is already retired!"
                : "Please Close All Open Work Orders"}
            </div>
          </Modal.Title>
        </div>
      )}
    </Modal.Body>
    {props.Inventories?.assetRetireConfirmation && (
      <Modal.Footer className="d-block">
        <div className="d-flex mt-auto">
          <Button
            variant="outline-danger"
            type="button"
            onClick={props.Inventories?.closeInventoriesModal}
            className="btn btn-outline-dange w-50 p-2 m-1 custom-btn-style"
            isDisabled={
              props?.Inventories.loading || props?.Inventories.state?.loading
            }
          >
            <div>Cancel</div>
          </Button>
          <PrimaryButton
            onClick={props.Inventories?.handleSubmit}
            isDisabled={
              props?.Inventories.loading || props?.Inventories.state?.loading
            }
            type="button"
            customClasses="custom-primary-btn solid w-50 p-2 m-1 custom-btn-style"
            text={`${props?.Inventories.loading ? "Updating..." : "Yes"}`}
          />
        </div>
      </Modal.Footer>
    )}
    {props.Inventories?.assetRetireError && (
      <Modal.Footer className="d-block">
        <div className="d-flex mt-auto justify-content-center">
          <PrimaryButton
            onClick={props.Inventories?.closeInventoriesModal}
            type="submit"
            customClasses="custom-primary-btn solid w-50 p-2 m-1 custom-btn-style"
            isDisabled={
              props?.Inventories.loading || props?.Inventories.state?.loading
            }
            text="Okay"
          />
        </div>
      </Modal.Footer>
    )}
  </Modal>
));
export default InventoriesModal;
