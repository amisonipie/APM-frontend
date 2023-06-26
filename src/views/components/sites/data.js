import React from "react";

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
    selector: "site_name",
    sortable: true,
  },
  {
    name: "CITY",
    selector: "city",
    sortable: true,
  },
  {
    name: "REGION",
    selector: "get_region",
    cell: (row) => row?.region?.name,
    sortable: true,
  },

  {
    name: "MODEL",
    selector: "model",
    cell: (row) => <span className="text-capitalize">{row?.model}</span>,
    sortable: true,
  },
  {
    name: "TYPE",
    selector: "type",
    cell: (row) => <span className="text-capitalize">{row?.type}</span>,
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
