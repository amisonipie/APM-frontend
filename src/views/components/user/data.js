import React from "react";
import { LI } from "assets/icons/svgIcons";
import CustomBadge from "views/components/CustomBadge";
import { UncontrolledTooltip } from "reactstrap";
import {
  getField, getRandomUniqueID, getUserClassification, getUserRole,
} from "views/components/generalHelper";
import { classificationTabs } from "utility/helper/constants";

const userTypeOptions = [
  {
    value: "agent",
    label: "Agent / Service Request",
  },
  {
    value: "admin_hmc",
    label: "Admin HMC",
  },
  {
    value: "site_admin",
    label: "Admin Lab",
  },
  {
    value: "technician",
    label: "Technician",
  },
  {
    value: "super_admin",
    label: "Super Admin",
  },
];
export const userFieldOptions = [
  {
    value: "MEDICAL",
    label: "MEDICAL",
  },
  {
    value: "NON_MEDICAL",
    label: "NON MEDICAL",
  },
];
export const states = [
  {
    title: "Create user",
    icon: LI.userPlusIcon,
    fields: [
      {
        title: "Name",
        name: "name",
        value: "",
        type: "text",
        placeholder: "John doe",
        required: true,
        step: 0,
      },
      {
        title: "Email",
        name: "email",
        value: "",
        type: "email",
        placeholder: "somone@example.com",
        required: true,
        step: 1,
      },
      // {
      //   title: "Password",
      //   name: "password",
      //   value: "",
      //   type: "password",
      //   placeholder: "secret",
      //   required: true,
      //   step: 2,
      // },
      {
        title: "Select Type",
        name: "role",
        value: { value: "", label: "" },
        type: "selection",
        placeholder: "",
        required: true,
        listName: "rolesList",
        step: 3,
      },
      {
        title: "Select Field",
        name: "field",
        value: { value: "", label: "" },
        type: "selection",
        placeholder: "",
        required: true,
        options: userFieldOptions,
        step: 4,
      },
      {
        title: "Phone",
        name: "phone",
        value: "",
        type: "phone",
        placeholder: "i.e. +966 99 999 9999",
        required: true,
        max: 12,
        min: 12,
        step: 5,
      },
      // {
      //   title: "HMC",
      //   name: "hmcs",
      //   value: [],
      //   type: "selection",
      //   listName: "hmcsList",
      //   placeholder: "",
      //   required: false,
      //   isMulti: true,
      //   step: 6,
      // },
      {
        title: "Select Lab",
        name: "lab_id",
        value: {},
        type: "",
        listName: "labsList",
        placeholder: "",
        required: false,
        step: 7,
      },
    ],
  },
];

export const statesOnUpdate = [
  {
    title: "Name",
    name: "name",
    value: "",
    type: "text",
    placeholder: "John doe",
    required: true,
    step: 0,
  },
  {
    title: "Email",
    name: "email",
    value: "",
    type: "email",
    placeholder: "somone@example.com",
    required: true,
    step: 1,
  },
  {
    title: "Password",
    name: "password",
    value: "",
    type: "password",
    placeholder: "secret",
    required: false,
    step: 2,
  },
  {
    title: "Select Type",
    name: "user_type",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    required: true,
    options: userTypeOptions,
    step: 3,
  },
  {
    title: "Select Field",
    name: "field",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    required: true,
    options: userFieldOptions,
    step: 4,
  },
  {
    title: "Phone",
    name: "phone",
    value: "",
    type: "number",
    placeholder: "i.e. +92303-8797749",
    required: true,
    // maxLength: 12,
    step: 5,
  },
  {
    title: "HMC",
    name: "hmcs",
    value: [],
    type: "selection",
    listName: "hmcsList",
    placeholder: "",
    required: false,
    isMulti: true,
    step: 6,
  },
  {
    title: "Select Labs",
    name: "labs",
    value: [],
    type: "selection",
    listName: "labsList",
    placeholder: "",
    required: false,
    isMulti: true,
    step: 7,
  },
];

