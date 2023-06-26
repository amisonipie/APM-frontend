import React from "react";
import ListActions from "../ListActions";
import ActivateUser from "../user/ActivateUser";

const ListColumns = ({
  customCols,
  handleDelete,
  module,
  endPoint,
  isCWO,
  isDelete,
  isEdit,
  isActivation,
  activeUsers,
  setActiveUsers,
  activeUsersLoading,
  handleUserActivation,
  resendEmail,
}) => {
  const showActions = isCWO || isDelete || isEdit;
  let columns = [...customCols];
  if (isActivation) {
    columns = [
      {
        name: "Activate",
        selector: "_id",
        sortable: true,
        width: "180px",
        cell: (row) => (
          <ActivateUser
            row={row}
            activeUsers={activeUsers}
            setActiveUsers={setActiveUsers}
            activeUsersLoading={activeUsersLoading}
            handleUserActivation={handleUserActivation}
          />
        ),
      },
      ...columns,
    ];
  }
  if (showActions) {
    columns = [
      ...columns,
      {
        name: "Actions",
        selector: "actions",
        isListing: true,
        center: true,
        width: "100px",
        cell: (row) => (
          <ListActions
            row={row}
            module={module}
            isDelete={isDelete}
            isEdit={isEdit}
            resendEmail={resendEmail}
            isCWO={isCWO} // CWO === Create Work Order
            handleDelete={handleDelete}
          />
        ),
      },
    ];
  }
  return columns;
};
export default ListColumns;
