import { arrayHead } from "utility/helper";
import { getJSONArrayUniqueElements } from "utility/transformers";

const initialState = {
  data: {
    _id: "",
    name: "",
    email: "",
    role: "",
    field: "",
    phone: "",
    token: "",
    lab: {},
    hmcs: [],
    permissions: [],
    active: false,
    sites: [],
    models: [],
  },
  requestLoading: true,
  intendedRoute: "",
};
export const login = (state = initialState, action) => {
  switch (action.type) {
  case "LOGIN_WITH_JWT": {
    const data = { ...action.payload };
    data.lab = arrayHead(data?.sites);
    data.models = getJSONArrayUniqueElements(data?.sites, "model");

    return {
      ...state,
      data,
      requestLoading: false,
      intendedRoute: "",
    };
  }
  case "LOGOUT": {
    return { ...initialState, intendedRoute: action.payload || "" };
  }

  default: {
    return state;
  }
  }
};
