module.exports = {
  listIO: {
    data: [],
    loading: false,
  },
  JDIO: {
    data: {},
    loading: false,
  },
  classificationTabs: {
    ALL: {
      title: "All",
      tabId: "MEDICALNONMEDICAL",
      all: true,
      filter: true,
    },
    MEDICAL: {
      title: "Medical",
      tabId: "MEDICAL",
      filter: true,
    },
    NONMEDICAL: {
      title: "Non-Medical",
      tabId: "NONMEDICAL",
      filter: true,
    },
    MEDICALNONMEDICAL: {
      title: "Medical and Non-Medical",
      tabId: "MEDICALNONMEDICAL",
    },
  },
  woFilterTabs: {
    ALL: {
      title: "All",
      tabId: "MEDICALNONMEDICAL",
      all: true,
      filter: true,
    },
    MYWO: {
      title: "My WO",
      tabId: "MYWO",
      filter: true,
    },
  },
  UI: { cardView: "card_view" },
  PAGE: {
    CURRENT: "page:current",
    PREVIOUS: "page:previous",
  },
};