export const columns = [
  {
    name: "NAME",
    selector: "name",
    sortable: true,
  },
  {
    name: "EMAIL",
    selector: "email",
    sortable: true,
    width: "250px",
  },
  {
    name: "ROLE",
    selector: "role",
    width: "200px",
    sortable: true,
    cell: (row) => (
      <span className="text-capitalize">{getUserRole(row?.role)}</span>
    ),
  },
  {
    name: "PHONE",
    selector: "phone",
    sortable: true,
    width: "200px",
    cell: (row) => `+${row?.phone}`,
  },
  {
    name: "Field",
    selector: "field",
    sortable: true,
    cell: (row) => (
      <span className="text-capitalize">{getField(row?.field)}</span>
    ),
  },
  {
    name: "Type",
    selector: "type",
    sortable: true,
    cell: (row) => (
      <span className="text-capitalize">
        {classificationTabs[getUserClassification(row?.direct_permissions || [])]?.title}
      </span>
    ),
  },
  {
    name: "MAINTENANCE DEPARTMENT",
    selector: "maintenanceDepartments",
    sortable: true,
    cell: (row, rowIndex) => {
      const randomID = getRandomUniqueID();
      const data = row?.maintenance_departments?.map((d, idx) => {
        const maintenanceData = {
          name: `${d?.name} ( ${d?.labs?.map((item, index) => (
            item?.site_name
          ))} ) `,
        };
        return maintenanceData;
      });
      return (
        <div className="d-flex flex-wrap customListing--Badge" id={`custom-${randomID}-${rowIndex}`}>
          <CustomBadge
            text={data}
            fieldName="Maintenance Department"
            customClasses="me-1"
          />
          {data[0]?.name
            ? (
              <UncontrolledTooltip
                placement="top"
                target={`custom-${randomID}-${rowIndex}`}
              >
                {data[0]?.name}
              </UncontrolledTooltip>
            )
            : null}

        </div>
      );
    },
    width: "250px",
    center: true,
  },
  {
    name: "HMC",
    selector: "hmcs",
    sortable: true,
    width: "250px",
    cell: (row, rowIndex) => {
      const randomID = getRandomUniqueID();
      return (
        <div className="d-flex flex-wrap customListing--Badge" id={`custom-${randomID}-${rowIndex}`}>
          <CustomBadge
            text={row?.hmcs}
            fieldName="HMC"
            customClasses="me-1"
          />
          {row?.hmcs[0]?.name
            ? (
              <UncontrolledTooltip
                placement="top"
                target={`custom-${randomID}-${rowIndex}`}
              >
                {row?.hmcs[0]?.name}
              </UncontrolledTooltip>
            )
            : null}
        </div>
      );
    },
  },

  {
    name: "Sites",
    selector: "labs",
    width: "250px",
    sortable: true,
    cell: (row, rowIndex) => {
      const randomID = getRandomUniqueID();
      return (
        <div className="d-flex flex-wrap customListing--Badge" id={`custom-${randomID}-${rowIndex}`}>
          <CustomBadge
            text={row?.sites}
            sites="sites"
            fieldName="Sites"
            customClasses="me-1"
          />
          {row?.sites[0]?.site_name
            ? (
              <UncontrolledTooltip
                placement="top"
                target={`custom-${randomID}-${rowIndex}`}
              >
                {row?.sites[0]?.site_name}
              </UncontrolledTooltip>
            )
            : null}
        </div>
      );
    },
  },
];

export const HandleChangeConditions = ({
  key,
  valuesArr,
  stepToUpdate,
  stateToUpdate,
  indexOfUpdatedOption,
  finalValuestoSubmit,
}) => {
  // if (key === "lab_id") {
  //   stepToUpdate.fields[1] = {
  //     ...valuesArr[0].fields[1],
  //     type: "selection",
  //   };
  //   stepToUpdate.fields[2] = {
  //     ...valuesArr[0].fields[2],
  //   };
  //   stepToUpdate.fields[indexOfUpdatedOption] = stateToUpdate;
  // } else {
  stepToUpdate.fields[indexOfUpdatedOption] = stateToUpdate;
  // }
  return { updatedStep: stepToUpdate };
};
