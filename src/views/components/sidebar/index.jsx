import React from "react";
import PrimaryButton from "views/components/PrimaryButton";

export default function TemporaryDrawer(props) {
  console.log(props);
  return (
    <>
      <div id={props?.id || "drawer"} className="OLD_DRAWER">
        {props?.showDrawerToggler && (
          <PrimaryButton
            isDisabled={props?.isDisabled}
            text={props?.text}
            icon={props?.icon}
            toolTip={props?.toolTip}
            customClasses={props?.customClasses}
            customTextClasses={props?.customTextClasses}
            customIconClasses={props?.customIconClasses}
            onClick={props.onClick}
          />
        )}
      </div>
    </>
  );
}
