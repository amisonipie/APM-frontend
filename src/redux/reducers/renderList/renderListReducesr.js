const initialState = {
  toggleDrawer: false,
  callListingData: false,
  filterSideBarRight: {},
  isEditConfirmation: false,
  isDiscardConfirmation: false,
  type: "",
};
export const RenderList = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER": {
      return {
        ...state,
        toggleDrawer: action?.payload?.isToggle,
        renderFormData: action?.payload?.renderFormData,
        type: action.payload.type || initialState.type,
      };
    }
    case "EDIT_CONFIRMATION": {
      return {
        ...state,
        isEdit: action?.payload,
      };
    }
    case "EDIT_ADDITIONALFIELD_CONFIRMATION": {
      return {
        ...state,
        isEditAdditional: action?.payload,
      };
    }
    case "SHOW_DISCARD_CONFIRMATION": {
      return {
        ...state,
        isDiscardConfirmation: action?.payload,
      };
    }
    case "GET_LISTING_DATA": {
      return {
        ...state,
        callListingData: !state.callListingData,
      };
    }

  case "FILTER_LISTING_DATA": {
    return {
      ...state,
      filterSideBarRight: {
        ...state.filterSideBarRight,
        [action.payload.module]: {
          ...state.filterSideBarRight[action.payload.module],
          filteredFields: action.payload.filteredData || {},
          localStateFilteredFields: JSON.stringify(action.payload.localState),
          uiTabFilteredFields: action.payload.uiTabFilteredData || {},
        },
      },
    };
  }

  case "TOGGLE_FILTER_MODAL": {
    const currentModalState = state.filterSideBarRight[action.payload.module]?.modal;

    return {
      ...state,
      filterSideBarRight: {
        ...state.filterSideBarRight,
        [action.payload.module]: {
          filteredFields: action.payload.filteredData || {},
          localStateFilteredFields: JSON.stringify(action.payload.localState),
          modal: !currentModalState,
        },
      },
    };
  }

  case "RESET_LISTING_DATA": {
    return {
      ...state,
      filterSideBarRight: {},
    };
  }
  default: {
    return state;
  }
  }
};
