import React from "react";
import { cloneDeep } from "lodash";
import CustomFormSwitch from "views/components/CustomSwitch/FormSwitch";

function ActivateUser({
  row,
  activeUsers,
  setActiveUsers,
  activeUsersLoading,
  handleUserActivation,
}) {
  const isActiveItem = row?.active;
  const handleChange = ({ key, value }) => {
    let checkedItems = cloneDeep({ ...activeUsers });

    checkedItems = {
      id: key,
      value,
    };

    setActiveUsers(checkedItems);
    handleUserActivation(key, value);
  };
  const switchLabel = activeUsersLoading && row?._id === activeUsers?.id
    ? "Updating..."
    : isActiveItem
      ? "Active"
      : "Disable";

  return (
    <CustomFormSwitch
      switchClasses="listing__actions__cardViewContainer__cardView--switch"
      customFormGroupClasses="mb-0"
      checked={isActiveItem}
      // isDisabled={activeUsersLoading}
      switchLabelClasses={`${isActiveItem ? "text-success" : "text-danger"}`}
      switchLabel={switchLabel}
      handleChange={(e) => {
        handleChange({ key: row?._id, value: e.target.checked });
      }}
    />
  );
}

export default ActivateUser;
