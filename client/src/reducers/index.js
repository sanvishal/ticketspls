import { combineReducers } from "redux";
import authReducer from "./authReducers";
import movieReducer from "./movieReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  movies: movieReducer,
});
