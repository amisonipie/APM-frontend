const initialState = {
  visible: false,
  message: "",
  color: "",
};
export const alert = (state = initialState, action) => {
  switch (action.type) {
  case "SET_ALERT": {
    return (state = action.payload);
  }
  default: {
    return state;
  }
  }
};
