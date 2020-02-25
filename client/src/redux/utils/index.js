import { START, FAIL, SUCCESS } from "../actions/types";

export const tokenConfig = getState => {
  const { token } = getState().auth;
  if (!token) return {};
  return {
    Authorization: token
  };
};

export const createAsyncAction = ({ type, api, condition = () => true, onError, onSuccess }) => {
  return (...args) => async (dispatch, getState) => {
    if (condition(getState)) {
      dispatch({ type: type + START, payload: args });
      await api(getState, ...args)
        .then(res => {
          dispatch({ type: type + SUCCESS, payload: res.data });
          if (onSuccess) onSuccess(dispatch, getState, res.data);
        })
        .catch(error => {
          dispatch({ type: type + FAIL, payload: error });
          if (onError) onError(dispatch, getState, error);
        });
    }
  };
};
