import React, { Fragment, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CloseModal from "../../../assets/icons/close-circle-PMC.svg";

function PMCalendarModal(props) {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Button color="primary" className="PMC-modal-btn" onClick={handleShow}>
          <span className="data-button-span-1">
            +
            {" "}
            {props?.data?.slice(props?.size)?.length}
          </span>
          <span className="data-button-span-2">More</span>
        </Button>
      </div>
      <Modal className="PMCModal-main" show={showModal} onHide={handleClose}>
        <Modal.Header>
          <div>
            <Modal.Title>Preventive Maintenance</Modal.Title>
          </div>
          <div className="PMCModal-img-div">
            <img src={CloseModal} alt="toggle" onClick={handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <h4 className="PMCModel-h4">{props?.label}</h4>
          <div className="d-block PMCModal-data-main">
            {props?.data?.map(([item, value], index) => (
              <div className="PMCModal-data" key={index}>
                <div className="PMCModal-data-name">{item}</div>
                <div className="PMCModal-data-count">{value}</div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default PMCalendarModal;
