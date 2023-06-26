import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { PAGE } from "utility/helper/constants";
import { history } from "utility/helper/history";
import { splitData } from "utility/transformers";

const PrimaryButton = observer(
  ({
    onClick,
    isDisabled,
    icon,
    text,
    customClasses,
    customIconClasses,
    customTextClasses,
    toolTip,
    toolTipText,
    type,
  }) => (
    <>
      <Button
        type={type || "button"}
        color="primary"
        className={`custom-primary-btn click-able ${customClasses}`}
        onClick={(e) => {
          if (onClick) onClick(e);
          // ! added this localstorage event to handle the previous and current url location
          const currentPath = localStorage.getItem(PAGE.CURRENT);
          localStorage.setItem(PAGE.PREVIOUS, currentPath);
          localStorage.setItem(PAGE.CURRENT, history?.location?.pathname);
        }}
        disabled={isDisabled}
        id={toolTip}
      >
        {icon && (
          <figure className={`custom-primary-btn--icon ${customIconClasses}`}>
            {icon}
          </figure>
        )}

        {text && (
          <div
            className={`custom-primary-btn--text ${customTextClasses} ${
              !icon ? "ml-0" : ""
            }`}
          >
            {text}
          </div>
        )}
      </Button>
      {toolTip && (
        <UncontrolledTooltip placement="bottom" target={toolTip}>
          {toolTipText || splitData(toolTip, "_", " ")}
        </UncontrolledTooltip>
      )}
    </>
  ),
);

export default PrimaryButton;
