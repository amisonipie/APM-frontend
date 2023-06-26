import React from "react";
import CustomBadge from "views/components/CustomBadge";

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
    name: "PHONE",
    selector: "phone",
    sortable: true,
    // width: "200px",
    cell: (row) => `+${row?.phone}`,
  },
  {
    name: "Sites",
    selector: "sites",
    sortable: true,
    width: "250px",
    cell: (row) => (
      <div className="d-flex flex-wrap customListing--Badge">
        <CustomBadge
          text={row?.sites}
          sites="sites"
          customClasses="me-1"
        />
      </div>
    ),
  },
];
