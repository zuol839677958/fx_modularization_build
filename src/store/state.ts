import { IPageModel } from "./data"
import { editorContainerState } from '../components/EditorContainer/store/state'
import { editorSliderState } from '../components/EditorSlider/store/state'
import { backgroundSetState } from '../components/BackgroundSet/store/state'

const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  allTempData: editorContainerState
}

const editorSliderReducer = editorSliderState
const backgroundSetReducer = backgroundSetState

export default {
  editorContainerReducer,
  editorSliderReducer,
  backgroundSetReducer
}