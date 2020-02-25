import types from "../actions/types";

const INITIAL_STATE = {
  notifications: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.notifications.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.notification }]
      };
    case types.notifications.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        )
      };
    case types.notifications.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };
    default:
      return { ...state };
  }
};
