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

const deleteCartItem = (cart, { productId, colorId, size }) => (
  cart.filter(cartItem => {
    if(cartItem.productId === productId && cartItem.colorId === colorId && cartItem.size === size){
      return false
    }
    return true
  })
)

const changeCartItemSize = (cart, payload) => {
  const { productId, colorId, size, data } = payload

  cart.forEach(cartItem => {
    if(productId === cartItem.productId && colorId === cartItem.colorId && size === cartItem.size){
      cartItem.size = data
    }
  })

  const woExisting = cart.filter(cartItem => {
    if(productId === cartItem.productId && colorId === cartItem.colorId && data === cartItem.size){
      return false
    }
    return true
  })
  const withExisting = cart.filter(cartItem => {
    if(productId === cartItem.productId && colorId === cartItem.colorId && data === cartItem.size){
      return true
    }
    return false
  })

  console.log('withExisting', withExisting, 'woExisting', woExisting);
  const getUniqueFromExisting = (existing) => {
    // let qtyTotal = existing.reduce((acc, curr) => acc + (curr.qty), 0)
    // existing[0].qty = qtyTotal
    return existing[0]
  }

  const uniqueExisting = getUniqueFromExisting(withExisting)

  if(uniqueExisting){
    return [...woExisting, uniqueExisting]
  } else {
    return woExisting
  }
}

const changeCartItemQuantity = (cart, { productId, colorId, size, data }) => {
  cart.forEach(cartItem => {
    if(productId === cartItem.productId && colorId === cartItem.colorId && size === cartItem.size){
      cartItem.qty = data
    }
  })
  return cart
}

const addCartItem = (products, payload) => {
  let isInCart = false
  const { productId, colorId, size } = payload

  products.forEach((product) => {
    if(colorId === (product.colorId || product.id) && productId === product.productId && size === product.size){
      product.qty += payload.qty
      isInCart = true
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