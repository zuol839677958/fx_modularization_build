import { IPageModel } from "./data"
import { editorContainerState } from '../components/EditorContainer/store/state'
import { editorSlideState } from '../components/EditorSlide/store/state'

const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  allTempData: editorContainerState
}

const editorSlideReducer = editorSlideState

export default {
  editorContainerReducer,
  editorSlideReducer
}