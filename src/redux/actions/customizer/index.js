export const loadTheme = (value) => (dispatch) => dispatch({ type: "LOAD_THEME", value });

export const changeMode = (mode) => (dispatch) => dispatch({ type: "CHANGE_MODE", mode });

export const collapseSidebar = (value) => (dispatch) => dispatch({ type: "COLLAPSE_SIDEBAR", value });

export const hideScrollToTop = (value) => (dispatch) => dispatch({ type: "HIDE_SCROLL_TO_TOP", value });

export const changeMenuColor = (style) => (dispatch) => dispatch({ type: "CHANGE_MENU_COLOR", style });

export const changeDirection = (direction) => (dispatch) => dispatch({ type: "CHANGE_DIRECTION", direction });

export const changeFooterType = (style) => (dispatch) => dispatch({ type: "CHANGE_FOOTER_TYPE", style });

export const changeNavbarType = (style) => (dispatch) => dispatch({ type: "CHANGE_NAVBAR_TYPE", style });

export const changeNavbarColor = (color) => (dispatch) => dispatch({ type: "CHANGE_NAVBAR_COLOR", color });

export const changeScrollPosition = (offset) => (dispatch) => dispatch({ type: "CHANGE_SCROLL_POSITION", offset });