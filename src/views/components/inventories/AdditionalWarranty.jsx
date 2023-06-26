import { FiX } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { Col, Row, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { circleAddIcon } from "assets/icons/svgIcons";
import { dateFormat } from "utility/helper/DateFormat";
import CustomInput from "views/components/@custom/Input";
import { VF } from "utility/securePass/validatePassword";
import { fiveRandomNumbers } from "utility/transformers";
import PrimaryButton from "views/components/PrimaryButton";
import CustomSelect from "views/components/@custom/Select";

import { warrantiesIO, AWVIO } from "./data";

const AdditionalWarranty = observer((props) => {
  // AWC == Additional Warranty Coverage

  const [addAWC, setAddAWC] = useState(false);
  const [AWC, setAWC] = useState(warrantiesIO);
  const [validation, setValidation] = useState(AWVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  useEffect(() => {
    setAddAWC(
      props?.warrantyStatus === "UNDER_WARRANTY" && !props?.isDetailView,
    );
  }, [props?.warrantyStatus]);

  const handleChange = ({ key, value }) => {
    setAWC({ ...AWC, [key]: value });
    handleValidationOnChange({ key, value });
  };
  const handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    setValidation({ ...validation, [key]: response });
  };
  const saveAWC = (id) => {
    const newAWCID = fiveRandomNumbers();
    const AWCToUpdate = [...props?.warranties, { ...AWC, id: newAWCID }];

    // VO === Validation Object
    let VO = {};
    // validating All required fields
    Object.keys(AWVIO).map((item) => {
      const response = VF.validateFields({
        value: AWC[item],
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
      props.handleChange({ key: "warranties", value: AWCToUpdate });
      setAddAWC(false);
      setAWC(warrantiesIO);
    }
  };
  const CancelAWC = (id) => {
    setAddAWC(false);
    setAWC(warrantiesIO);
  };

  const getValidationObject = (key) => ({
    isValidationError,
    error: validation[key],
  });

  return (
    <Col xs="12" className="replacedParts">
      <div className="replacedParts__parts">
        <Table bordered>
          {props?.warranties?.length > 0 && (
            <thead>
              <tr>
                <th>#</th>
                <th>Coverage</th>
                <th>Start Date</th>
                <th>End Date</th>
                {!props?.isDetailView
                  && (
                    <>
                      {!props?.isDisabled ? <th /> : null}
                    </>
                  )}
              </tr>
            </thead>
          )}
          <tbody>
            {props?.warranties?.map((item, index) => (
              <tr key={index} className="">
                <td>{index + 1}</td>
                <td>{item?.warrantyCoverage?.LABEL}</td>
                <td>{dateFormat(item?.warrantyStartDate)}</td>
                <td className="text-left">
                  {dateFormat(item?.warrantyEndDate)}
                </td>
                {!props?.isDetailView
                    && (
                      <>
                        {!props?.isDisabled ? (
                          <td className="text-right">
                            <figure
                              className="dz-thumb--delete click-able"
                              onClick={() => props?.deleteAWC({ id: item?.id })}
                            >
                              <FiX fontSize={20} />
                            </figure>
                          </td>
                        ) : null}
                      </>

                    )}
              </tr>
            ))}
          </tbody>
        </Table>
        {addAWC && (!props?.isDisabled ? (
          <Row className="m-0">
            <Col xs="12">
              <h3>
                #
                {props?.warranties?.length + 1}
              </h3>
            </Col>
            <CustomSelect
              col
              required
              isDisabled={props?.isDisabled}
              name="warrantyCoverage"
              label="Warranty Coverage"
              isLoading={props?.options?.loading}
              handleChange={handleChange}
              value={AWC?.warrantyCoverage}
              options={props?.options?.inventory?.WARRANTY_COVERAGE}
              validation={getValidationObject}
            />

            <CustomInput
              col
              type="date"
              required
              label="Start Date"
              isDisabled={props?.isDisabled}
              name="warrantyStartDate"
              handleChange={handleChange}
              value={AWC.warrantyStartDate}
              validation={getValidationObject}
              customFormGroupClasses="dateGroup"
            />

            <CustomInput
              col
              type="date"
              required
              label="End Date"
              isDisabled={props?.isDisabled}
              minDate={AWC.warrantyStartDate}
              placeholder="DD/MM/YY"
              name="warrantyEndDate"
              value={AWC.warrantyEndDate}
              handleChange={handleChange}
              validation={getValidationObject}
            />
            <Col xs="12" className="row m-0 btn-group">
              <PrimaryButton
                text="Cancel"
                isDisabled={props?.isDisabled}
                customClasses=" w-50 py-2"
                onClick={CancelAWC}
              />
              <PrimaryButton
                text="Save"
                isDisabled={props?.isDisabled}
                customClasses="solid w-50 py-2"
                onClick={saveAWC}
              />
            </Col>
          </Row>
        ) : null
        )}
      </div>
      {(props?.warrantyStatus === "UNDER_WARRANTY"
        && !props?.isDetailView
        // || !props?.isDisabled
        && (
          <>
            {!props?.isDisabled ? (
              <div className="replacedParts__addPart">
                <div
                  className={`replacedParts__addPart__box ${addAWC && "active"}`}
                  onClick={() => setAddAWC(true)}
                >
                  <figure>{circleAddIcon}</figure>
                  <p>Add Warranty</p>
                </div>
              </div>
            ) : null}
          </>
        )) || <div />}
    </Col>
  );
});

export default AdditionalWarranty;
