export const columns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    cell: (row, index) => index + 1,
    width: "100px",
  },
  {
    name: "Name",
    selector: "nameEnglish",
    sortable: true,
  },

  {
    name: "Site",
    selector: "nameArabic",
    sortable: true,
  },

  {
    name: "Due date",
    selector: "levelClassification",
    sortable: true,
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
