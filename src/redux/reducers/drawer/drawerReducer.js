const initialState = {
  isOpen: false,
  inventoryForWorkOrder: {},
  openSideBarRouteBase: false,
  afterDraftOpenWorkorderForm: false,
  commonDrawer: {},
};

export const drawer = (state = initialState, action) => {
  switch (action.type) {
  case "TOGGLE_DRAWER": {
    return {
      ...state,
      isOpen: action.payload,
    };
  }

  case "TOGGLE_SIDE_BAR_ROUTE_BASE": {
    return {
      ...state,
      openSideBarRouteBase: action.payload,
    };
  }
  case "AFTER_DRAFT_OPEN_WORKORDER_FORM": {
    return {
      ...state,
      afterDraftOpenWorkorderForm: action.payload,
    };
  }

  case "COMMON_DRAWER": {
    return {
      ...state,
      commonDrawer: action.payload,
    };
  }

  default: {
    return state;
  }
  }
};
