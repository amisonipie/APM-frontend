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
];
