import {
  CHANGE_DELIVERY,
  NEXT_STEP,
  PREV_STEP,
  SUBMIT_SHIPPING,
  SUBMIT_CHECKOUT,
  SET_SHIPPING,
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_SIZE,
  DELETE_CART_PRODUCT,
  EMPTY_CART,
} from './actions/cart'

const totalRecalculation = (products) => {
  return products.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)
}

const initialState = {
  cartProducts: JSON.parse(localStorage.getItem('CART')) || [],
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


const productCardReducer = (state = initialState, { type, payload }) => {
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
    case SET_SHIPPING:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          shipping: { ...state.checkout.shipping, ...payload }
        }
      }
    case ADD_TO_CART:
      const products = [...state.cartProducts]
      let isInCart = false

      products.forEach((p, i) => {
        const { productId, colorId, size } = payload
        if(colorId ===(p.colorId || p.id) && productId === p.productId && size === p.size){
          isInCart = true
          p.qty += payload.qty
        }
      })

      if(!isInCart){
        products.push(payload)
      }

      localStorage.setItem('CART', JSON.stringify(products))
      const ATCtotal = totalRecalculation(products)
      return { ...state, cartProducts: products, total: ATCtotal }
    case CHANGE_PRODUCT_QUANTITY:
      const productsQuantity = [...state.cartProducts].map((p, i) => {
        const { productId, colorId, size, data } = payload
        if(productId === p.productId && colorId === p.colorId && size === p.size){
          p.qty = data
        }
        return p
      })

      const CPQtotal = totalRecalculation(productsQuantity)

      localStorage.setItem('CART', JSON.stringify(productsQuantity))
      return { ...state, cartProducts: productsQuantity, total: CPQtotal }
    case CHANGE_PRODUCT_SIZE:
      const ProductsSize = [...state.cartProducts].filter(p => {
        const { productId, colorId, size, data } = payload
        if(productId === p.productId && colorId === p.colorId && data === p.size){
          if(size !== p.size){ return false }
        }
        if(productId === p.productId && colorId === p.colorId && size === p.size){
          p.size = data
        }
        return p
      })

      localStorage.setItem('CART', JSON.stringify(ProductsSize))
      return { ...state, cartProducts: ProductsSize }
    case DELETE_CART_PRODUCT:
      const cartF = [...state.cartProducts]
      const filtered = cartF.filter(p => {
        const { productId, colorId, size } = payload
        return productId === p.productId && colorId === p.colorId && size === p.size ? false : true
      })

      const DCPtotal = totalRecalculation(filtered)

      localStorage.setItem('CART', JSON.stringify(filtered))
      return { ...state, cartProducts: filtered, total: DCPtotal }
    case EMPTY_CART:
      localStorage.removeItem('CART')
      return { ...state, cartProducts: [], total: 0 }
    default:
      return { ...state }
  }
}
export default productCardReducer