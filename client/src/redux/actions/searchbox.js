import {
  SET_SUGGESTIONS,
  EMPTY_SUGGESTIONS
} from './types'

export const setSuggestions = (value, items) => dispatch => {
  const regex = new RegExp(`${value}`, 'im')
  const payload = items.sort().filter(item => regex.test(item.title))
  dispatch({type: SET_SUGGESTIONS, payload})
}

export const emptySuggestions = () => ({type: EMPTY_SUGGESTIONS})
