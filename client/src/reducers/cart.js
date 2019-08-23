import {
  CHANGE_DELIVERY,
  NEXT_STEP,
  PREV_STEP,
  SUBMIT_SHIPPING,
  SUBMIT_CHECKOUT,
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_SIZE,
  DELETE_CART_PRODUCT,
  EMPTY_CART,
  RESET_CART,
  TOTAL_PRICE_RECALCULATION
} from '../actions/types'

const cart = JSON.parse(localStorage.getItem('CART'))
const initialState = {
  cartProducts: cart || [],
  currency: '$',
  checkout: {
    addresses: {
      shipping: {},
      billing: {}
    }
  },
  defaultValues: {
    delivery: 'standard'
  },
  step: 1,
  total: 0,
  deliveryMethods: {
    standard: 0,
    expedited: 10,
    overnight: 15
  }
}

// REDUCER CONTROLLERS

const deleteCartItem = (cart, payload) => {
  const { productId, colorId, size } = payload
  return cart.filter(cartItem => productId === cartItem.productId && colorId === cartItem.colorId && size === cartItem.size ? false : true)
}

const changeCartItemSize = (cart, payload) => {
  const { productId, colorId, size, data } = payload
  return cart.filter(cartItem => {
    const isID = productId === cartItem.productId && colorId === cartItem.colorId
    if(isID && data === cartItem.size){
      if(size !== cartItem.size){
        return false
      }
    }
    if(isID && size === cartItem.size){
      cartItem.size = data
    }
    return cartItem
  })
}

const changeCartItemQuantity = (cart, payload) => {
  const { productId, colorId, size, data } = payload
  return cart.map(cartItem => {
    if(productId === cartItem.productId && colorId === cartItem.colorId && size === cartItem.size){
      cartItem.qty = data
    }
    return cartItem
  })
}

const addCartItem = (products, payload) => {
  let isInCart = false
  const { productId, colorId, size } = payload

  products.forEach((product) => {
    if(colorId === (product.colorId || product.id) && productId === product.productId && size === product.size){
      isInCart = true
      product.qty += payload.qty
    }
  })

  if(!isInCart){
    products.push(payload)
  }

  localStorage.setItem('CART', JSON.stringify(products))
  return products
}


// REDUCER

const cartReducer = (state = initialState, { type, payload }) => {
  switch(type){
    case CHANGE_DELIVERY:
      return { ...state, defaultValues: { ...state.defaultValues, delivery: payload } }
    case NEXT_STEP:
        return { ...state, step: state.step + 1 }
    case PREV_STEP:
        return { ...state, step: state.step - 1 }
    case SUBMIT_SHIPPING:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          addresses: {
            ...state.checkout.addresses,
            shipping: { ...state.checkout.addresses.shipping, ...payload }
          }
        }
      }
    case SUBMIT_CHECKOUT:
      return {
        ...state,
        checkout: { ...state.checkout, ...payload }
      }
    case ADD_TO_CART:
      return {
        ...state,
        cartProducts: addCartItem([...state.cartProducts], payload)
      }
    case CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        cartProducts: changeCartItemQuantity([...state.cartProducts], payload)
      }
    case CHANGE_PRODUCT_SIZE:
      return {
        ...state,
        cartProducts: changeCartItemSize([...state.cartProducts], payload)
      }
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        cartProducts: deleteCartItem([...state.cartProducts], payload)
      }
    case EMPTY_CART:
      return {
        ...state,
        cartProducts: [],
        total: 0
      }
    case RESET_CART:
      return {
        ...state,
        cartProducts: payload
      }
    case TOTAL_PRICE_RECALCULATION:
      return {
        ...state,
        total: payload
      }
    default:
      return { ...state }
  }
}
export default cartReducer