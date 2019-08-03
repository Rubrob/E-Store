import axios from 'axios'

export const FETCH_MEMBER_START = 'FETCH_MEMBER_START'
export const FETCH_MEMBER_SUCCESS = 'FETCH_MEMBER_SUCCESS'
export const FETCH_MEMBER_FAIL = 'FETCH_MEMBER_FAIL'

export const SET_SHIPPING = 'SET_SHIPPING'
export const SET_BILLING = 'SET_BILLING'

export const AUTH_SIGN_UP = 'AUTH_SIGN_UP'
export const AUTH_LOG_IN = 'LOG_IN'
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT'
export const AUTH_ERROR = 'AUTH_ERROR'

const setLocalStorage = async (token, user_id) => {
  await localStorage.setItem('JWT_TOKEN', token)
  await localStorage.setItem('USER_ID', user_id)
}

export const setShippingAddress = (data) => async dispatch => {
  const user_id = await localStorage.getItem('USER_ID')
  await axios.put('/users/user', { data, user_id, type: 'shipping' })
  dispatch({ type: SET_SHIPPING, payload: data })
}

export const setBillingAddress = (data) => async dispatch => {
  const user_id = await localStorage.getItem('USER_ID')
  await axios.put('/users/user', { data, user_id, type: 'billing' })
  dispatch({ type: SET_BILLING, payload: data })
}

export const fetchMember = () => async dispatch => {
  dispatch({ type: FETCH_MEMBER_START })
  try {
    const user_id = await localStorage.getItem('USER_ID')
    if(user_id === null){
      dispatch({ type: FETCH_MEMBER_FAIL })
    }else{
      const res = await axios.post('/users/user', { user_id })
      const order = await axios.post('/users_order', { user_id })
      dispatch({ type: FETCH_MEMBER_SUCCESS, payload: {...res.data, ...order.data} })
    }
  } catch (err) {
    dispatch({ type: FETCH_MEMBER_FAIL })
  }
}


export const signUp = (data) => async dispatch => {
  try {
    const res = await axios.post('/users/signup', data)
    dispatch({ type: AUTH_SIGN_UP, payload: res.data.token })
    await setLocalStorage(res.data.token, res.data.id)
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

export const logIn = (data) => async dispatch => {
  try {
    const res = await axios.post('/users/signin', data);
    dispatch({ type: AUTH_LOG_IN, payload: res.data.token })
    await setLocalStorage(res.data.token, res.data.id)
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

export const logOut = () => async dispatch => {
  localStorage.removeItem('JWT_TOKEN')
  localStorage.removeItem('USER_ID')
  dispatch({ type: AUTH_LOG_OUT })
}

export const oauthGoogle = (data) => async dispatch => {
  const res = await axios.post('/users/oauth/google', { access_token: data })
  dispatch({ type: AUTH_SIGN_UP, payload: res.data.token })
  await setLocalStorage(res.data.token, res.data.id)
}

export const oauthFacebook = (data) => async dispatch => {
  const res = await axios.post('/users/oauth/facebook', { access_token: data })
  dispatch({ type: AUTH_SIGN_UP, payload: res.data.token })
  await setLocalStorage(res.data.token, res.data.id)
}