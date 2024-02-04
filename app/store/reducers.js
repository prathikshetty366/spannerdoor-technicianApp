import { combineReducers } from "redux";

import Todo from "./todo/reducer";
import User from './user/reducer'

const rootReducer = combineReducers({
  Todo,
  User,
});

export default rootReducer;
