import types from "./types";
import { randomStr } from "utils/index";

export const enqueueSnackbar = (message, options) => {
  return {
    type: types.notifications.ENQUEUE_SNACKBAR,
    notification: {
      message,
      options,
      key: randomStr()
    }
  };
};

export const closeSnackbar = key => ({
  type: types.notifications.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = key => ({
  type: types.notifications.REMOVE_SNACKBAR,
  key
});

export const errorHandler = errors => dispatch => {
  for (let key in errors) {
    if (Array.isArray(errors[key])) {
      errors[key].forEach(error => {
        dispatch(enqueueSnackbar(error, { variant: "error" }));
      });
    } else {
      dispatch(enqueueSnackbar(errors[key], { variant: "error" }));
    }
  }
};
