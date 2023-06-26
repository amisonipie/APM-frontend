import React, { Fragment, useState } from "react";
import { dateFormat } from "utility/helper/DateFormat";
import {
  Col,
  Label,
  Input,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import { observer } from "mobx-react-lite";
import { DatePicker } from "reactstrap-date-picker";
import { TR } from "utility/transformers";
import InputMask from "react-input-mask";

import "./style.scss";
import { BiLoaderCircle } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import CustomEditor from "../Editor";

function CustomInput({
  sm,
  max,
  col,
  name,
  type,
  rows,
  icon,
  value,
  label,
  minDate,
  required,
  validation,
  isLoading,
  isDisabled,
  placeholder,
  isDetailView,
  handleChange,
  searchIcon,
  customColClasses,
  customClasses,
  customGroupClasses,
  removeSpaces,
  eventOnChangeHandler,
  additionalOnChangeHandler,
  ...rest
}) {
  const [isActive, setIsActive] = useState(false);
  let detailValue = "";
  const inputType = type || "text";
  const isDateType = inputType === "date";
  const isMaskType = inputType === "tel";
  const groupTagProps = {
    className: `${customGroupClasses} ${icon ? "input-group" : ""}`,
  };

  let inputGroupTagProps = {};
  let colTagProps = {
    className: `customInputContainer ${customColClasses}`,
  };

  if (col) {
    colTagProps = {
      ...colTagProps,
      xs: "12",
      sm: sm || "6",
    };
  }
  if (searchIcon) {
    inputGroupTagProps = {
      ...inputGroupTagProps,
      className: "custom-inputGroupTag",
    };
  }
  let customProps = {
    name,
    value,
    disabled: isDisabled,
    className: `customInput form-control ${customClasses} h-44 ${icon ? "iconInput" : ""
    } ${isActive ? "active" : ""}`,
    placeholder: placeholder || "Enter",
    ...rest,
  };
  if (rows) {
    customProps = {
      ...customProps,
      rows,
    };
  }
  if (isDateType) {
    customProps = {
      ...customProps,
      value: value ? value?.toISOString() : value,
      minDate: minDate ? minDate?.toISOString() : "",
      className: `${customProps?.className} customDatePicker h-44`,
    };
  }

  const ColTag = col ? Col : "div";
  const GroupTag = label ? FormGroup : "div";
  const InputTag = isDateType ? DatePicker : isMaskType ? InputMask : Input;
  const InputGroupTag = searchIcon ? InputGroup : Fragment;

  const validationObj = validation ? validation?.(name) : {};
  const getTargetValue = (e) => (isDateType
    ? e
      ? new Date(e)
      : e
    : type === "email" || removeSpaces
      ? TR.removeSpaces(e.target.value)
      : e?.target?.value);

  // ONLY FOR MASK INPUT
  if (isMaskType) {
    customProps = {
      ...customProps,
      mask: "+\\966 99 999 9999",
    };
  }

  const localOnChange = (e) => {
    if (handleChange) {
      handleChange({
        key: name,
        value: getTargetValue(e),
      });
    }
    if (additionalOnChangeHandler) {
      additionalOnChangeHandler(e?.target?.value || e);
    }
    if (eventOnChangeHandler) {
      eventOnChangeHandler(e);
    }
  };

  const toggleFocus = () => {
    setIsActive(!isActive);
    customProps = {
      ...customProps,
      className: `${customProps.className} ${isActive ? "active" : ""}`,
    };
  };

  // IF DETAIL VIEW GET DETAIL VALUE
  if (isDetailView) {
    detailValue = customProps.value || "N/A";

    if (isDateType) {
      detailValue =
        detailValue && detailValue !== "N/A"
          ? dateFormat(detailValue)
          : detailValue;
    }

    colTagProps = {
      ...colTagProps,
      className: `${colTagProps.className} detailView`,
    };
  }

  return (
    <ColTag {...colTagProps}>
      <GroupTag {...groupTagProps}>
        {label && (
          <Label className={`${required && !isDetailView ? "required" : ""}`}>
            {label}
          </Label>
        )}
        {!isDetailView ? (
          <>
            <InputGroupTag {...inputGroupTagProps}>
              {inputType === "textarea" ? (
                <CustomEditor
                  dir="auto"
                  max={max}
                  type={inputType}
                  {...customProps}
                  onChange={localOnChange}
                  onFocus={toggleFocus}
                  onBlur={toggleFocus}
                />
              ) : (
                <InputTag
                  dir="auto"
                  max={max}
                  type={inputType}
                  {...customProps}
                  onChange={localOnChange}
                  onFocus={toggleFocus}
                  onBlur={toggleFocus}
                />
              )}
              {searchIcon && (
                <SearchIconAddon isLoading={isLoading} isActive={isActive} />
              )}
            </InputGroupTag>

            {validationObj?.isValidationError && (
              <FieldValidation
                validations={validationObj?.error}
                isTransparent
              />
            )}
          </>
        ) : inputType === "textarea" ? (
          <p>
            <span dangerouslySetInnerHTML={{ __html: detailValue }} />
          </p>
        ) : (
          <p>{detailValue}</p>
        )}
      </GroupTag>
    </ColTag>
  );
}

export default observer(CustomInput);

export function SearchIconAddon(props) {
  const Icon = props?.isLoading ? BiLoaderCircle : RiSearchLine;
  let iconProps = {
    color: "#959db2",
    size: 25,
  };

  if (props?.isLoading) {
    iconProps = {
      ...iconProps,
      className: "reloading",
    };
  }

  return (
    <InputGroupAddon addonType="append">
      <InputGroupText className={`${props?.isActive ? "active" : ""}`}>
        <Icon {...iconProps} />
      </InputGroupText>
    </InputGroupAddon>
  );
}
