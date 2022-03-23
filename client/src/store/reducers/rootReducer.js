import todoReducer from "./todosReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  auth: authReducer,
});

export default rootReducer;
