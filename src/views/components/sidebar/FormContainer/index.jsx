import React, { useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import HeadingIC from "views/components/Heading";

function FormContainer({
  icon,
  label,
  children,
  disableToggle,
  open = true,
  toggleIconOpen,
  toggleIconClose,
}) {
  const [container, showContainer] = useState(open);
  const toggle = () => showContainer(!container);
  const OpenContainerIcon = toggleIconOpen || FiChevronUp;
  const CloseContainerIcon = toggleIconClose || FiChevronUp;
  const ToggleIcon = !container ? OpenContainerIcon : CloseContainerIcon;
  return (
    <div className={`formContainer Workorder_Form_container ${container && "show"}`}>
      {!disableToggle && (
        <div className="col-12 formContainer__heading">
          {(icon || label) && (
            <HeadingIC
              className="formContainer__heading__IC"
              icon={icon}
              label={label}
            />
          )}
          <ToggleIcon
            size={25}
            className="formContainer__heading--toggler"
            onClick={toggle}
          />
        </div>
      )}
      {children}
    </div>
  );
}

export default FormContainer;
