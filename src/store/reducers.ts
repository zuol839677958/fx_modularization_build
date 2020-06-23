
import { combineReducers } from 'redux'
import { editorContainerReducer } from '../components/EditorContainer/store/reducers'
import { editorSliderReducer } from '../components/EditorSlider/store/reducers'
import { backgroundSetReducer } from '../components/BackgroundSet/store/reducers'
import { addTemplateSliderReducer } from '../components/AddTemplate/store/reducers'

export default combineReducers({
  editorContainerReducer,
  editorSliderReducer,
  backgroundSetReducer,
  addTemplateSliderReducer
})