import Select, { components } from "react-select";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Col, Label, FormGroup, UncontrolledTooltip,
} from "reactstrap";

import { getSelectOptions } from "utility/transformers";
import { FieldValidation } from "views/components/@custom/FieldValidation";

import { getRandomUniqueID } from "views/components/generalHelper";

import "./style.scss";

const CustomSelect = observer(
  ({
    sm,
    col,
    name,
    icon,
    value,
    label,
    isMulti,
    options,
    required,
    isLoading,
    validation,
    isDisabled,
    placeholder,
    isDetailView,
    handleChange,
    customClasses,
    customOptions,
    optionsCustoms,
    debounceSearch,
    customColClasses,
    customOptionValue,
    customOptionLabel,
    SelectFormGroupClasses,
    additionalOnChangeHandler,
  }) => {
    const [selectID, setSelectID] = useState(getRandomUniqueID());
    let detailValue = "";
    const ColTag = col ? Col : "div";
    const GroupTag = label ? FormGroup : "div";
    const selectionPlaceholder = placeholder || "Select";
    const validationObj = validation ? validation?.(name) : {};
    let colTagProps = {
      className: `${customColClasses}`,
    };
    if (col) {
      colTagProps = {
        ...colTagProps,
        xs: "12",
        sm: sm || "6",
      };
    }

    // IF DETAIL VIEW GET DETAIL VALUE
    if (isDetailView) {
      detailValue = (customOptionLabel && customOptionLabel(value))
        || value?.LABEL
        || "N/A";

      colTagProps = {
        ...colTagProps,
        className: `${colTagProps.className} detailView`,
      };
    }

    // ! By default 100px
    // const [optionContainerWidth, setOptionContainerWidth] = React.useState(100);
    const [maxToShow, setMaxToShow] = React.useState(1);

    useEffect(() => {
      const el = document.getElementById(`${selectID}`);
      const selectElContainer = el?.getElementsByClassName(
        "select__value-container",
      )[0];

      const containerWidth = selectElContainer?.clientWidth;
      // setOptionContainerWidth(containerWidth || 100);

      // if (value?.length > 1) {

      // const childrenEls = Array.from(selectElContainer.childNodes);
      // const sizes = childrenEls.map(c => c.clientWidth)
      // ! 10 as initial as options have padding
      // const totalWidthOfOptions = sizes.reduce((a, c) => {
      //   if (c) {
      //     return a + c
      //   } else {
      //     return a;
      //   }
      // }, 10);
      // } else {
      //   setMaxToShow(1)
      // }
      // ! as .tags-custom has max-width is 100px
      let count = Math.floor((containerWidth - 10) / 100);
      count = count > 0 ? count - 1 : count;
      setMaxToShow(count || 1);
    }, []);

    function MoreSelectedBadge({ items }) {
      const style = {
        marginLeft: "auto",
        background: "#d4eefa",
        borderRadius: "4px",
        // fontFamily: "Open Sans",
        fontSize: "85%",
        padding: "3px",
        minWidth: "30px",
        textAlign: "center",
        marginRight: "5px",
        // paddingLeft: "12px",
        // paddingRight: "12px",
        order: 99,
      };

      const title = items.join(", ");
      const { length } = items;
      // const label = `+ ${length} Item ${length !== 1 ? "Selected" : "Selected"}`;
      const label = `+ ${length}`;

      return (
        <div style={style} title={title}>
          {label}
        </div>
      );
    }

    function MultiValue({ index, getValue, ...props }) {
      // const maxToShow = 1;
      const overflow = getValue()
        .slice(maxToShow)
        .map((x) => x.label || x.LABEL);
      return index < maxToShow ? (
        <div
          // className={ value?.length === 1 ? "tags-custom-1" : "tags-custom"}
          className={`selectedOption ${
            value?.length === 1
              ? "tags-custom-1"
              : value?.length === 2
                ? "tags-custom-2"
                : "tags-custom"
          }`}
          id={`custom-select-${name}-${index}`}
        >
          <components.MultiValue {...props} />
          {props?.data?.VALUE && (
            <UncontrolledTooltip
              placement="top"
              target={`custom-select-${name}-${index}`}
            >
              {props?.data?.LABEL}
            </UncontrolledTooltip>
          )}
        </div>
      ) : index === maxToShow ? (
        <>
          <div id={`UncontrolledTooltipExample-${name}`}>
            <MoreSelectedBadge items={overflow} />
          </div>
          <UncontrolledTooltip
            placement="top"
            target={`UncontrolledTooltipExample-${name}`}
          >
            <div className="toolp">
              {props.selectProps?.value?.map((item, indexItem) => (
                <div key={indexItem}>
                  {indexItem > 0 ? item.LABEL : null}
                </div>
              ))}
            </div>
          </UncontrolledTooltip>
          {" "}
        </>
      ) : null;
    }

    function IconDropDownIndicator(props) {
      return (
        <components.DropdownIndicator {...props}>
          {icon}
        </components.DropdownIndicator>
      );
    }

    const customComponents = () => {
      const comps = {
        IndicatorSeparator: () => null,
        MultiValue,
      };
      if (icon) {
        comps.DropdownIndicator = IconDropDownIndicator;
      }
      return comps;
    };

    return (
      <ColTag {...colTagProps}>
        <GroupTag>
          {label && (
            <Label className={`${required && !isDetailView ? "required" : ""}`}>
              {label}
            </Label>
          )}
          {!isDetailView ? (
            <FormGroup className={`${SelectFormGroupClasses}`}>
              <Select
                id={selectID}
                name={name}
                value={value}
                isMulti={isMulti}
                instanceId={name}
                isClearable
                isSearchable
                isLoading={isLoading}
                isDisabled={isDisabled}
                classNamePrefix="select"
                placeholder={selectionPlaceholder}
                getOptionValue={(e) => (customOptionValue ? customOptionValue(e) : e?.VALUE)}
                getOptionLabel={(e) => (customOptionLabel ? customOptionLabel(e) : e?.LABEL)}
                className={`Custom-select-by-m h-44 ${customClasses}`}
                options={
                  (options
                    && getSelectOptions(options, optionsCustoms || false))
                  || customOptions
                  || []
                }
                components={customComponents()}
                onInputChange={(e) => {
                  if (debounceSearch) {
                    debounceSearch(e);
                  }
                }}
                onChange={(targetValue) => {
                  if (handleChange) { handleChange({ key: name, value: targetValue }); }
                  if (additionalOnChangeHandler) {
                    additionalOnChangeHandler(targetValue);
                  }
                }}
              />
              {validationObj?.isValidationError && (
                <FieldValidation
                  validations={validationObj?.error}
                  isTransparent
                />
              )}
            </FormGroup>
          ) : (
            <p>{detailValue}</p>
          )}
        </GroupTag>
      </ColTag>
    );
  },
);

export default CustomSelect;
