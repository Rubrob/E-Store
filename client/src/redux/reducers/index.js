import { combineReducers } from "redux";
import cart from "./cart";
import products from "./products";
import auth from "./auth";
import notifications from "./notifications";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  auth,
  cart,
  products,
  notifications,
  form: formReducer
});

export default rootReducer;
