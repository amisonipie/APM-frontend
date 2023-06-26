import React from "react";
import { getField } from "views/components/generalHelper";

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
    selector: "nameEnglish",
    sortable: true,
  },

  {
    name: "ARABIC NAME",
    selector: "nameArabic",
    sortable: true,
  },

  {
    name: "LEVEL CLASSIFICATION",
    selector: "levelClassification",
    sortable: true,
  },
  {
    name: "TypE",
    selector: "type",
    sortable: true,
    cell: (row) => getField(row?.type),
  },
];
