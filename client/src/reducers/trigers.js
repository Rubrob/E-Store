import { OPEN_MENU, CLOSE_MENU, TOGGLE_FILTER } from './actions/trigers';

const initialState = {
  state: false,
  filter: false
}

const productCardReducer = (state = initialState, action) => {
  switch(action.type){
    case OPEN_MENU:
      return { ...state, state: true}
    case CLOSE_MENU:
      return { ...state, state: false}
    case TOGGLE_FILTER:
      return { ...state, filter: !state.filter }
    default:
      return { ...state }
  }
}
export default productCardReducer