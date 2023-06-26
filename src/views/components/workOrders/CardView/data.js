import React from "react";

export const mockWorkOrders = [
  {
    step: "01",
    ticketId: "768699",
    subject: "Ventilator not working",
    asset: "IQon Spectral CT",
    category: "Corrective",
    lastAction: "Ticket Open",
    status: "Open",
    classification: "",
    description: "",
    dueDate: null,
    uploadedFiles: [],
  },
  {
    step: "02",
    ticketId: "768700",
    subject: "Ventilator not working",
    asset: "IQon Spectral CT",
    category: "Corrective",
    lastAction: "Assigned to technician",
    status: "Assigned ticket",
    classification: "",
    description: "",
    dueDate: "2021-12-21",
    uploadedFiles: [],
  },
  {
    step: "03",
    ticketId: "768701",
    subject: "Ventilator not working",
    asset: "IQon Spectral CT",
    category: "Corrective",
    lastAction: "Technician start work",
    status: "In-progress",
    classification: "",
    description: "",
    dueDate: "2021-12-22",
    uploadedFiles: [],
  },
  {
    step: "02",
    ticketId: "768702",
    subject: "Ventilator not working",
    asset: "IQon Spectral CT",
    category: "Corrective",
    lastAction: "Back to supervisor",
    status: "Re-open",
    classification: "",
    description: "",
    dueDate: "2021-12-26",
    uploadedFiles: [],
  },
  {
    step: "04",
    ticketId: "768703",
    subject: "Ventilator not working",
    asset: "IQon Spectral CT",
    category: "Corrective",
    lastAction: "Hospital QA",
    status: "Completed",
    classification: "",
    description: "",
    dueDate: "2021-12-26",
    uploadedFiles: [],
  },
  {
    step: "05",
    ticketId: "768704",
    subject: "Ventilator not working",
    asset: "IQon Spectral CT",
    category: "Corrective",
    lastAction: "Completed",
    status: "Closed",
    classification: "",
    description: "",
    dueDate: "2021-12-26",
    uploadedFiles: [],
  },
];
export const ticketIdIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
      stroke="#51459E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
      stroke="#51459E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M8 13H12"
      stroke="#51459E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M8 17H16"
      stroke="#51459E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const assignToIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 7C8.61083 7 9.91667 5.69416 9.91667 4.08333C9.91667 2.4725 8.61083 1.16666 7 1.16666C5.38917 1.16666 4.08334 2.4725 4.08334 4.08333C4.08334 5.69416 5.38917 7 7 7Z"
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M1.98914 12.8333C1.98914 10.5758 4.23497 8.75 6.99997 8.75C7.55997 8.75 8.10247 8.82583 8.60997 8.96583"
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.8333 10.5C12.8333 10.6867 12.81 10.8675 12.7633 11.0425C12.7108 11.2758 12.6175 11.5033 12.495 11.7017C12.0925 12.3783 11.3517 12.8333 10.5 12.8333C9.89916 12.8333 9.35666 12.6058 8.94833 12.2325C8.77333 12.0808 8.62166 11.9 8.50499 11.7017C8.28916 11.3517 8.16666 10.9375 8.16666 10.5C8.16666 9.87 8.4175 9.29251 8.82583 8.87251C9.25167 8.43501 9.84666 8.16666 10.5 8.16666C11.1883 8.16666 11.8125 8.46417 12.2325 8.94251C12.6058 9.35667 12.8333 9.905 12.8333 10.5Z"
      stroke="#F2F2F2"
      strokeWidth="0.8"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3692 10.4883H9.63089"
      stroke="#F2F2F2"
      strokeWidth="0.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5002 9.63668V11.3808"
      stroke="#F2F2F2"
      strokeWidth="0.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const hospitalIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 16.5H16.5"
      stroke="#51459E"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 1.5H5.25C3 1.5 2.25 2.8425 2.25 4.5V16.5H15.75V4.5C15.75 2.8425 15 1.5 12.75 1.5Z"
      stroke="#51459E"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M10.545 11.25H7.4475C7.065 11.25 6.74251 11.565 6.74251 11.955V16.5H11.2425V11.955C11.25 11.565 10.935 11.25 10.545 11.25Z"
      stroke="#51459E"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g opacity="0.4">
      <path
        d="M9 4.5V8.25"
        stroke="#51459E"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.125 6.375H10.875"
        stroke="#51459E"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const technicianIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 17.07C8.1825 17.07 7.3725 16.83 6.735 16.3575L3.51 13.95C2.655 13.3125 1.9875 11.9775 1.9875 10.92V5.34C1.9875 4.185 2.835 2.955 3.9225 2.55L7.665 1.1475C8.4075 0.870002 9.5775 0.870002 10.32 1.1475L14.0625 2.55C15.15 2.955 15.9975 4.185 15.9975 5.34V10.9125C15.9975 11.9775 15.33 13.305 14.475 13.9425L11.25 16.35C10.6275 16.83 9.8175 17.07 9 17.07ZM8.0625 2.205L4.32 3.6075C3.6825 3.8475 3.12 4.6575 3.12 5.3475V10.92C3.12 11.6325 3.6225 12.63 4.185 13.05L7.41 15.4575C8.2725 16.1025 9.7275 16.1025 10.5975 15.4575L13.8225 13.05C14.3925 12.6225 14.8875 11.6325 14.8875 10.92V5.34C14.8875 4.6575 14.325 3.8475 13.6875 3.6L9.945 2.1975C9.435 2.0175 8.565 2.0175 8.0625 2.205Z"
      fill="#51459E"
    />
    <path
      d="M9.31 8.61998C8.035 8.61998 7 7.58497 7 6.30997C7 5.03497 8.035 4 9.31 4C10.585 4 11.62 5.03497 11.62 6.30997C11.62 7.58497 10.585 8.61998 9.31 8.61998ZM9.31 5.125C8.6575 5.125 8.125 5.65747 8.125 6.30997C8.125 6.96247 8.6575 7.49498 9.31 7.49498C9.9625 7.49498 10.495 6.96247 10.495 6.30997C10.495 5.65747 9.9625 5.125 9.31 5.125Z"
      fill="#51459E"
      fillOpacity="0.5"
    />
    <path
      d="M12 13.0578C11.6925 13.0578 11.4375 12.8028 11.4375 12.4953C11.4375 11.4603 10.3425 10.6128 9 10.6128C7.6575 10.6128 6.5625 11.4603 6.5625 12.4953C6.5625 12.8028 6.3075 13.0578 6 13.0578C5.6925 13.0578 5.4375 12.8028 5.4375 12.4953C5.4375 10.8378 7.035 9.48779 9 9.48779C10.965 9.48779 12.5625 10.8378 12.5625 12.4953C12.5625 12.8028 12.3075 13.0578 12 13.0578Z"
      fill="#51459E"
      fillOpacity="0.5"
    />
  </svg>
);

