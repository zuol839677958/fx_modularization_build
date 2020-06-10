import { IPageModel } from "./data"
import { editorContainerState } from '../components/EditorContainer/store/state'

const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  allTempData: editorContainerState
}

export default {
  editorContainerReducer
}