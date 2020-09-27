
import { createStore, applyMiddleware, compose, PreloadedState } from 'redux'
import reducers from './reducers'
import initialState from './state'
import thunk from 'redux-thunk'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, initialState as PreloadedState<any>, composeEnhancers(
  applyMiddleware(thunk)
))

export default store