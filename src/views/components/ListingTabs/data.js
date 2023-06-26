import React from "react";
import { site_model, userRole } from "utility/config";
import { getJSONArrayUniqueElements } from "utility/transformers";

const OpenedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16 22.75H8C4.98 22.75 3.25 21.02 3.25 18V8.25C3.25 5.1 4.85 3.5 8 3.5C8.41 3.5 8.75 3.84 8.75 4.25C8.75 4.65 8.91 5.03 9.19 5.31C9.47 5.59 9.85 5.75 10.25 5.75H13.75C14.58 5.75 15.25 5.08 15.25 4.25C15.25 3.84 15.59 3.5 16 3.5C19.15 3.5 20.75 5.1 20.75 8.25V18C20.75 21.02 19.02 22.75 16 22.75ZM7.34998 5.02C5.76998 5.15 4.75 5.86 4.75 8.25V18C4.75 20.22 5.78 21.25 8 21.25H16C18.22 21.25 19.25 20.22 19.25 18V8.25C19.25 5.86 18.23 5.16 16.65 5.02C16.31 6.3 15.14 7.25 13.75 7.25H10.25C9.45 7.25 8.70001 6.94 8.13 6.37C7.75 5.99 7.48998 5.53 7.34998 5.02Z"
      fill="#959DB2"
    />
    <path
      d="M13.75 7.25H10.25C9.45 7.25 8.7 6.94 8.13 6.37C7.56 5.79999 7.25 5.05 7.25 4.25C7.25 2.6 8.6 1.25 10.25 1.25H13.75C14.55 1.25 15.3 1.56 15.87 2.13C16.44 2.7 16.75 3.45 16.75 4.25C16.75 5.9 15.4 7.25 13.75 7.25ZM10.25 2.75C9.42 2.75 8.75 3.42 8.75 4.25C8.75 4.65 8.91 5.03 9.19 5.31C9.47 5.59 9.85 5.75 10.25 5.75H13.75C14.58 5.75 15.25 5.08 15.25 4.25C15.25 3.85 15.09 3.47 14.81 3.19C14.53 2.91 14.15 2.75 13.75 2.75H10.25Z"
      fill="#959DB2"
    />
    <path
      d="M14.75 15.5H12.75C11.23 15.5 10 14.27 10 12.75V10.75C10 10.34 10.34 10 10.75 10C11.16 10 11.5 10.34 11.5 10.75V12.75C11.5 13.44 12.06 14 12.75 14H14.75C15.16 14 15.5 14.34 15.5 14.75C15.5 15.16 15.16 15.5 14.75 15.5Z"
      fill="#31CD82"
    />
  </svg>
);

const ClosedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16 22.75H8C4.98 22.75 3.25 21.02 3.25 18V8.25C3.25 5.1 4.85 3.5 8 3.5C8.41 3.5 8.75 3.84 8.75 4.25C8.75 4.65 8.91 5.03 9.19 5.31C9.47 5.59 9.85 5.75 10.25 5.75H13.75C14.58 5.75 15.25 5.08 15.25 4.25C15.25 3.84 15.59 3.5 16 3.5C19.15 3.5 20.75 5.1 20.75 8.25V18C20.75 21.02 19.02 22.75 16 22.75ZM7.34998 5.02C5.76998 5.15 4.75 5.86 4.75 8.25V18C4.75 20.22 5.78 21.25 8 21.25H16C18.22 21.25 19.25 20.22 19.25 18V8.25C19.25 5.86 18.23 5.16 16.65 5.02C16.31 6.3 15.14 7.25 13.75 7.25H10.25C9.45 7.25 8.70001 6.94 8.13 6.37C7.75 5.99 7.48998 5.53 7.34998 5.02Z"
      fill="#959DB2"
    />
    <path
      d="M13.75 7.25H10.25C9.45 7.25 8.7 6.94 8.13 6.37C7.56 5.79999 7.25 5.05 7.25 4.25C7.25 2.6 8.6 1.25 10.25 1.25H13.75C14.55 1.25 15.3 1.56 15.87 2.13C16.44 2.7 16.75 3.45 16.75 4.25C16.75 5.9 15.4 7.25 13.75 7.25ZM10.25 2.75C9.42 2.75 8.75 3.42 8.75 4.25C8.75 4.65 8.91 5.03 9.19 5.31C9.47 5.59 9.85 5.75 10.25 5.75H13.75C14.58 5.75 15.25 5.08 15.25 4.25C15.25 3.85 15.09 3.47 14.81 3.19C14.53 2.91 14.15 2.75 13.75 2.75H10.25Z"
      fill="#959DB2"
    />
    <path
      d="M11.2475 16.4975C11.0575 16.4975 10.8675 16.4275 10.7175 16.2775L9.2175 14.7775C8.9275 14.4875 8.9275 14.0075 9.2175 13.7175C9.5075 13.4275 9.9875 13.4275 10.2775 13.7175L11.2475 14.6875L14.7175 11.2175C15.0075 10.9275 15.4875 10.9275 15.7775 11.2175C16.0675 11.5075 16.0675 11.9875 15.7775 12.2775L11.7775 16.2775C11.6375 16.4275 11.4375 16.4975 11.2475 16.4975Z"
      fill="#EB5757"
    />
  </svg>
);
const permanentTabs = [
  {
    title: "All",
    value: "all",
    seqNo: 1,
  },
  {
    title: "Pending",
    value: "pending",
    color: "#F9C70C",
    icon: OpenedIcon,
    seqNo: 2,
  },
  {
    title: "Opened",
    value: "opened",
    color: "#31CD82",
    icon: OpenedIcon,
    seqNo: 3,
  },
  {
    title: "Responded",
    value: "responded",
    color: "#C37E21",
    icon: OpenedIcon,
    seqNo: 5,
  },
  {
    title: "Rejected",
    value: "rejected",
    color: "#B07FC8",
    icon: OpenedIcon,
    seqNo: 6,
  },
  {
    title: "Redirected",
    value: "redirected",
    color: "#959DB2",
    icon: OpenedIcon,
    seqNo: 7,
  },
  {
    title: "In-Progress",
    value: "in_progress",
    color: "#F2994A",
    icon: OpenedIcon,
    seqNo: 8,
  },
  {
    title: "Solved",
    value: "solved",
    color: "#1A8451",
    icon: OpenedIcon,
    seqNo: 9,
  },
  {
    title: "Supervisor Approved",
    value: "supervisor_approved",
    color: "#EB5757",
    icon: OpenedIcon,
    seqNo: 12,
  },
  {
    title: "QA Approved",
    value: "qa_approved",
    color: "#B80F4B",
    icon: OpenedIcon,
    seqNo: 13,
  },
  {
    title: "Closed",
    value: "closed",
    color: "#000000",
    icon: ClosedIcon,
    seqNo: 14,
  },
];
const makeShiftTabs = [
  {
    title: "All",
    value: "",
    seqNo: 1,
    model: site_model.makeShift,
  },
  {
    title: "Pending",
    value: "pending",
    color: "#F9C70C",
    icon: OpenedIcon,
    seqNo: 2,
  },
  {
    title: "Awaiting Maintenance",
    value: "opened",
    color: "#959DB2",
    icon: OpenedIcon,
    seqNo: 4,
    model: site_model.makeShift,
  },
  {
    title: "Rejected",
    value: "rejected",
    color: "#B07FC8",
    icon: OpenedIcon,
    seqNo: 6,
    model: site_model.makeShift,
  },
  {
    title: "In-Progress",
    value: "in_progress",
    color: "#F2994A",
    icon: OpenedIcon,
    seqNo: 8,
    model: site_model.makeShift,
  },
  {
    title: "Maintenance Completed",
    value: "solved",
    color: "#959DB2",
    icon: OpenedIcon,
    seqNo: 10,
    model: site_model.makeShift,
  },
  {
    title: "Closed",
    value: "closed",
    color: "#000000",
    icon: ClosedIcon,
    seqNo: 14,
    model: site_model.makeShift3,
  },
];
const imcTabs = [
  {
    title: "All",
    value: "all",
    seqNo: 1,
  },
  {
    title: "Pending",
    value: "pending",
    color: "#F9C70C",
    icon: OpenedIcon,
    seqNo: 2,
  },
  {
    title: "Awaiting Maintenance",
    value: "opened",
    color: "#959DB2",
    icon: OpenedIcon,
    seqNo: 4,
  },
  {
    title: "Responded",
    value: "responded",
    color: "#C37E21",
    icon: OpenedIcon,
    seqNo: 5,
  },
  {
    title: "Rejected",
    value: "rejected",
    color: "#B07FC8",
    icon: OpenedIcon,
    seqNo: 6,
  },
  {
    title: "Redirected",
    value: "redirected",
    color: "#959DB2",
    icon: OpenedIcon,
    seqNo: 7,
  },
  {
    title: "In-Progress",
    value: "in_progress",
    color: "#F2994A",
    icon: OpenedIcon,
    seqNo: 8,
  },
  {
    title: "Requestor Approval",
    value: "solved",
    color: "#959DB2",
    icon: OpenedIcon,
    seqNo: 11,
  },
  {
    title: "Closed",
    value: "closed",
    color: "#000000",
    icon: ClosedIcon,
    seqNo: 14,
  },
];

