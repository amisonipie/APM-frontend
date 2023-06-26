import React from "react";
import { Badge } from "reactstrap";

export const getObjectValue = ({ value }) => {
  if (value instanceof Array) {
    value = value.map((item, index) => (
      <Badge color="primary" className="mr-1" key={index}>
        {item}
      </Badge>
    ));
  }

  return value;
};
