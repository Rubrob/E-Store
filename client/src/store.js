import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk)) // disable logger for deploy

export default store