import { getField } from "views/components/generalHelper";

export const columns = [
  {
    name: "Sr#",
    selector: "index",
    sortable: true,
    cell: (row, index) => index + 1,
    width: "100px",
  },
  {
    name: "NAME",
    selector: "name",
    sortable: true,
  },
  {
    name: "SITE",
    selector: "site",
    cell: (row) => row?.lab?.site_name,
    sortable: true,
  },
  {
    name: "TYPE",
    selector: "type",
    sortable: true,
    cell: (row) => getField(row?.type),
  },
];
