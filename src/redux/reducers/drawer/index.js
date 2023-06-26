import { combineReducers } from "redux";
import { drawer } from "./drawerReducer";

const drawerReducers = combineReducers({
  drawer,
});

export default drawerReducers;
