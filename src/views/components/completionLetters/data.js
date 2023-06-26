import moment from "moment";

export const states = [
  {
    title: "Completion Date",
    name: "date",
    value: moment(new Date()).format("DD-MM-YYYY"),
    type: "date",
    required: true,
    step: 0,
  },
  {
    title: "HMC",
    name: "hmc_id",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    required: true,
    listName: "hmcsList",
    step: 1,
  },
  {
    title: "Region",
    name: "region_id",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    listName: "regionsList",
    required: true,
    step: 2,
  },
  {
    title: "Hospital",
    name: "hospital_id",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    listName: "hospitalsList",
    required: true,
    step: 3,
  },
];

export const initialStates = [
  {
    title: "Completion Date",
    name: "date",
    value: moment(new Date()).format("DD-MM-YYYY"),
    type: "date",
    required: true,
    step: 0,
  },
  {
    title: "HMC",
    name: "hmc_id",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    required: true,
    listName: "hmcsList",
    step: 1,
  },
  {
    title: "Region",
    name: "region_id",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    listName: "regionsList",
    required: true,
    step: 2,
  },
  {
    title: "Hospital",
    name: "hospital_id",
    value: { value: "", label: "" },
    type: "selection",
    placeholder: "",
    listName: "hospitalsList",
    required: true,
    step: 3,
  },
];
export const columns = [
  {
    name: "REGION",
    selector: "region",
    cell: (row) => row?.get_region?.region,
    sortable: true,
  },
  {
    name: "HOSPITALS",
    selector: "hospitals",
    cell: (row) => row?.get_hospital?.name,
    sortable: true,
  },
  {
    name: "HMC",
    selector: "hmc",
    cell: (row) => row?.get_hmc?.name,
    sortable: true,
  },
  {
    name: "DATE",
    selector: "date",
    sortable: true,
  },
];
