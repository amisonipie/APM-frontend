import { combineReducers } from "redux";
import { workOrder } from "./workOrderReducer";

const authReducers = combineReducers({
  workOrder,
});

export default authReducers;
