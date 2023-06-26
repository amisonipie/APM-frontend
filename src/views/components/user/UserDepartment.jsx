import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import CloseModal from "../../../assets/icons/close-circle-PMC.svg";

import "./style.scss";

function UserDepartmentModel(props) {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {props?.isEdit === false
        && (
          <>
            <div onClick={handleShow}>
              <span className="cursor-pointer number-text">
                {props?.data?.slice(props?.size)?.length <= 9 ? `0${props?.data?.slice(props?.size)?.length}` : props?.data?.slice(props?.size)?.length}

              </span>
            </div>

            <Modal className="PMCModal-main" show={showModal} onHide={handleClose}>
              <Modal.Header>
                <div>
                  <Modal.Title>{props.fieldName}</Modal.Title>
                </div>
                <div className="PMCModal-img-div">
                  <img src={CloseModal} alt="toggle" onClick={handleClose} />
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="d-block PMCModal-data-main-modal">
                  {props.sites === "sites" ? (
                    <>
                      {props?.data?.map((item, index) => (
                        <div className="PMCModal-data-box" key={index}>
                          <div className="PMCModal-data-name">{item.site_name}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {props?.data?.map((item, index) => (
                        <div className="PMCModal-data-box" key={index}>
                          <div className="PMCModal-data-name">{item.name}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
    </>
  );
}
export default UserDepartmentModel;
