
import { combineReducers } from 'redux'
import { ADD_COUNT } from './actionTypes'

const testReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        count: ++state.count
      }
    default:
      return state || {}
  }
}

export default combineReducers({
  testReducer
})