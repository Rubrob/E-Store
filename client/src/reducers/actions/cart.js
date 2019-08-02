import axios from 'axios'

export const CHANGE_DELIVERY = 'CHANGE_DELIVERY'
export const NEXT_STEP = 'NEXT_STEP'
export const PREV_STEP = 'PREV_STEP'
export const SUBMIT_SHIPPING = 'SUBMIT_SHIPPING'
export const SUBMIT_CHECKOUT = 'SUBMIT_CHECKOUT'
export const SET_SHIPPING =  'SET_SHIPPING'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY'
export const CHANGE_PRODUCT_SIZE = 'CHANGE_PRODUCT_SIZE'
export const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'
export const EMPTY_CART = 'EMPTY_CART'
export const CART_INIT = 'CART_INIT'


export const addToCart = value => ({ type: ADD_TO_CART, payload: value })
export const deleteCartProduct = value => ({ type: DELETE_CART_PRODUCT, payload: value})
export const setShippingAddress = value => ({ type: SET_SHIPPING, payload: value })
export const changeDelivery = value => ({ type: CHANGE_DELIVERY, payload: value })

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
    const res = await axios.post('/order', { data: postData })
    await onSuccess(res.data.message)
  } catch (err) {
    await onFail(`Couldn't connect to the server ${err}`)
  }

  dispatch({ type: SUBMIT_CHECKOUT, payload: postData })
}

export const changeProductQuantity = value => ({ type: CHANGE_PRODUCT_QUANTITY, payload: value})
export const changeProductSize = value => ({ type: CHANGE_PRODUCT_SIZE, payload: value})

export const checkCartProducts = (products, cart)  => {
  const checked = []
  const checkColorAvailability = (arr, comparable) => arr.forEach(item => {
    if(item.availability < comparable.availability ||
      item.sizes.indexOf(comparable.size) === -1 ||
      item.id !== comparable.colorId){
      checked.push(comparable)
    }
  })

  products.forEach(item => cart.forEach(cartItem => item.id === cartItem.productId ? checkColorAvailability(item.colors, cartItem) : null))

  return new Set(checked).size >= 1 ? false : true
}

export const emptyCart = () => ({ type: EMPTY_CART })