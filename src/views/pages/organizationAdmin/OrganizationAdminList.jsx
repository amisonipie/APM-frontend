import React from "react";
import { useSelector } from "react-redux";
import RenderList from "views/components/RenderList";
import { columns } from "views/components/organizations/data";
import { modOrganizationAdmins } from "utility/helper/apmModules";
import { canDo, editOrganizationAdmin } from "utility/helper/permissions";
import OrganizationCardView from "views/components/organizations/CardView";

const OrganizationAdminList = React.memo(() => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  return (
    <RenderList
      isCardView
      showActions
      customCols={columns}
      isSiteFilter
      // isSmartSearch={true}
      module={modOrganizationAdmins.id}
      cardViewChild={OrganizationCardView}
      isEdit={canDo(user, editOrganizationAdmin)}
    />
  );
});

export default OrganizationAdminList;
