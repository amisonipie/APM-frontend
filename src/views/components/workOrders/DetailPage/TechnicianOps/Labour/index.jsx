import React from "react";
import { getUserRole } from "views/components/generalHelper";
import userAvatar from "assets/img/profile/UserImage/avatar.png";
import {
  Card, CardBody, Col, Label, Row,
} from "reactstrap";
import Avatar from "views/components/@vuexy/avatar/AvatarComponent";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import CustomInput from "views/components/@custom/Input";

function Labour({
  workorder,
  user,
  state,
  handleChange,
  isValidationError,
  validation,
}) {
  return (
    <Row className="m-0">
      <Col lg="12">
        <Label className=" technician-label">
          {`${user?.name || getUserRole(workorder?.work_order_steps?.technician_user?.role)}`}
        </Label>

        <Card>
          <CardBody className="LabourCards">
            <div className="labour__row">
              <div className="labour__row__user d-sm-flex">
                <Avatar
                  className="labour__row__user--avatar"
                  img={userAvatar}
                />
                <div className=" d-sm-flex labour__row__user__infoContainer">
                  {" "}
                  <p className="labour__row__user__infoContainer--userName">
                    {workorder?.work_order_steps?.technician_user?.name}
                  </p>
                  <p className="labour__row__user__infoContainer--text">
                    <span>
                      {getUserRole(
                        workorder?.work_order_steps?.technician_user?.role,
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col lg="12" className="pr-0">
        <Label className="required">Total Hrs/min </Label>
        <Card>
          <CardBody className="LabourCards time">
            <CustomInput
              name="hours"
              type="number"
              placeholder="Hrs"
              value={state.hours}
              min="0"
              max="99"
              eventOnChangeHandler={(e) => {
                const { value } = e.target;
                if (value >= 0 && value <= 99) {
                  handleChange({
                    key: "hours",
                    value: e.target.value,
                  });
                }
              }}
            />
            <strong className="mx-1 stick">:</strong>
            <CustomInput
              name="minutes"
              type="number"
              placeholder="Min"
              value={state.minutes}
              max="59"
              min="0"
              eventOnChangeHandler={(e) => {
                const { value } = e.target;
                if (value >= 0 && value <= 59) {
                  handleChange({
                    key: "minutes",
                    value,
                  });
                }
              }}
            />
          </CardBody>
        </Card>

        {isValidationError && (
          <FieldValidation
            id="actionTaken"
            validations={
              validation.minutes?.length > 0
                ? validation.minutes
                : validation.hours
            }
            isTransparent
          />
        )}
      </Col>
    </Row>
  );
}

export default Labour;
