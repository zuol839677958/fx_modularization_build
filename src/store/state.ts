import { IPageModel } from "./data"
//  import { editorContainerState } from '../components/EditorContainer/store/state'
// import { editorContainerMobileState } from '../components/EditorContainerMobile/store/state'
import { BackgroundSetType } from '../components/commonPlugin/BackgroundSet/store/state'

const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  background: {
    bgType: BackgroundSetType.PureColor,
    bgColor: '#9f3b3c'
  },
  allTempData: []
  //  allTempData: editorContainerState
}

const editorContainerMobileReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  background: {
    bgType: BackgroundSetType.PureColor,
    bgColor: '#9f3b3c'
  },
  allTempData: []
  // allTempData: editorContainerMobileState
}

export default {
  editorContainerReducer,
  editorContainerMobileReducer
}