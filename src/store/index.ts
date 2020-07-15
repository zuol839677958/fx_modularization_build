
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import initialState from './state'
import thunk from 'redux-thunk'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//@ts-ignore
const store = createStore(reducers, initialState, composeEnhancers(
  applyMiddleware(thunk)
))

export default store