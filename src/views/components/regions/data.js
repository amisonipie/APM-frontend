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
    name: "Latitude",
    selector: "latitude",
    cell: (row) => row?.coordinates?.latitude || "N/A",
    sortable: true,
  },
  {
    name: "Longitude",
    selector: "longitude",
    cell: (row) => row?.coordinates?.longitude || "N/A",
    sortable: true,
  },
];
