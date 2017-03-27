import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import headerState from './headerReducer';
import authState from './authReducer';

// main reducers
export const reducers = combineReducers({
  form: formReducer,
  routing,
  headerState,
  authState
});