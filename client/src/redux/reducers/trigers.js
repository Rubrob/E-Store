import {
  TOGGLE_FILTER,
  TOGGLE_MENU
} from '../actions/types';

const initialState = {
  state: false,
  filter: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case TOGGLE_MENU:
      return { ...state, state: !state.state  }
    case TOGGLE_FILTER:
      return { ...state, filter: !state.filter }
    default:
      return { ...state }
  }
}