export const woTabs = ({ sites, user, isOverdue }) => {
  let workOrderTabs = {};
  const isSuperAdmin = user?.role === userRole.superAdmin;
  const siteModels = getJSONArrayUniqueElements(sites, "model");

  if ((isSuperAdmin && siteModels?.length === 0) || (user?.models.includes(site_model.permanent) && siteModels?.length === 0) || siteModels.includes(site_model.permanent)) {
    permanentTabs.map((item) => {
      workOrderTabs = {
        ...workOrderTabs,
        [item.title]: {
          ...item,
          site_models: [site_model.permanent],
        },
      };
    });
  }
  if ((isSuperAdmin && siteModels?.length === 0) || (user?.models.includes(site_model.makeShift) && siteModels?.length === 0) || siteModels.includes(site_model.makeShift)) {
    makeShiftTabs.map((item) => {
      // ADDING PREVIOUS GROUP TAB'S SITE_MODELS
      item = workOrderTabs[item.title]
        ? {
          ...item,
          site_models: [...workOrderTabs[item.title].site_models],
        }
        : item;

      const siteTypes = item?.site_models || [];
      // APPENDING MAKE SHIFT TABS IN MAIN WORK ORDER TABS OBJECT
      workOrderTabs = {
        ...workOrderTabs,
        [item.title]: {
          ...item,
          site_models: [...siteTypes, site_model.makeShift],
        },
      };
    });
  }

  if ((isSuperAdmin && siteModels?.length === 0) || (user?.models.includes(site_model.imc) && siteModels?.length === 0) || siteModels.includes(site_model.imc)) {
    imcTabs.map((item) => {
      // ADDING PREVIOUS GROUP TAB'S SITE_MODELS
      item = workOrderTabs[item.title]
        ? {
          ...item,
          site_models: [...workOrderTabs[item.title].site_models],
        }
        : item;
      const siteTypes = item?.site_models || [];

      // APPENDING IMC TABS IN MAIN WORK ORDER TABS OBJECT
      workOrderTabs = {
        ...workOrderTabs,
        [item.title]: {
          ...item,
          site_models: [...siteTypes, site_model.imc],
        },
      };
    });
  }
  if (isOverdue) {
    delete workOrderTabs?.Closed;
  }
  workOrderTabs = Object.values(workOrderTabs).sort((a, b) => a.seqNo - b.seqNo);

  return workOrderTabs;
};