export const technicianWorkIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 14.145H12.93C12.33 14.145 11.76 14.3775 11.34 14.7975L10.0575 16.065C9.47248 16.6425 8.52001 16.6425 7.93501 16.065L6.6525 14.7975C6.2325 14.3775 5.655 14.145 5.0625 14.145H4.5C3.255 14.145 2.25 13.1475 2.25 11.9175V3.73499C2.25 2.50499 3.255 1.50751 4.5 1.50751H13.5C14.745 1.50751 15.75 2.50499 15.75 3.73499V11.9175C15.75 13.14 14.745 14.145 13.5 14.145Z"
      stroke="#51459E"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M9.00002 7.50002C9.96513 7.50002 10.7475 6.71762 10.7475 5.7525C10.7475 4.78738 9.96513 4.00504 9.00002 4.00504C8.0349 4.00504 7.2525 4.78738 7.2525 5.7525C7.2525 6.71762 8.0349 7.50002 9.00002 7.50002Z"
      stroke="#51459E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M12 11.745C12 10.395 10.6575 9.30002 9 9.30002C7.3425 9.30002 6 10.395 6 11.745"
      stroke="#51459E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const closedIcon = (
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
      fill="#31CD82"
    />
  </svg>
);
export const dateIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99999 15.1667C4.50666 15.1667 1.66666 12.3267 1.66666 8.83333C1.66666 5.34 4.50666 2.5 7.99999 2.5C11.4933 2.5 14.3333 5.34 14.3333 8.83333C14.3333 12.3267 11.4933 15.1667 7.99999 15.1667ZM7.99999 3.5C5.05999 3.5 2.66666 5.89333 2.66666 8.83333C2.66666 11.7733 5.05999 14.1667 7.99999 14.1667C10.94 14.1667 13.3333 11.7733 13.3333 8.83333C13.3333 5.89333 10.94 3.5 7.99999 3.5Z"
      fill="#EB5757"
    />
    <path
      d="M8 9.16666C7.72667 9.16666 7.5 8.93999 7.5 8.66666V5.33333C7.5 5.05999 7.72667 4.83333 8 4.83333C8.27333 4.83333 8.5 5.05999 8.5 5.33333V8.66666C8.5 8.93999 8.27333 9.16666 8 9.16666Z"
      fill="#EB5757"
    />
    <path
      d="M10 1.83333H6C5.72667 1.83333 5.5 1.60666 5.5 1.33333C5.5 1.05999 5.72667 0.833328 6 0.833328H10C10.2733 0.833328 10.5 1.05999 10.5 1.33333C10.5 1.60666 10.2733 1.83333 10 1.83333Z"
      fill="#EB5757"
    />
  </svg>
);

