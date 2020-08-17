import { combineReducers } from 'redux'
import { editorContainerReducer } from './editor.reducer'
import { editorContainerMobileReducer } from './editor.mobile.reducer'
import { editorSliderReducer } from './editorSlider.reducer'
import { backgroundSetReducer } from './backgroundSet.reducer'
import { addTemplateSliderReducer } from './addTemplate.reducer'
export default combineReducers({
  editorContainerReducer,
  editorContainerMobileReducer,
  editorSliderReducer,
  backgroundSetReducer,
  addTemplateSliderReducer,
})
