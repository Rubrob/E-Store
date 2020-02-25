import types from "./types";
import api from "api";
import { enqueueSnackbar } from "./notifications";
import { createAsyncAction, tokenConfig } from "redux/utils";

export const setUserAddresses = createAsyncAction({
  type: types.auth.AUTH_SET_USER_ADDRESSES,
  api: async (getState, data) => await api.auth.updateUserAddresses(tokenConfig(getState), data),
  onSuccess: dispatch => dispatch(enqueueSnackbar("Succesfully updated!", { variant: "success" }))
});

export const getUser = createAsyncAction({
  type: types.auth.AUTH_GET_USER,
  api: async getState => await api.auth.getUser(tokenConfig(getState)),
  condition: getState => getState().auth.isAuthenticated
});

export const getUserOrders = createAsyncAction({
  type: types.auth.AUTH_GET_USER_ORDERS,
  api: async getState => await api.auth.getUserOrders(tokenConfig(getState))
});

export const signUp = createAsyncAction({
  type: types.auth.AUTH_SIGN_UP,
  api: async (_, data) => await api.auth.signUp(data),
  onSuccess: dispatch => dispatch(enqueueSnackbar("Welcome User", { variant: "success" })),
  onError: (dispatch, _, error) => dispatch(enqueueSnackbar(error.response.data.message, { variant: "error" }))
});

export const logIn = createAsyncAction({
  type: types.auth.AUTH_LOG_IN,
  api: async (_, data) => await api.auth.logIn(data),
  onSuccess: dispatch => dispatch(enqueueSnackbar("Welcome User", { variant: "success" })),
  onError: (dispatch, _, error) => dispatch(enqueueSnackbar(error.response.data, { variant: "error" }))
});

export const logOut = () => async dispatch => {
  dispatch({ type: types.auth.AUTH_LOG_OUT });
};

export const oauthThirdParty = createAsyncAction({
  type: types.auth.AUTH_SIGN_UP,
  api: async (_, party, accessToken) => await api.auth.oauthThirdParty(party, accessToken),
  onSuccess: (dispatch, _, data) => dispatch(enqueueSnackbar("Welcome User", { variant: "success" })),
  onError: (dispatch, _, error) => dispatch(enqueueSnackbar(error.response.data, { variant: "error" }))
});
