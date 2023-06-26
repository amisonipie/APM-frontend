import {
  dashboardViewMedicalNonMedical,
  inventoryViewMedicalNonMedical,
  userViewMedicalNonMedical,
  workorderViewMedicalNonMedical,
} from "./permissions";

const super_admin_allowed_permissions = [
  dashboardViewMedicalNonMedical,
  userViewMedicalNonMedical,
  inventoryViewMedicalNonMedical,
  workorderViewMedicalNonMedical,
];

export const canDoDirect = (user, actionToPerform) => {
  let isAuthorized = false;
  const isSuperAdmin = user?.role === "super_admin";
  const caseArr = actionToPerform instanceof Array ? actionToPerform : [actionToPerform];

  if (isSuperAdmin) {
    isAuthorized = caseArr?.some((r) => super_admin_allowed_permissions?.includes(r));
  } else {
    isAuthorized = user?.direct_permissions?.some((r) => caseArr?.includes(r));
  }

  return isAuthorized;
};
