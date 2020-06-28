import { IPageModel } from "./data"
// import { editorContainerState } from '../components/EditorContainer/store/state'
import { editorSliderState } from '../components/EditorSlider/store/state'
import { backgroundSetState, BackgroundSetType } from '../components/BackgroundSet/store/state'
import { addTemplateSliderState } from '../components/AddTemplate/store/state'

const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  background: {
    bgType: BackgroundSetType.PureColor,
    bgColor: '#9f3b3c'
  },
  allTempData: []
}

const editorSliderReducer = editorSliderState
const backgroundSetReducer = backgroundSetState
const addTemplateSliderReducer = addTemplateSliderState

export default {
  editorContainerReducer,
  editorSliderReducer,
  backgroundSetReducer,
  addTemplateSliderReducer
}