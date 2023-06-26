import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { columns } from "views/components/user/data";
import { modUsers } from "utility/helper/apmModules";
import {
  activateUser,
  canDo,
  createUser,
  editUser,
  userViewMedicalNonMedical,
} from "utility/helper/permissions";
import { canDoDirect } from "utility/helper/directPermissions";
import { IOFilter } from "models/user";

const UserList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      module={modUsers.id}
      customCols={columns}
      isSmartSearch
      isCreate={canDo(user, createUser)}
      // isDelete={canDo(user, deleteUser)}
      isEdit={canDo(user, editUser)}
      filtersIO={IOFilter}
      showActions
      isActivation={canDo(user, activateUser)}
      resendEmail
      isSiteFilter
      isFilter
      hideMoreFilters
      isClassificationFilter={canDoDirect(user, userViewMedicalNonMedical)}
    />
  );
});

export default UserList;
