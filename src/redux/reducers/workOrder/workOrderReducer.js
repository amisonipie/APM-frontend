const initialState = {
  isTechnicianForm: false,
};
export const workOrder = (state = initialState, action) => {
  switch (action.type) {
  case "TOGGLE_TECHNICIAN_FORM": {
    return {
      ...state,
      isTechnicianForm: action.payload,
    };
  }
  default: {
    return state;
  }
  }
};
