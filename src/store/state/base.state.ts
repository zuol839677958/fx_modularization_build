import { IPageModel } from '@/store/data'
//  import { editorContainerState } from '../components/EditorContainer/store/state'
// import { editorContainerMobileState } from '../components/EditorContainerMobile/store/state'
import { BackgroundSetType } from './backgroundSet.state'

export const editorContainerReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  background: {
    bgType: BackgroundSetType.PureColor,
    bgColor: '#9f3b3c',
  },
  allTempData: [],
  //  allTempData: editorContainerState
}

export const editorContainerMobileReducer: IPageModel = {
  modeType: 1,
  pageHtml: '',
  activeTempId: '',
  background: {
    bgType: BackgroundSetType.PureColor,
    bgColor: '#9f3b3c',
  },
  allTempData: [],
  // allTempData: editorContainerMobileState
}