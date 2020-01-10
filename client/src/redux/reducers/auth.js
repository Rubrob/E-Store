import {
  AUTH_SIGN_UP,
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  AUTH_ERROR,
  FETCH_MEMBER_SUCCESS,
  SET_USER_ADDRESSES
} from '../actions/types';
import {LS} from 'utils';

const jwtToken = LS.get('JWT_TOKEN')

const initailState = {
  isAuthenticated: jwtToken ? true : false,
  token: jwtToken,
  error: false,
  fullname: '',
  addresses: {
    shipping: {
      firstname: '',
      lastname: '',
      address: '',
      country: '',
      city: '',
      zip: '',
      email: '',
      phone: ''
    },
    billing: {
      firstname: '',
      lastname: '',
      address: '',
      country: '',
      city: '',
      zip: ''
    }
  },
  orders: []
}

const auth = (state = initailState, {type, payload}) => {
  switch(type){
    case FETCH_MEMBER_SUCCESS:
      return {
        ...state,
        fullname: payload.fullname,
        addresses: payload.addresses,
        orders: payload.orders
      }
    case SET_USER_ADDRESSES:
      return {
        ...state,
        ...payload,
        addresses: payload.addresses
      }
    case AUTH_SIGN_UP:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        error: false
      }
    case AUTH_LOG_IN:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        error: false
      }
    case AUTH_LOG_OUT:
      return {
        ...state,
        addresses: {
          shipping: {},
          billing: {}
        },
        fullname: '',
        isAuthenticated: false,
        error: false,
        token: null
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        token: ''
      }
    default:
      return { ...state }
  }
}

export default auth