import types, { START, SUCCESS, FAIL } from "../actions/types";
import { LS } from "utils";

const jwtToken = LS.get("JWT_TOKEN");

const INITIAL_STATE = {
  token: jwtToken,
  error: false,
  loading: false,
  isAuthenticated: jwtToken ? true : false,
  fullname: "",
  addresses: {
    shipping: {},
    billing: {}
  },
  orders: []
};

const auth = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.auth.AUTH_GET_USER + START:
      return {
        ...state,
        loading: true
      };
    case types.auth.AUTH_GET_USER + SUCCESS:
      return {
        ...state,
        loading: false,
        fullname: payload.fullname,
        addresses: payload.addresses
      };
    case types.auth.AUTH_GET_USER + FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case types.auth.AUTH_GET_USER_ORDERS + START:
      return {
        ...state,
        loading: true
      };
    case types.auth.AUTH_GET_USER_ORDERS + SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload.orders
      };
    case types.auth.AUTH_GET_USER_ORDERS + FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case types.auth.AUTH_SET_USER_ADDRESSES:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          ...payload.addresses
        }
      };
    case types.auth.AUTH_SIGN_UP + SUCCESS:
      LS.set("JWT_TOKEN", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true
      };
    case types.auth.AUTH_LOG_IN + SUCCESS:
      LS.set("JWT_TOKEN", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true
      };
    case types.auth.AUTH_LOG_OUT:
      LS.remove("JWT_TOKEN");
      return {
        ...state,
        addresses: {
          shipping: {},
          billing: {}
        },
        fullname: "",
        token: null,
        isAuthenticated: false
      };
    case types.auth.AUTH_SIGN_UP + FAIL:
      LS.remove("JWT_TOKEN");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    case types.auth.AUTH_LOG_IN + FAIL:
      LS.remove("JWT_TOKEN");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    default:
      return { ...state };
  }
};

export default auth;
