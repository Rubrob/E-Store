import types from "./types";
import api from "api";
import { enqueueSnackbar } from "./notifications";
import { createAsyncAction, tokenConfig } from "redux/utils";

export const setDeliveryMethod = payload => ({
  type: types.cart.CHANGE_DELIVERY,
  payload
});

export const submitShipping = payload => ({
  type: types.cart.SUBMIT_SHIPPING,
  payload
});

export const sumbitBilling = payload => ({
  type: types.cart.SUBMIT_BILLING,
  payload
});

export const submitCheckout = createAsyncAction({
  type: types.cart.SUBMIT_CHECKOUT,
  api: async (getState, formdata) => {
    const { selectedDelivery } = getState().cart;
    const data = {
      delivery: selectedDelivery,
      ...formdata
    };
    return await api.products.checkout(tokenConfig(getState), data);
  },
  onSuccess: (dispatch, _, res) => dispatch(enqueueSnackbar(res.message, { variant: "success" })),
  onError: (dispatch, _, error) => dispatch(enqueueSnackbar(error.response.data.message, { variant: "error" }))
});

export const dispatchValidateCart = createAsyncAction({
  type: types.cart.VALIDATE_CART,
  api: async () => await api.products.validateCart()
});

export const dispatchAddToCart = createAsyncAction({
  type: types.cart.ADD_CART_ITEM,
  api: async (_, data) => await api.products.addToCart(data),
  onSuccess: async dispatch => {
    await dispatch(dispatchValidateCart());
    dispatch(
      enqueueSnackbar("Succesfully added to cart", {
        variant: "success"
      })
    );
  }
});

export const dispatchUpdateCartItem = createAsyncAction({
  type: types.cart.UPDATE_CART_ITEM,
  api: async (_, data, sku) => await api.products.updateCartItem(data, sku),
  onSuccess: async dispatch => {
    await dispatch(dispatchValidateCart());
    dispatch(
      enqueueSnackbar("Succesfully updated", {
        variant: "success"
      })
    );
  }
});

export const dispatchDeleteCartItem = createAsyncAction({
  type: types.cart.DELETE_CART_ITEM,
  api: async (_, sku) => await api.products.deleteCartItem(sku),
  onSuccess: async dispatch => {
    await dispatch(dispatchValidateCart());
    dispatch(
      enqueueSnackbar("Succesfully deleted", {
        variant: "success"
      })
    );
  }
});
