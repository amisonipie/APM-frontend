import React from "react";
import { observer } from "mobx-react-lite";

const FieldValidation = observer(({ validations, isTransparent }) => (validations?.length ? (
  <ul className={`fieldValidation ${isTransparent && "isTransparent"}`}>
    {validations?.map((item, index) => <li key={index}>{item?.message}</li>)}
  </ul>
) : (
  <div />
)));

export { FieldValidation };
