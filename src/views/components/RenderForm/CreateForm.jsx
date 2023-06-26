/* eslint-disable multiline-ternary */
import React from "react";
import { FormGroup, Label, FormFeedback } from "reactstrap";

import RenderFields from "./RenderFields";

const CreateForm = ({
  values,
  handleChange,
  emptyField,
  options,
  finalValues,
  stepIndex,
}) => values.map((field, index) => (field.type !== "" ? (
  <FormGroup key={index} className={`${field.classes}`}>
    <Label for={field.title} className={`${field?.required && "required"}`}>
      {field.title}
    </Label>
    <RenderFields
      finalValues={finalValues}
      field={field}
      index={field.step}
      emptyField={emptyField}
      handleChange={handleChange}
      options={options}
      stepIndex={stepIndex}
    />
    <FormFeedback
      invalid={
        field.required
            && (field.value instanceof Array
              ? field.value.length === 0
              : field.value instanceof Object
                ? field.value.value === ""
                : field.value === "")
            && emptyField
          ? "true"
          : "false"
      }
    >
      {field.value instanceof Array && field.type === "selection"
        ? "Please select one option!"
        : field.value instanceof Array
          ? "Minimum One image is required!"
          : "This field is required!"}
    </FormFeedback>
  </FormGroup>
) : null));

export default CreateForm;
