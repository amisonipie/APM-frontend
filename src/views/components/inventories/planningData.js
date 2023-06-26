export const planningColumns = (options) => [
  {
    title: "ID",
    name: "ID",
    dataIndex: "inventoryId",
    selector: "inventoryId",
    sortable: true,
    isListing: true,
    // width: "150px",
  },
  {
    title: "Name",
    name: "name",
    dataIndex: "equipment",
    selector: "equipment",
    cell: (row) => row?.equipment?.nameEnglish,
    sortable: true,
    isListing: true,
    width: "300px",
  },
  {
    title: "Utilization",
    name: "Utilization",
    dataIndex: "utilization",
    selector: "utilization",
    cell: (row) => (options?.inventory?.UTILIZATION
          && options?.inventory?.UTILIZATION[row?.utilization]?.LABEL)
        || "",
    sortable: true,
    isListing: true,
    // width: "300px",
  },
  {
    title: "Technical Performance",
    name: "Technical Performance",
    dataIndex: "technicalPerformance",
    selector: "technicalPerformance",
    cell: (row) => (options?.inventory?.TECHNICAL_PERFORMANCE
          && options?.inventory?.TECHNICAL_PERFORMANCE[row?.technicalPerformance]
            ?.LABEL)
        || "",
    sortable: true,
    isListing: true,
    // width: "300px",
  },
  {
    title: "Failure Frequency",
    name: "Failure Frequency",
    dataIndex: "failureFrequency",
    selector: "failureFrequency",

    cell: (row) => (options?.inventory?.FAILURE_FREQUENCY
          && options?.inventory?.FAILURE_FREQUENCY[row?.failureFrequency]
            ?.LABEL)
        || "",
    sortable: true,
    isListing: true,
    // width: "300px",
  },
  {
    title: "Estimated Age",
    name: "Estimated Age",
    dataIndex: "estimatedAge",
    selector: "estimatedAge",

    cell: (row) => (options?.inventory?.ESTIMATED_AGE
          && options?.inventory?.ESTIMATED_AGE[row?.estimatedAge]?.LABEL)
        || "",
    sortable: true,
    isListing: true,
    // width: "300px",
  },
  {
    title: "Due For Replacement",
    name: "Due For Replacement",
    dataIndex: "dueForReplacement",
    selector: "dueForReplacement",

    cell: (row) => (options?.inventory?.DUE_FOR_REPLACEMENT
          && options?.inventory?.DUE_FOR_REPLACEMENT[row?.dueForReplacement]
            ?.LABEL)
        || "",
    sortable: true,
    isListing: true,
    // width: "300px",
  },
];