export const cardStatusCB = (status) => {
  switch (status) {
  case "opened":
    return {
      icon: ticketIdIcon,
      color: "green",
    };
  case "solved":
    return {
      icon: closedIcon,
      color: "green_dark",
    };
  case "redirected":
    return {
      icon: closedIcon,
      color: "red",
    };
  case "reopened":
    return {
      icon: technicianIcon,
      color: "red_dark",
    };
  case "closed":
    return {
      icon: closedIcon,
      color: "black",
    };
  case "assigned":
    return {
      icon: technicianIcon,
      color: "brown",
    };
  case "responded":
    return {
      icon: closedIcon,
      color: "brown_dark",
    };
  case "completed":
    return {
      icon: hospitalIcon,
      color: "blue",
    };
  case "inprogress":
    return {
      icon: technicianWorkIcon,
      color: "yellow",
    };
  case "rejected":
    return {
      icon: closedIcon,
      color: "red",
    };
  default:
    return {
      icon: ticketIdIcon,
      color: "primary",
    };
  }
};
export const dateIconList = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99999 15.1667C4.50666 15.1667 1.66666 12.3267 1.66666 8.83333C1.66666 5.34 4.50666 2.5 7.99999 2.5C11.4933 2.5 14.3333 5.34 14.3333 8.83333C14.3333 12.3267 11.4933 15.1667 7.99999 15.1667ZM7.99999 3.5C5.05999 3.5 2.66666 5.89333 2.66666 8.83333C2.66666 11.7733 5.05999 14.1667 7.99999 14.1667C10.94 14.1667 13.3333 11.7733 13.3333 8.83333C13.3333 5.89333 10.94 3.5 7.99999 3.5Z"
      fill="#959DB2"
    />
    <path
      d="M8 9.16666C7.72667 9.16666 7.5 8.93999 7.5 8.66666V5.33333C7.5 5.05999 7.72667 4.83333 8 4.83333C8.27333 4.83333 8.5 5.05999 8.5 5.33333V8.66666C8.5 8.93999 8.27333 9.16666 8 9.16666Z"
      fill="#959DB2"
    />
    <path
      d="M10 1.83333H6C5.72667 1.83333 5.5 1.60666 5.5 1.33333C5.5 1.05999 5.72667 0.833328 6 0.833328H10C10.2733 0.833328 10.5 1.05999 10.5 1.33333C10.5 1.60666 10.2733 1.83333 10 1.83333Z"
      fill="#959DB2"
    />
  </svg>
);
