import types, { SUCCESS, START } from "../actions/types";

const INITIAL_STATE = {
  currency: "$",
  products: [],
  suggestions: [],
  suggestions_total: 0,
  loading: false,
  error: false,
  subheaderTitle: "",
  productPage: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.products.GET_PRODUCTS + SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products
      };
    case types.products.GET_PRODUCTS + START:
      return {
        ...state,
        loading: true
      };
    case types.products.GET_PRODUCT_PAGE + SUCCESS:
      return {
        ...state,
        productPage: payload
      };
    case types.products.GET_SUGGESTIONS + SUCCESS:
      return {
        ...state,
        suggestions: payload.products,
        suggestions_total: payload.products_total
      };
    case types.products.EMPTY_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
        suggestions_total: 0
      };
    case types.products.SET_SUBHEADER_TITLE:
      return {
        ...state,
        subheaderTitle: payload
      };
    default:
      return { ...state };
  }
};
