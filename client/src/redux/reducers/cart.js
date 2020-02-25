import types, { SUCCESS } from "../actions/types";

const INITIAL_STATE = {
  cart: [],
  checkout: {
    addresses: {
      shipping: {},
      billing: {}
    }
  },
  totalPrice: 0,
  totalQuantity: 0,
  selectedDelivery: "standard",
  deliveryMethods: {
    standard: 0,
    expedited: 10,
    overnight: 15
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.cart.CHANGE_DELIVERY:
      return {
        ...state,
        selectedDelivery: payload
      };
    case types.cart.SUBMIT_SHIPPING:
      return {
        ...state,
        checkout: {
          addresses: {
            ...state.checkout.addresses,
            shipping: payload
          }
        }
      };
    case types.cart.SUBMIT_BILLING:
      return {
        ...state,
        checkout: {
          addresses: {
            ...state.checkout.addresses,
            billing: payload
          }
        }
      };
    case types.cart.SUBMIT_CHECKOUT + SUCCESS:
      return {
        ...state,
        checkout: {
          addresses: {
            shipping: {},
            billing: {}
          }
        },
        cart: [],
        totalPrice: 0,
        totalQuantity: 0
      };
    case types.cart.VALIDATE_CART + SUCCESS:
      return {
        ...state,
        ...payload
      };

    default:
      return { ...state };
  }
};
