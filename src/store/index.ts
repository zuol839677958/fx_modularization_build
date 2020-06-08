
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import initialState from './state'
import thunk from 'redux-thunk'
const enhancer = applyMiddleware(thunk)

export default createStore(reducers, initialState, enhancer)