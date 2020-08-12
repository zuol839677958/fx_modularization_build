
import { combineReducers } from 'redux'
import { editorContainerReducer } from '../components/web/EditorContainer/store/reducers'
import { editorContainerMobileReducer } from '../components/mobile/EditorContainerMobile/store/reducers'
import { editorSliderReducer } from '../components/commonComponents/EditorSlider/store/reducers'
import { backgroundSetReducer } from '../components/commonPlugin/BackgroundSet/store/reducers'
import { addTemplateSliderReducer } from '../components/commonComponents/AddTemplate/store/reducers'

export default combineReducers({
  editorContainerReducer,
  editorContainerMobileReducer,
  editorSliderReducer,
  backgroundSetReducer,
  addTemplateSliderReducer
})