import axios from 'axios'

import {
  SORT_BY_PRICE,
  ADD_FILTER ,
  REMOVE_FILTER,
  FILTER_PRODUCTS_WITH_URL,
  SEARCH,
  RESET_FILTER,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_CATEGORIES_SUCCESS,
} from './types';

export const GPP = (productID, colorID, products = []) => {
  let productCID = []
  const productPID =  products.filter(product => productID === product.id)[0]
  if(productPID){
    productCID = productPID.colors.filter(color => colorID === color.id)[0]
  }
  return {
    pp: productPID,
    cp: productCID
  }
}

export const sortByPrice = (method) => ({ type: SORT_BY_PRICE, payload: method })
export const addFilter = value => ({ type: ADD_FILTER, payload: value })
export const removeFilter = value => ({ type: REMOVE_FILTER, payload: value })
export const resetFilter = () => ({ type: RESET_FILTER })
export const filterProductsWithURL = value => ({ type: FILTER_PRODUCTS_WITH_URL, payload: value })
export const searchProduct = value => ({ type: SEARCH, payload: value })

export const filterURL = (str, split, count) => {  // splitWithTail
  let parts = str.split(split)
  let tail = parts.slice(count).join(split)
  let result = parts.slice(0, count)
  result.push(tail)
  return result
}

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

export const fetchCategories = () => async dispatch => {
  let res = await axios.get('/categories')
  dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: res.data.categories })
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