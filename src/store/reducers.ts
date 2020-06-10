
import { combineReducers } from 'redux'
import { ADD_COUNT,CLOSE_EDITOR_BOX } from './actionTypes'

const testReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        count: ++state.count
      }
      case CLOSE_EDITOR_BOX:
        return {
          ...state,
          close:state.close?!state.close:state.close
        }
    default:
      return state || {}
    }
  }
 

export default combineReducers({
  testReducer
})