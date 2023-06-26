import React from "react";
import { observer } from "mobx-react-lite";
import { FormGroup, Label } from "reactstrap";
import CustomSwitch from ".";

const CustomFormSwitch = observer(
  ({
    customFormGroupClasses,
    switchLabelClasses,
    switchClasses,
    switchLabel,
    label,
    checked,
    handleChange,
    name,
    isDisabled,
    switchParentClasses,
    alignItems,
    isDetailView,
  }) => (
    <FormGroup
      className={`d-flex
       justify-content-between 
       align-items-${alignItems || "center"}
       ${customFormGroupClasses} 
       customSwitchParent`}
    >
      <Label className="mb-0">{label}</Label>
      <div
        className={`
        d-flex align-items-center
        ${switchParentClasses}`}
      >
        {switchLabel && (
          <Label
            className={`customSwitchParent--label ${switchLabelClasses}`}
          >
            {switchLabel}
          </Label>
        )}
        {!isDetailView && (
          <CustomSwitch
            isDisabled={isDisabled}
            switchClasses={switchClasses}
            checked={checked}
            name={name}
            handleChange={handleChange}
          />
        )}
      </div>
    </FormGroup>
  ),
);

export default CustomFormSwitch;
