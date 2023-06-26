import { Input, Label } from "reactstrap";
import React, { useState } from "react";

const CustomRadio = () => {
  const [type, setType] = useState([]);

  const navbarTypeArr = [
    {
      name: "medical",
      label: "Medical",
      checked: type === "medical",
    },
    {
      name: "non-medical",
      label: "Non-Medical",
      checked: type === "non-medical",
    },
    {
      name: "all",
      label: "All",
      checked: type === "all",
    },
  ];

  return navbarTypeArr.map((radio, index) => (
    <div key={index} className="form-check d-flex">
      <Input
        type="radio"
        id={radio.name}
        checked={radio.checked}
        onChange={() => setType(radio.name)}
        disabled={disabled}
      />
      <Label className="form-check-label mr-4 ml-1" for={radio.name}>
        {radio.label}
      </Label>
    </div>
  ));
};
export default CustomRadio;
