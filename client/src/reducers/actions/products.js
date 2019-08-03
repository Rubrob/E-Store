import axios from 'axios'

export const PRODUCT_PAGE = 'PRODUCT_PAGE'
export const SORT_LOW_TO_HIGH = 'SORT_LOW_TO_HIGH'
export const SORT_HIGH_TO_LOW = 'SORT_HIGH_TO_LOW'
export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'
export const FILTER_PRODUCTS_WITH_URL = 'FILTER_PRODUCTS_WITH_URL'
export const SEARCH = 'SEARCH'
export const RESET_FILTER = 'RESET_FILTER'

export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL'

export const getProductPage = (id, products) => products.filter(product => id === product.id)[0]

export const sortHighToLow = () => ({ type: SORT_HIGH_TO_LOW })
export const sortLowToHigh = () => ({ type: SORT_LOW_TO_HIGH })
export const addFilter = value => ({ type: ADD_FILTER, payload: value })
export const removeFilter = value => ({ type: REMOVE_FILTER, payload: value })

export const filterURL = (url, split, count) => {
  const splitWithTail = (str, split, count) => {
    let parts = str.split(split)
    let tail = parts.slice(count).join(split)
    let result = parts.slice(0, count)
    result.push(tail)
    return result
  }
  return splitWithTail(url, split, count)
}

export const filterProductsWithURL = value => ({ type: FILTER_PRODUCTS_WITH_URL, payload: value })
export const searchProduct = value => ({ type: SEARCH, payload: value })
export const resetFilter = () => ({ type: RESET_FILTER })

export const getFilters = (products) => {
  const byColor = [], bySize = []
  products.forEach(p => {
    p.colors.forEach(color => {
      color.sizes.forEach(size => (bySize.indexOf(size) === -1) ? bySize.push(size) : null)
      if(byColor.indexOf(color.color) === -1){
        byColor.push(color.color)
      }
    })
  })
  return [byColor, bySize]
}

export const fetchProducts = () => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_START })
  try {
    const res = await axios.get('/products')
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data.products })
  } catch (err) {
    dispatch({ type: FETCH_PRODUCTS_FAIL })
  }
}


export const fetchProductPage = (id, cid, products, redirect) => async dispatch => {
  let data = []
  if(products.length === 0){
    const res = await axios.get('/products')
    data = res.data.products
  }else{
    data = products
  }
  let PP = getProductPage(id, data)
  let PC = getProductPage(cid, PP.colors)

  if(!PP || !PC){
    redirect()
  }else{
    dispatch({ type: 'FETCH_PP', payload: { PP, PC } })
  }
}