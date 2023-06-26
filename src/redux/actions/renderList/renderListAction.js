export const toggleGetData = (payload) => {
  return { type: "TOGGLE_DRAWER", payload };
};
export const editConfirmation = (payload) => {
  return { type: "EDIT_CONFIRMATION", payload };
};

export const editAdditionalConfirmation = (payload) => {
  return { type: "EDIT_ADDITIONALFIELD_CONFIRMATION", payload };
};

export const showDisacrdConfirmation = (payload) => {
  return { type: "SHOW_DISCARD_CONFIRMATION", payload };
};

export const getListingData = () => ({ type: "GET_LISTING_DATA" });

export const filterListingData = (payload) => ({ type: "FILTER_LISTING_DATA", payload });

export const resetListingData = () => ({ type: "RESET_LISTING_DATA" });

export const toggleReduxFilterModal = (payload) => ({ type: "TOGGLE_FILTER_MODAL", payload });
