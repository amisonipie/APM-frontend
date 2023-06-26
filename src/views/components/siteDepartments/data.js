import { arrayHead } from "utility/helper";

export const columns = [
  {
    name: "Sr#",
    selector: "id",
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
    selector: "lab",
    sortable: true,
    cell: (row) => arrayHead(row?.sites)?.site_name,
  },
];
