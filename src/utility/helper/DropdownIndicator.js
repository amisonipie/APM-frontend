import React from "react";
import { components } from "react-select";
import lender from "../../assets/icons/search-normal.svg";

export function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <img src={lender} style={{ height: "20px" }} />
    </components.DropdownIndicator>
  );
}
