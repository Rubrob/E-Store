import {createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers';

export default createStore(
  rootReducer, 
  applyMiddleware(thunk)
)
