export const toggleDrawer = (payload) => ({ type: "TOGGLE_DRAWER", payload });

export const toggleSideBarRouteBase = (payload) => ({ type: "TOGGLE_SIDE_BAR_ROUTE_BASE", payload });

export const formToggler = (payload) => {
  return { type: "AFTER_DRAFT_OPEN_WORKORDER_FORM", payload };
};

export const commonDrawer = (payload) => {
  return { type: "COMMON_DRAWER", payload };
};
