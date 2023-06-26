import { combineReducers } from "redux";
import customizer from "./customizer";
import auth from "./auth";
import alert from "./alert";
import drawer from "./drawer";
import renderList from "./renderList";
import workOrder from "./workOrder";

const rootReducer = combineReducers({
  customizer,
  auth,
  alert,
  drawer,
  renderList,
  workOrder,
});

export default rootReducer;
