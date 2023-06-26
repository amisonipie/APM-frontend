import React from "react";
import { CustomInput } from "reactstrap";

function CustomSwitch({
  switchClasses,
  checked,
  handleChange,
  name,
  isDisabled,
}) {
  const id = `abcd${Math.random()}`;
  return (
    <CustomInput
      className={`customSwitch ${switchClasses}`}
      type="switch"
      id={id}
      name={name || id}
      label=""
      bsSize="lg"
      inline
      disabled={isDisabled}
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default CustomSwitch;
