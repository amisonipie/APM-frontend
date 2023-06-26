require("dotenv").config();

module.exports = {
  env: {
    APP_VERSION: process.env.REACT_APP_VERSION || 1.0,

    BACKEND_VERSION: process.env.REACT_APP_BACKEND_VERSION || "v1",
    API_LAB: process.env.REACT_APP_API_LAB || "https://api.com.sa",

    BUGSNAG_KEY: process.env.REACT_APP_BUGSNAG_KEY || "abcd1234",

    ENV: process.env.REACT_APP_ENV || "develop",

    PASS_ENCRYPT_KEY: process.env.REACT_APP_PASS_ENCRYPT_KEY || "abcd1234",

    AWS_ACCESS_KEY_ID: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "abcd1234",
    AWS_BUCKET: process.env.REACT_APP_AWS_BUCKET || "my-bucket",
    AWS_DEFAULT_REGION: process.env.REACT_APP_AWS_DEFAULT_REGION || "west",
    AWS_URL: process.env.REACT_APP_AWS_URL || "https://ascend.com.sa",
    AWS_SECRET_ACCESS_KEY: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "abcd1234",
    AWS_BUCKET_URL: process.env.REACT_APP_AWS_BUCKET_URL || "https://ascend.com.sa",

    SUPPORT_API_BASEURL: process.env.REACT_APP_SUPPORT_API_BASEURL || "https://dev-nhcc.digitum.com.sa/api/v2/",
    SUPPORT_ORGANIZATION_ID: process.env.REACT_APP_SUPPORT_ORGANIZATION_ID || "abcda123982173",
    SUPPORT_TEAM_ID: process.env.REACT_APP_SUPPORT_TEAM_ID || "7429dhn12321988dd921",
    SUPPORT_SUB_TEAM_ID: process.env.REACT_APP_SUPPORT_SUB_TEAM_ID || "abcd12983021ds21ad2sa123ud03ue0",

    GOOGLE_MAPS_JAVASCRIPT_API: process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API || "acbd213021ieds09ad32iedw",
    PROJECT: process.env.REACT_APP_PROJECT || "apm",
  },

  codeword: {
    REACT_VERSION_MISMATCH: "REACT_VERSION_MISMATCH",
    WORKORDER_EXIST_24H: "WORKORDER_CREATION_WITHIN_TIME_LIMIT",
    ASSET_RETIREMENT_DISABLED: "ASSET_RETIREMENT_DISABLED_WITH_WORKORDERS_EXISTENCE",
  },
  dashboardComparisonID: "22943196-f16a-11ec-8ea0-0242ac120002",
  userRole: {
    superAdmin: "super_admin",
    siteAdmin: "site_admin",
    organizationAdmin: "organization_admin",
    hmcTechnician: "hmc_technician",
    hmcSupervisor: "hmc_supervisor",
    staff: "staff",
    engineer: "engineer",
  },
  site_model: {
    makeShift: "MAKESHIFT",
    permanent: "PERMANENT",
    imc: "IMC",
    ascendServices: "ASCENDSERVICES",
    MakeShiftAndPermanent: ["MAKESHIFT", "PERMANENT"],
  },

  classification: {
    medical: "medical",
    nonMedical: "nonmedical",
    generic: "generic",
    all: "all",
  },

  types: {
    medical: "MEDICAL",
    nonmedical: "NONMEDICAL",
    generic: "GENERIC",
  },

  woType: {
    corrective: "corrective",
    preventive: "preventive",
  },
  inventoryStatus: {
    inService: "IN_SERVICE",
    retired: "RETIRED",
  },
};
