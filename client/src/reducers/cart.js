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
  RESET_CART,
  TOTAL_PRICE_RECALCULATION
} from './actions/cart'

const cart = JSON.parse(localStorage.getItem('CART'))
const fakeitem = {
  availability: 13,
  color: "pink",
  colorId: "Grt3H-pink",
  gender: "men",
  img: "https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/28e054c800ea44a4a8bea7fb007fc05d_9366/Gazelle_Shoes_Pink_BB5472_01_standard.jpg",
  price: 85,
  productId: "Grt3H",
  qty: 1,
  size: 111,
  sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 11],
  title: "Gazelle",
  url: "/pp/Grt3H/Grt3H-pink",
}
// cart.push(fakeitem)
// localStorage.setItem('CART', JSON.stringify([...cart, fakeitem]))

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

      return { ...state, cartProducts: products }
    case CHANGE_PRODUCT_QUANTITY:
      const productsQuantity = [...state.cartProducts].map((p, i) => {
        const { productId, colorId, size, data } = payload
        if(productId === p.productId && colorId === p.colorId && size === p.size){
          p.qty = data
        }
        return p
      })

      return { ...state, cartProducts: productsQuantity }
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

      return { ...state, cartProducts: ProductsSize }
    case DELETE_CART_PRODUCT:
      const cartF = [...state.cartProducts]
      const filtered = cartF.filter(p => {
        const { productId, colorId, size } = payload
        return productId === p.productId && colorId === p.colorId && size === p.size ? false : true
      })

      return { ...state, cartProducts: filtered }
    case EMPTY_CART:
      localStorage.removeItem('CART')
      return { ...state, cartProducts: [], total: 0 }
    case RESET_CART:
      return { ...state, cartProducts: payload  }
    case TOTAL_PRICE_RECALCULATION:
      return { ...state, total: payload }
    default:
      return { ...state }
  }
}
export default productCardReducer