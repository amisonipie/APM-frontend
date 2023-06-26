/* eslint-disable multiline-ternary */
import React from "react";
import { Input } from "reactstrap";
import InputMask from "react-input-mask";
import Uploader from "views/components/DropZone";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "../@custom/Select";

function RenderFields({
  field,
  index,
  handleChange,
  emptyField,
  options,
  finalValues,
  stepIndex,
}) {
  switch (field.type) {
  case "selection":
    const optionsList = field.options
      ? field.options
      : field.listName === "regionsList"
        ? options.regions.data
        : field.listName === "hmcsList"
          ? options.hmcs.data
          : field.listName === "labsList"
            ? options.labs.data
            : field.listName === "departmentsList"
              ? options.departments.data
              : field.listName === "equipmentsList"
                ? options.equipments.data
                : field.listName === "rolesList"
                  ? options.roles.data
                  : options.data;

    const optionsLoading = field.options
      ? false
      : field.listName === "regionsList"
        ? options.regions.loading
        : field.listName === "hmcsList"
          ? options.hmcs.loading
          : field.listName === "labsList"
            ? options.labs.loading
            : field.listName === "departmentsList"
              ? options.departments.loading
              : field.listName === "equipmentsList"
                ? options.equipments.loading
                : field.listName === "rolesList"
                  ? options.roles.loading
                  : options.loading;
    return (
      <>
        {/* <Select
            className="basic-single text-capitalize"
            classNamePrefix="select"
            isSearchable={true}
            name={field.name}
            instanceId={field.name}
            placeholder={field.placeholder}
            // value={field.value}
            value={finalValues[field.name]}
            isMulti={field.isMulti}
            onChange={(value) => {
              handleChange({
                fieldStep: index,
                stepIndex: stepIndex,
                key: field.name,
                value: value ? value : field.isMulti ? [] : {},
              });
            }}
            isLoading={optionsLoading}
            options={optionsList}
          /> */}
        <CustomSelect
          customClasses="basic-single text-capitalize"
          isSearchable
          name={field.name}
          instanceId={field.name}
          placeholder={field.placeholder}
          // value={field.value}
          value={finalValues[field.name]}
          isMulti={field.isMulti}
          optionsCustoms={{
            value: "value",
            label: "key",
          }}
          customOptionLabel={(e) => e.key}
          customOptionValue={(e) => e.value}
          additionalOnChangeHandler={(value) => {
            handleChange({
              fieldStep: index,
              stepIndex,
              key: field.name,
              value: value || (field.isMulti ? [] : {}),
            });
          }}
          isLoading={optionsLoading}
          options={optionsList}
        />
        <Input
          type="hidden"
          name={field.name}
          invalid={
            field.required
              && ((finalValues[field.name] === null
                ? true
                : finalValues[field.name]?.length === 0)
                || finalValues[field.name]?.value === "")
              && (emptyField || finalValues[field.name] === null)
              && true
          }
        />
      </>
    );

  case "file":
    return (
      <>
        <Uploader
          // value={field.value}
          value={finalValues[field.name]}
          name={field.name}
          handleChange={handleChange}
          step={index}
          stepIndex={stepIndex}
          url={field.url}
          single={field.single}
          size={5000000}
          fileUploadName={field.fileUploadName}
        />
        <Input
          type="hidden"
          name={field.name}
          invalid={
            field.required
              && finalValues[field.name]?.length === 0
              && emptyField
              && true
          }
        />
      </>
    );
  case "phone":
    return (
      <>
        <InputMask
          className="form-control"
          name={field.name}
          id={field.title}
          placeholder={field.placeholder}
          value={finalValues[field.name]}
          onChange={(e) => handleChange({
            fieldStep: index,
            stepIndex,
            key: field.name,
            value: e.target.value,
          })}
          mask={"+\\966 99 999 9999"}
          type="tel"
        />
        <Input
          type="hidden"
          name={field.name}
          invalid={
            field.required
              && finalValues[field.name] === ""
              && emptyField
              && true
          }
        />
      </>
    );
  default:
    return (
      <CustomInput
        name={field.name}
        type={field.type}
        id={field.title}
        customGroupClasses=""
        customClasses="d-block"
        placeholder={field.placeholder}
        value={finalValues[field.name]}
        label
        eventOnChangeHandler={(e) => handleChange({
          fieldStep: index,
          stepIndex,
          key: field.name,
          value:
                field.type === "number"
                  ? Number(e.target.value)
                  : e.target.value,
        })}
        rows="5"
        maxLength={field.maxLength || ""}
        invalid={
          field.required
            && finalValues[field.name] === ""
            && emptyField
            && true
        }
      />
    );
  }
}

export default RenderFields;
