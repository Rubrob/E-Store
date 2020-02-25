import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "redux/reducers";

const INITIAL_STATE = {};
const MIDDLEWARE = [thunk];

export default createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...MIDDLEWARE))
);
