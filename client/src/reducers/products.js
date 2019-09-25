import { ampersand, capitalize, tlcWithUnderline } from '../utils'

import {
  SORT_BY_PRICE,
  ADD_FILTER,
  REMOVE_FILTER,
  FILTER_PRODUCTS_WITH_URL,
  SEARCH,
  RESET_FILTER,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_FAIL,
  FETCH_CATEGORIES_SUCCESS
} from '../actions/types';

const initialState = {
  currency: '$',
  products: [],
  filter: {
    gender: '',
    category: '',
    type: '',
    size: [],
    color: []
  },
  searched: [],
  filtered: [],
  categories: [],
  searchedStr: '',
  isFetching: false,
  isFetchingError: false,
}

// REDUCER CONTROLLERS

const filter = (products, filter) => {
  if(filter['color'].length >= 1){
    products = products.filter((item) => {
      let isChecked = false
      item.colors.forEach(color => filter['color'].forEach(fColor => (color.color === fColor) ? isChecked = true : null))
      return isChecked ? true : false
    })
  }

  if(filter['size'].length >= 1){
    products = products.filter((item) => {
      let isChecked = false
      item.colors.forEach(color => filter['size'].forEach(FSize => (color.sizes.indexOf(FSize) !== -1) ? isChecked = true : null))
      return isChecked ? true : false
    })
  }

  return products
}

const sortByPrice = (method) => {
  if(method === 'high'){
    return (a, b) => (a.price < b.price) ? 1 : -1
  }
  if(method === 'low'){
    return (a, b) => (a.price > b.price) ? 1 : -1
  }
}

const searchProduct = (products, filters, payload) => {
  if(payload.length > 0){
    const regexp = new RegExp(`${payload}`, 'i') // or new RegExp(`^${payload}`, 'i')

    return filter(
      products.filter(item => regexp.test(item.title)),
      filters
    )
  }else{
    return filter(products, filters)
  }
}

const addFilter = (filter, payload) => {
  if(filter[payload.filter].indexOf(payload.value) === -1){
    return filter[payload.filter].push(payload.value)
  }
  return filter
}

const removeFilter = (filter, payload) => {
  filter[payload.filter] = filter[payload.filter].filter(item => item !== payload.value)
  return filter
}

const filterProductsByURL = (products, categories, payload) => {

  let URLFILTER = {}
  categories.forEach(gender => {
    const { categories, title } = gender
    const genderTitle = title.toLowerCase()
    if(payload[0] === genderTitle){
      URLFILTER['gender'] = payload[0]
      categories.forEach(category => {
        const { subcategories, title } = category
        const categoryTitle = title.toLowerCase()
        if(payload[1] === categoryTitle){
          URLFILTER['category'] = payload[1]
          subcategories.forEach(subcategory => {
            if(payload[2] === tlcWithUnderline(subcategory.title)){
              URLFILTER['subcategory'] = payload[2]
            }
          })
        }
      })
    }
  })

  if(URLFILTER.gender) products = products.filter(item => item.gender === URLFILTER.gender)
  if(URLFILTER.category) products = products.filter(item => item.category === URLFILTER.category)
  if(URLFILTER.subcategory) products = products.filter(item => item.subcategory === URLFILTER.subcategory)

  const searchedStr = `${capitalize(payload[0])}'s ${ampersand(capitalize(payload[2]))} ${payload[1] === 'shoes' || !payload[2] ? capitalize(payload[1]) : ''}`
  return {products, searchedStr}
}

// REDUCER

const productsReducer = (state = initialState, { type, payload }) => {
  switch(type){
    case SORT_BY_PRICE:
      return {
        ...state,
        filtered: filter([...state.searched], {...state.filter}).sort(sortByPrice(payload))
      }
    case ADD_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...addFilter({...state.filter}, payload)
        },
        filtered: filter([...state.searched], {...state.filter})
      }
    case REMOVE_FILTER:
      const removedFilter = removeFilter({...state.filter}, payload)
      return {
        ...state,
        filter: {
          ...state.filter,
          ...removedFilter
        },
        filtered: filter([...state.searched], removedFilter)
      }
    case FILTER_PRODUCTS_WITH_URL:
      const filteredByURL = filterProductsByURL([...state.products], [...state.categories], payload)
      return {
        ...state,
        searched: filteredByURL.products,
        filter: { size: [], color: [] },
        filtered: filteredByURL.products,
        searchedStr: filteredByURL.searchedStr
      }
    case SEARCH:
      const searchedProducts = searchProduct([...state.products], {...state.filter}, payload)

      return {
        ...state,
        searched: searchedProducts,
        filtered: searchedProducts,
        searchedStr: `Result For "${payload}"`
      }
    case RESET_FILTER:
      return {
        ...state,
        filter: { color: [], size: [] },
        filtered: [...state.searched]
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isFetching: false,
        isFetchingError: false
      }
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        isFetching: false,
        isFetchingError: true
      }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload
      }
    default:
      return { ...state }
  }
}
export default productsReducer