import { FiX } from "react-icons/fi";
import React, { useState } from "react";
import {
  Col, Input, Row, Table,
} from "reactstrap";
import { circleAddIcon } from "assets/icons/svgIcons";
import { VF } from "utility/securePass/validatePassword";
import { fiveRandomNumbers } from "utility/transformers";
import PrimaryButton from "views/components/PrimaryButton";
import { replacedPartIO, RPVIO } from "views/components/workOrders/data";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import CustomInput from "views/components/@custom/Input";

function ReplacedParts(props) {
  // RP == Replaced Parts
  const [RP, setRP] = useState(replacedPartIO);
  const [validation, setValidation] = useState(RPVIO);
  const [isValidationError, setIsValidationError] = useState(false);

  const [addRP, setAddRP] = useState(false);
  const handleChange = ({ key, value }) => {
    setRP({ ...RP, [key]: value });
    handleValidationOnChange({ key, value });
  };
  const handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    setValidation({ ...validation, [key]: response });
  };
  const saveRP = (id) => {
    const newRPID = fiveRandomNumbers();
    const RPToUpdate = [...props?.replacedParts, { ...RP, id: newRPID }];

    // VO === Validation Object
    let VO = {};
    // validating All required fields
    Object.keys(RPVIO).map((item) => {
      const response = VF.validateFields({
        value: RP[item],
        not: true,
      });
      if (response?.length > 0) {
        VO = {
          ...VO,
          [item]: response,
        };
      }
    });
    if (Object.keys(VO).length) {
      // set validation
      setValidation(VO);
      setIsValidationError(true);
    } else {
      setIsValidationError(false);
      props.handleChange({ key: "replacedParts", value: RPToUpdate });
      setAddRP(false);
      setRP(replacedPartIO);
    }
  };
  const CancelRP = (id) => {
    setAddRP(false);
    setRP(replacedPartIO);
  };
  return (
    <div className="replacedParts">
      <div className="replacedParts__parts">
        <Table bordered>
          {props?.replacedParts?.length > 0 && (
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Part Name</th>
                <th>Part #</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th />
              </tr>
            </thead>
          )}
          <tbody>
            {props?.replacedParts?.map((item, index) => (
              <tr key={index} className="">
                {/* <td>{index + 1}</td> */}
                <td>{item?.part_name}</td>
                <td>{`${item?.part_number}`}</td>
                <td>{`SAR ${item?.cost}`}</td>
                <td>{item?.quantity}</td>
                <td className="text-right">
                  <figure
                    className="dz-thumb--delete click-able"
                    onClick={() => props?.deleteRP(item?.id)}
                  >
                    <FiX fontSize={20} />
                  </figure>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {addRP && (
          <Row className="m-0">
            <Col xs="12">
              <h3>
                #
                {props?.replacedParts?.length + 1}
              </h3>
            </Col>
            <Col xs="6">
              <CustomInput
                type="text"
                placeholder="Part Name"
                value={RP.part_name}
                eventOnChangeHandler={(e) => handleChange({
                  key: "part_name",
                  value: e?.target?.value,
                })}
              />
              {isValidationError && (
                <FieldValidation
                  id="part_name"
                  validations={validation.part_name}
                  isTransparent
                />
              )}
            </Col>
            <Col xs="6">
              <CustomInput
                type="text"
                placeholder="Part Number"
                value={RP.part_number}
                eventOnChangeHandler={(e) => handleChange({
                  key: "part_number",
                  value: e?.target?.value,
                })}
              />
              {isValidationError && (
                <FieldValidation
                  id="part_number"
                  validations={validation.part_number}
                  isTransparent
                />
              )}
            </Col>
            <Col xs="6">
              <CustomInput
                type="number"
                min="0"
                placeholder="Cost in SAR"
                value={RP.cost}
                eventOnChangeHandler={(e) => handleChange({
                  key: "cost",
                  value: e?.target?.value,
                })}
              />
              {isValidationError && (
                <FieldValidation
                  id="cost"
                  validations={validation.cost}
                  isTransparent
                />
              )}
            </Col>
            <Col xs="6">
              <CustomInput
                type="number"
                min="0"
                placeholder="Quantity"
                value={RP.quantity}
                eventOnChangeHandler={(e) => handleChange({
                  key: "quantity",
                  value: e?.target?.value,
                })}
              />
              {isValidationError && (
                <FieldValidation
                  id="quantity"
                  validations={validation.quantity}
                  isTransparent
                />
              )}
            </Col>
            <Col xs="12" className="row m-0 btn-group">
              <PrimaryButton
                text="Cancel"
                customClasses=" w-50 py-2"
                onClick={CancelRP}
              />
              <PrimaryButton
                text="Save"
                customClasses="solid w-50 py-2"
                onClick={saveRP}
              />
            </Col>
          </Row>
        )}
      </div>
      <div className="replacedParts__addPart">
        <div
          className={`replacedParts__addPart__box ${addRP && "active"}`}
          onClick={() => setAddRP(true)}
        >
          <figure>{circleAddIcon}</figure>
          <p>Add Part</p>
        </div>
      </div>
    </div>
  );
}

export default ReplacedParts;
