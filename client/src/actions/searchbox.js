export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const EMPTY_SUGGESTIONS = 'EMPTY_SUGGESTIONS'

export const setSuggestions = (value, items) => dispatch => {
  const regexp = new RegExp(`${value}`, 'im')
  const filtered = items.sort().filter(item => regexp.test(item.title))

  dispatch({ type: SET_SUGGESTIONS, payload: filtered })
}

export const emptySuggestions = () => ({ type: EMPTY_SUGGESTIONS })