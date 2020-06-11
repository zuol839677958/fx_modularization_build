
import { combineReducers } from 'redux'
import { editorContainerReducer } from '../components/EditorContainer/store/reducers'
import { editorSlideReducer } from '../components/EditorSlide/store/reducers'

export default combineReducers({
  editorContainerReducer,
  editorSlideReducer
})