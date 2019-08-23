import axios from 'axios'

import {
  NEXT_STEP,
  PREV_STEP,
  CHANGE_DELIVERY,
  SUBMIT_SHIPPING,
  SUBMIT_CHECKOUT,
  ADD_TO_CART,
  DELETE_CART_PRODUCT,
  CHANGE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_SIZE,
  EMPTY_CART,
  RESET_CART,
  TOTAL_PRICE_RECALCULATION
} from './types';

export const addToCart = value => ({ type: ADD_TO_CART, payload: value })
export const deleteCartProduct = value => ({ type: DELETE_CART_PRODUCT, payload: value})
export const changeDelivery = value => ({ type: CHANGE_DELIVERY, payload: value })

export const totalRecalculation = (cart) => dispatch => {
  const recalculation = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)
  dispatch({ type: TOTAL_PRICE_RECALCULATION, payload: recalculation })
}

export const nextStep = () => ({ type: NEXT_STEP })
export const prevStep = () => ({ type: PREV_STEP })

export const submitShipping = value => dispatch => {
  dispatch(nextStep())
  dispatch({ type: SUBMIT_SHIPPING, payload: value })
}

export const submitCheckout = (data, callbacks) => async dispatch => {

  const billing = {}
  const { onSuccess, onFail } = callbacks
  const { cardnumber, exp, cvv, ...rest } = data.billing

  if (data.bas === true) {
    const { firstname, lastname, address, country, city, zip } = data.shipping
    billing.card = { cardnumber,  exp, cvv }
    billing.address = { firstname, lastname, address, country, city, zip }
  } else {
    billing.card = { cardnumber,  exp, cvv }
    billing.address = { ...rest }
  }

  const user_id = await localStorage.getItem('USER_ID')
  const postData = {
    user_id,
    addresses: {
      shipping: data.shipping,
      billing
    },
    delivery: data.delivery,
    order: data.products
  }

  try {
    await axios.post('/order', { data: postData })
    .then((res) => {
      localStorage.removeItem('CART')
      dispatch({ type: EMPTY_CART })
      return res
    })
    .then((res) => onSuccess(res.data.message))
  } catch (err) {
    await onFail(`Couldn't connect to the server ${err}`)
  }

  dispatch({ type: SUBMIT_CHECKOUT, payload: postData })
}

export const changeProductQuantity = value => ({ type: CHANGE_PRODUCT_QUANTITY, payload: value })
export const changeProductSize = value => ({ type: CHANGE_PRODUCT_SIZE, payload: value })

export const checkCartProducts = (products, cart)  => dispatch => {

  return new Promise((resolve, reject) => {
    resolve(cart)
  })
  .then((checked) => {
    const pchecked = []

    const checkCartRelevance = (item, cartItem) => {
      return item.id === cartItem.colorId && item.availability >= cartItem.availability && item.sizes.indexOf(cartItem.size) !== -1
    }

    const sortCart = (arr, cartItem) => arr.forEach(item => {
      if(checkCartRelevance(item, cartItem)){
        if(pchecked.indexOf(cartItem) === -1){
          pchecked.push(cartItem)
        }
      }
    })

    const loopCart = (item, cart) => {
      cart.forEach(cartItem => item.id === cartItem.productId ? sortCart(item.colors, cartItem) : null)
    }

    products.forEach(item => loopCart(item, checked))

    return pchecked
  })
  .then(res => {
    if (res.length) {
      dispatch({ type: RESET_CART, payload: res })
    }
  })

  // const forSome = []

  // products.forEach(product => {
  //   cart.forEach(item => {
  //     const some = (a) => a.id === item.colorId && a.availability >= item.availability && a.sizes.indexOf(item.size) !== -1
  //     if(product.colors.some(some)){
  //       forSome.push(item)
  //     }
  //   })
  // })
  // console.log('forSome', forSome);

  // return checked.length >= 1 ? false : true
}

export const emptyCart = () => ({ type: EMPTY_CART })