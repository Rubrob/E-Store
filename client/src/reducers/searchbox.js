import {
  SET_SUGGESTIONS,
  EMPTY_SUGGESTIONS
} from '../actions/searchbox'

const initialState = {
  suggestions: [],
}

export default (state = initialState, { type, payload }) => {
  switch(type){
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: payload
      }
    case EMPTY_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      }
    default:
      return state
  }
}