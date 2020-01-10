import axios from 'axios';
import {LS} from 'utils';
import {
  FETCH_MEMBER_START,
  FETCH_MEMBER_SUCCESS,
  FETCH_MEMBER_FAIL,
  AUTH_SIGN_UP,
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  AUTH_ERROR,
  SET_USER_ADDRESSES
} from './types';


const setLocalStorage = (token) => {
  LS.set('JWT_TOKEN', token)
}


export const setUserAddresses = (data) => async (dispatch, getState) => {
  await axios.put('/users/user', data, {
    headers: {
      'Authorization': getState().auth.token
    }
  })
    .then(res => dispatch({ type: SET_USER_ADDRESSES, payload: res.data }))
}


export const fetchMember = () => async (dispatch, store) => {
  dispatch({ type: FETCH_MEMBER_START })
  try {
    if(!store().auth.isAuthenticated){
      dispatch({ type: FETCH_MEMBER_FAIL })
    }else{
      const res = await axios.get('/users/user', {
        headers: {
          authorization: store().auth.token
        }
      })
      const order = await axios.get('/users/orders', {         
        headers: {
          authorization: store().auth.token
        }
      })
      dispatch({ type: FETCH_MEMBER_SUCCESS, payload: { ...res.data, ...order.data} })
    }
  } catch (err) {
    dispatch({ type: FETCH_MEMBER_FAIL })
  }
}


export const signUp = (data, callback) => async dispatch => {
  try {
    const res = await axios.post('/users/signup', data)
    dispatch({ type: AUTH_SIGN_UP, payload: res.data.token })
    setLocalStorage(res.data.token)
    callback("Welcome Back", "success")
  } catch (err) {
    dispatch({type: AUTH_ERROR, payload: err.message})
    callback(err.message, "error")
  }
}

export const logIn = (data, callback) => async dispatch => {
  try {
    const res = await axios.post('/users/signin', data);
    dispatch({ type: AUTH_LOG_IN, payload: res.data.token })
    setLocalStorage(res.data.token, res.data.id)
    callback("Welcome Back", "success")
  } catch (err) {
    dispatch({type: AUTH_ERROR, payload: err.message})
    callback(err.message, "error")
  }
}

export const logOut = () => async dispatch => {
  LS.remove('JWT_TOKEN')
  dispatch({type: AUTH_LOG_OUT})
}

export const oauthThirdParty = ({access_token, party}, callback) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/oauth/${party}`, {access_token})
    dispatch({type: AUTH_SIGN_UP, payload: res.data.token})
    setLocalStorage(res.data.token, res.data.id)
    callback("Welcome Back", "success")
  } catch (err) {
    dispatch({type: AUTH_ERROR, payload: err.message})
    callback(err.message, "error")
  }
}
