import { ampersand, capitalize } from '../utils'

import {
  SORT_LOW_TO_HIGH,
  SORT_HIGH_TO_LOW,
  ADD_FILTER,
  REMOVE_FILTER,
  FILTER_PRODUCTS_WITH_URL,
  SEARCH,
  RESET_FILTER,
  FETCH_PRODUCTS_SUCCESS
} from './actions/products';

const initialState = {
  products: [],
  currency: '$',
  filter: {
    gender: '',
    category: '',
    type: '',
    size: [],
    color: []
  },
  searched: [],
  filtered: [],
  productPage: {},
  categories: [{
    id: 1,
    title: "Men",
    categories: [{
      id: 1,
      title: "Shoes",
      subcategories: ["lifestyle", "running", "workout"]
    }, {
      id: 2,
      title: "Clothes",
      subcategories: ["tops__t-shirts", "shorts", "pants", "hoodies__sweatshirts"]
    }, {
      id: 3,
      title: "Accessories",
      subcategories: ["bags__backpacks","hats__beanies","sunglasses"]
    }]
  }, {
    id: 2,
    title: "Women",
    categories: [{
      id: 1,
      title: "Shoes",
      subcategories: ["lifestyle", "running", "workout"]
    }, {
      id: 2,
      title: "Clothes",
      subcategories: ["tops__t-shirts", "shorts", "pants", "skirts__dresses", "hoodies__sweatshirts"]
    }, {
      id: 3,
      title: "Accessories",
      subcategories: ["bags__backpacks","hats__beanies","sunglasses"]
    }]
  }],
  searchedStr: '',
  filterOpen: false
}

const productCardReducer = (state = initialState, { type, payload }) => {

  const filter = (products, filter) => {
    if(filter['color'].length >= 1){
      products = products.filter((item) => {
        let checker = false
        item.colors.forEach(color => filter['color'].forEach(fColor => (color.color === fColor) ? checker = true : null))
        return checker ? true : false
      })
    }

    if(filter['size'].length >= 1){
      products = products.filter((item) => {
        let checker = false
        item.colors.forEach(color => filter['size'].forEach(FSize => (color.sizes.indexOf(FSize) !== -1) ? checker = true : null))
        return checker ? true : false
      })
    }

    return products
  }

  switch(type){
    case SORT_LOW_TO_HIGH:
      const LTH = (a, b) => (a.price > b.price) ? 1 : -1
      let PLTH = filter([...state.searched], {...state.filter}).sort(LTH)

      return { ...state, filtered: PLTH }
    case SORT_HIGH_TO_LOW:
      const HTL = (a, b) => (a.price < b.price) ? 1 : -1
      let PHTL = filter([...state.searched], {...state.filter}).sort(HTL)

      return { ...state, filtered: PHTL }
    case ADD_FILTER:
      const addFilter = {...state.filter}
      addFilter[payload.filter].push(payload.value)
      let FPA = filter([...state.searched], {...state.filter})

      return {
        ...state,
        filter: { ...state.filter, ...addFilter },
        filtered: FPA
      }
    case REMOVE_FILTER:
      const removeFilter = {...state.filter}
      removeFilter[payload.filter] = removeFilter[payload.filter].filter(item => (item !== payload.value) ? true : false)
      let FPR = filter([...state.searched], removeFilter)

      return {
        ...state,
        filter: { ...state.filter, ...removeFilter },
        filtered: FPR
      }
    case FILTER_PRODUCTS_WITH_URL:
      let URLFILTER = {}
      let URLProducts = [...state.products]
      let categories = [...state.categories]
      categories.forEach(item => {
        if(payload[0] === item.title.toLowerCase()){
          URLFILTER['gender'] = payload[0]
          item.categories.forEach(category => {
            if(payload[1] === category.title.toLowerCase()){
              URLFILTER['category'] = payload[1]
              category.subcategories.forEach(subcategory => payload[2] === subcategory ? URLFILTER['subcategory'] = payload[2] : null)
            }
          })
        }
      })

      if(URLFILTER.gender){
        URLProducts = URLProducts.filter(item => item.gender === URLFILTER.gender)
      }

      if(URLFILTER.category){
        URLProducts = URLProducts.filter(item => item.category === URLFILTER.category)
      }

      if(URLFILTER.subcategory){
        URLProducts = URLProducts.filter(item => item.subcategory === URLFILTER.subcategory)
      }

      const searchedStr = `${capitalize(payload[0])}'s ${ampersand(capitalize(payload[2]))} ${payload[1] === 'shoes' || !payload[2] ? capitalize(payload[1]) : ''}`

      return {
        ...state,
        searched: URLProducts,
        filter: { size: [], color: [] },
        filtered: URLProducts,
        searchedStr: searchedStr
      }
    case SEARCH:
      let searchedProducts = [...state.products]
      let filteredSearchedProducts

      if(payload.length > 0){
        const regexp = new RegExp(`^${payload}`, 'i')
        searchedProducts = searchedProducts.filter(item => regexp.test(item.title))
        filteredSearchedProducts = filter(searchedProducts, {...state.filter})
      }else{
        filteredSearchedProducts = filter([...state.products], {...state.filter})
      }

      return {
        ...state,
        searched: searchedProducts,
        filtered: filteredSearchedProducts,
        searchedStr: `Result for "${payload}"`
      }
    case RESET_FILTER:
      return { ...state, filter: { color: [], size: [] }, filtered: [...state.searched] }
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: payload }
    default:
      return { ...state }
  }
}
export default productCardReducer