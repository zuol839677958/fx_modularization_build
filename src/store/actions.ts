import { ADD_COUNT , CLOSE_EDITOR_BOX } from './actionTypes'

const addCount = () => {
  return {
    type: ADD_COUNT
  }
}
const closeEditorBox =()=>{
  return {
     type: CLOSE_EDITOR_BOX
  }
}

export { addCount ,closeEditorBox }