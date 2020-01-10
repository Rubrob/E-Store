import axios from 'axios'
import _ from 'lodash'
import {
  SORT_BY_PRICE,
  CHANGE_FILTER ,
  FILTER_PRODUCTS_WITH_URL,
  SEARCH,
  RESET_FILTER,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  CURRENT_PAGE
} from './types';

export const sortByPrice = (payload) => ({type: SORT_BY_PRICE, payload})
export const changeFilter = (payload) => ({type: CHANGE_FILTER, payload})
export const resetFilter = () => ({type: RESET_FILTER})
export const filterProductsWithURL = (payload) => ({type: FILTER_PRODUCTS_WITH_URL, payload})
export const searchProduct = (payload) => ({type: SEARCH, payload})

export const getCurrentProduct = (ids) => (dispatch, getState) => {
  const page = {
    product: [],
    color: []
  }
  page.product = _.filter(getState().products.products, {_id: ids.productId})[0]
  if(page.product){
    page.color = _.filter(page.product.colors, {_id: ids.colorId})[0]
  }
  dispatch({type: CURRENT_PAGE, payload: page})
}

export const filterURL = (str, split, count) => {  // splitWithTail
  let parts = str.split(split)
  let tail = parts.slice(count).join(split)
  let result = parts.slice(0, count)
  result.push(tail)
  return result
}

export const getFilters = (products) => {
  const filters = {
    sizes: [],
    colors: []
  }
  products.forEach(product => {
    product.colors.forEach(colors => {
      filters.sizes.push(...colors.sizes)
      filters.colors.push(colors.color)
    })
  })
  filters.sizes = _.uniq(filters.sizes)
  filters.colors = _.uniq(filters.colors).sort()
  return filters
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
