import moment from "moment";

export const columns = [
  {
    title: "ID",
    name: "ID",
    dataIndex: "inventoryId",
    selector: "inventoryId",
    sortable: true,
    isListing: true,
    width: 200,
  },
  {
    title: "Name",
    name: "name",
    dataIndex: "equipment",
    selector: "equipment",
    cell: (row) => row?.equipment?.nameEnglish,
    sortable: true,
    isListing: true,
  },
  {
    title: "Site",
    name: "Site",
    dataIndex: "lab",
    selector: "lab",
    cell: (row) => row?.lab?.site_name,
    sortable: true,
  },
  {
    name: "Due date",
    selector: "warrantyExpirationDate",
    sortable: true,
    cell: (row) => moment(row.warrantyExpirationDate).format("DD-MM-YYYY"),
    style: {
      color: "#EB5757",
      fontFamily: "Sofia Pro",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 20,
      textTransform: "capitalize",
    },
  },
];
