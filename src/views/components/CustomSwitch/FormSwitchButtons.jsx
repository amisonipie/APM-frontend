import React from "react";
import { observer } from "mobx-react-lite";
import { FormGroup, Label } from "reactstrap";
import PrimaryButton from "views/components/PrimaryButton";

const CustomFormSwitchButtons = observer(
  ({
    name, label, value, onSwitch, customFormGroupClasses,
  }) => (
    <FormGroup
      className={`d-flex
       justify-content-between 
       align-items-center
       ${customFormGroupClasses} 
       customSwitchParent`}
    >
      <Label className="mb-0">{label}</Label>
      <div className="customSwitchParent__buttonsContainer btn-group">
        <PrimaryButton
          text="Pass"
          customClasses={`lightGray ${value === 1 ? "solid" : ""}`}
          onClick={() => onSwitch({
            key: name,
            value: 1,
          })}
        />
        <PrimaryButton
          text="N/A"
          customClasses={`lightGray ${value === null ? "primary" : ""}`}
          onClick={() => onSwitch({
            key: name,
            value: null,
          })}
        />
        <PrimaryButton
          text="Fail"
          customClasses={`lightGray ${value === 0 ? "red" : ""}`}
          onClick={() => onSwitch({
            key: name,
            value: 0,
          })}
        />
      </div>
    </FormGroup>
  ),
);

export default CustomFormSwitchButtons;
