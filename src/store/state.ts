import { IPageModel } from "./data"
import { editorContainerState } from '../components/EditorContainer/store/state'
import { editorSliderState } from '../components/EditorSlide/store/state'
import { backgroundSetState, BackgroundSetType } from '../components/BackgroundSet/store/state'

const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  background: {
    bgType: BackgroundSetType.PureColor,
    bgColor: '#9f3b3c'
  },
  allTempData: editorContainerState
}

const editorSliderReducer = editorSliderState
const backgroundSetReducer = backgroundSetState

export default {
  editorContainerReducer,
  editorSliderReducer,
  backgroundSetReducer
}