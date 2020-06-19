
import { combineReducers } from 'redux'
import { editorContainerReducer } from '../components/EditorContainer/store/reducers'
import { editorSliderReducer } from '../components/EditorSlider/store/reducers'
import { backgroundSetReducer } from '../components/BackgroundSet/store/reducers'

export default combineReducers({
  editorContainerReducer,
  editorSliderReducer,
  backgroundSetReducer
})