import api from "api";
import types from "./types";
import { createAsyncAction } from "redux/utils";

export const dispatchProducts = createAsyncAction({
  type: types.products.GET_PRODUCTS,
  api: async (_, category_slug, params) =>
    await api.products.getProducts(category_slug, params)
});

export const dispatchProduct = createAsyncAction({
  type: types.products.GET_PRODUCT_PAGE,
  api: async (_, category_slug, params) =>
    await api.products.getProduct(category_slug, params)
});

export const dispatchClearSuggestions = () => ({
  type: types.products.EMPTY_SUGGESTIONS
});

export const dispatchSearchSuggestions = createAsyncAction({
  type: types.products.GET_SUGGESTIONS,
  api: async (_, search_str) => await api.products.getSuggestions(search_str)
});

export const dispatchSubheaderTitle = payload => ({
  type: types.products.SET_SUBHEADER_TITLE,
  payload
});
