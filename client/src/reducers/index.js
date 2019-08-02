import { combineReducers } from 'redux';
import cart from './cart'
import products from './products'
import trigers from './trigers'
import auth from './auth'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  cart,
  products,
  trigers,
  auth,
  form: formReducer
})

export default rootReducer
