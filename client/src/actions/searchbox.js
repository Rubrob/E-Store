import {
  SET_SUGGESTIONS,
  EMPTY_SUGGESTIONS
} from './types'

export const setSuggestions = (value, items) => dispatch => {
  const regexp = new RegExp(`${value}`, 'im')
  const filtered = items.sort().filter(item => regexp.test(item.title))

  dispatch({ type: SET_SUGGESTIONS, payload: filtered })
}

export const emptySuggestions = () => ({ type: EMPTY_SUGGESTIONS })