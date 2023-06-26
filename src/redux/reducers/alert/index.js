import { combineReducers } from "redux";
import { alert } from "./alertReducer";

const authReducers = combineReducers({
  alert,
});

export default authReducers;
