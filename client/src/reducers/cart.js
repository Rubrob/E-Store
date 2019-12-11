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
import _ from 'lodash'
import {LS} from './../utils';

const initialState = {
  cartProducts: LS.get('CART') || [],
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
  count: 0,
  deliveryMethods: {
    standard: 0,
    expedited: 10,
    overnight: 15
  }
}

// REDUCER CONTROLLERS
const addCartItem = (products, payload) => {
  const {productId, colorId, size} = payload
  let alreadyInCart = _.find(products, {colorId, productId, size})

  if(alreadyInCart){
    alreadyInCart.qty += payload.qty
  }else{
    products.push(payload)
  }
  return products
}

const deleteCartItem = (cart, {productId, colorId, size}) => (
  _.reject(cart, {productId, colorId, size})
)

const changeCartItemSize = (cart, payload) => {
  const {productId, colorId, size, data} = payload
  const target = _.find(cart, {productId, colorId, size})
  if(target){
    target.size = data
  }
  const [conflicted, other] = _.partition(cart, {productId, colorId, size: data})
  return [..._.uniqBy(conflicted, 'size'), ...other]
}

const changeCartItemQuantity = (cart, {productId, colorId, size, data}) => {
  const cartItem = _.find(cart, {productId, colorId, size})
  if(cartItem){
    cartItem.qty = data
  }
  return cart
}


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
        total: payload.totalPrice,
        count: payload.totalCount
      }
    default:
      return { ...state }
  }
}
export default cartReducer