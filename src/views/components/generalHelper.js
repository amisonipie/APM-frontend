import { classification, site_model } from "utility/config";
import {
  closedIcon,
  hospitalIcon,
  helpDeskIcon,
  userRoleIcon,
  workOrderIcon,
  technicianIcon,
  requesterIcon,
} from "assets/icons/svgIcons";
import { classificationTabs, PAGE } from "utility/helper/constants";
import {
  userViewMedical,
  userViewMedicalNonMedical,
  userViewNonMedical,
} from "utility/helper/permissions";

export const getIcon = (type) => {
  switch (type) {
  case "requestor":
    return requesterIcon;
  case "hmc_technician":
    return technicianIcon;
  case "hmc_supervisor":
    return userRoleIcon;
  case "engineer":
    return hospitalIcon;
  case "closed":
    return closedIcon;
  case "helpdesk":
    return helpDeskIcon;
  default:
    return workOrderIcon;
  }
};

export const getField = (field) => {
  switch (field) {
  case "nonmedical":
    return "Non Medical";
  case "medical":
    return "Medical";
  default:
    return "Generic";
  }
};

// GETTING USER CLASSIFICATION FROM DIRECT PERMISSIONS
export const getUserClassification = (directPermissions) => {
  switch (true) {
  case directPermissions.includes(userViewMedical):
    return classificationTabs.MEDICAL.tabId; // MEDICAL
  case directPermissions.includes(userViewNonMedical):
    return classificationTabs.NONMEDICAL.tabId; // NONMEDICAL
  case directPermissions.includes(userViewMedicalNonMedical):
    return classificationTabs.MEDICALNONMEDICAL.tabId; // MEDICAL_NONMEDICAL
  default:
    return "";
  }
};

export const getUserRole = (role) => {
  switch (role) {
  case "super_admin":
    return "Super Admin";
  case "site_admin":
    return "Site Admin";
  case "staff":
    return "Staff";
  case "engineer":
    return "MoH Engineer";
  case "hmc_admin":
    return "HMC Admin";
  case "hmc_technician":
    return "HMC Technician";
  case "hmc_supervisor":
    return "HMC Supervisor";
  case "helpdesk":
    return "Helpdesk";
  case "organization_admin":
    return "Organization Admin";

  case "guest":
    return "Guest";
  default:
    return "N/A";
  }
};
export const getUserType = ({ step, woClassification, siteModel }) => {
  let userType = {
    1: {
      label: "HMC Supervisor",
      type: "hmc_supervisor",
      icon: getIcon("hmc_supervisor"),
    }, // assigning
    2: {
      label: "HMC Technician",
      type: "hmc_technician",
      icon: getIcon("hmc_technician"),
    }, // acceptance
    3: {
      label: "HMC Technician",
      type: "hmc_technician",
      icon: getIcon("hmc_technician"),
    }, // completion
    4: {
      label: "HMC Supervisor Approval",
      type: "hmc_supervisor",
      icon: getIcon("hmc_supervisor"),
    }, // approval
    5: { label: "Hospital QA", type: "engineer", icon: getIcon("engineer") }, // approval
    6: {
      label: "Service Requester",
      type: "requester",
      icon: getIcon("requester"),
    }, // approval
    7: { label: "Work Order Closed", type: "closed", icon: getIcon("closed") }, // close
  };

  if (
    siteModel === site_model.permanent
    && woClassification === classification.generic
  ) {
    userType = {
      1: { label: "Help Desk", type: "helpdesk", icon: getIcon("helpdesk") }, // assigning
      2: userType[1], // assigning
      3: userType[2], // acceptance
      4: userType[2], // completion
      5: userType[1], // approval
      6: userType[5], // approval
      7: userType[7], // close
    };
  }

  if (siteModel === site_model.makeShift) {
    userType = {
      1: userType[1],
      2: userType[1],
      3: userType[5],
      4: userType[7],
    };
  }
  if (siteModel === site_model.imc) {
    userType = {
      1: userType[1],
      2: userType[2],
      3: userType[2],
      4: userType[6],
      5: userType[7],
    };
  }
  return userType[step];
};

export const getColor = (status) => {
  const woColor = {
    opened: "green",
    responded: "brown_dark",
    in_progress: "yellow",
    solved: "green_dark",
    supervisor_approved: "purple",
    qa_approved: "blue",
    closed: "black",
    reopened: "red_dark",
    rejected: "red",
    redirected: "red",
    assigned: "brown",
  };
  return woColor[status];
};

export const getStatus = (status, siteModel) => {
  let woStatus = {
    opened: "Opened",
    responded: "Responded",
    in_progress: "In Progress",
    solved: "Solved",
    supervisor_approved: "Supervisor Approved",
    qa_approved: "QA Approved",
    closed: "Closed",
    reopened: "Re Opened",
    rejected: "Rejected",
    redirected: "Redirected",
    assigned: "Assigned",
    awaiting_maintenance: "Awaiting Maintenance",
    maintenance_completed: "Maintenance Completed",
  };

  if (siteModel && siteModel === site_model.makeShift) {
    woStatus = {
      ...woStatus,
      opened: "Awaiting Maintenance",
      solved: "Maintenance Completed",
    };
  } else if (siteModel && siteModel === site_model.imc) {
    woStatus = {
      ...woStatus,
      opened: "Awaiting Maintenance",
      solved: "Requestor Approval",
    };
  }

  return woStatus[status];
};

export const getICS = {
  NOT_WORKING: "Down for maintenance",
  WORKING: "Working",
};

export const getIS = {
  IN_SERVICE: "In Service",
  RETIRED: "Retired",
};
export const getWarrantyStatus = {
  OUT_OF_WARRANTY: "Out of Warranty",
  UNDER_WARRANTY: "Under Warranty",
};

export const getRandomUniqueID = (length = 10) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isSameModule = (pathname = null) => {
  let is = false;

  // ! Pervious and Current Path Params for module filtering reset purpose
  const previous = localStorage.getItem(PAGE.PREVIOUS);
  const current = localStorage.getItem(PAGE.CURRENT);

  const previousModule = previous?.split("/")?.[1];
  const currentModule = current?.split("/")?.[1];

  // ! added this extra condition if localstorage getItem might delay
  // ! and possibly we get false even if modules are same
  if (pathname) {
    const temp = pathname?.split("/")?.[1];

    if (temp === previousModule) {
      is = true;
    }
  } else if (previousModule === currentModule) {
    is = true;
  }
  return is;
};
export const getModuleName = (pathname = null) => {
  let path = "";
  if (typeof pathname === "string") {
    path = pathname?.split("/")?.[1];
  } else if (typeof pathname === "object") {
    path = pathname?.location?.pathname?.split("/")?.[1];
  }
  return path;
};
