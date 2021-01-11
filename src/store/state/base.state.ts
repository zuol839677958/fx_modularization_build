import { IPageModel } from '@/store/data'
// import { editorContainerState } from './editor.state'
// import { editorContainerMobileState } from './editor.mobile.state'
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
  // allTempData: editorContainerState
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