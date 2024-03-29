import { EditorMobileActionTypes } from '@/store/constants'
import { IPageModel, ITemplateModel, IBackgroundSetModel } from '@/store/data'
import { Action } from 'redux'
const {
  CHANGE_MOBILE_PAGE_TEMPLATE_DATA,
  CHANGE_MOBILE_PAGE_ACTIVE_TEMP_ID,
  CHANGE_MOBILE_PAGE_BACKGROUND,
  SAVE_MOBILE_PAGE_HTML,
  CHANGE_MOBILE_PAGE_DATA,
} = EditorMobileActionTypes
interface IEditorContainerMobileReducerAction extends Action {
  allTempData: ITemplateModel<any>[]
  activeTempId: string
  background: IBackgroundSetModel
  pageHtml: string
  pageData: IPageModel
  callBack?: (newState: IPageModel) => Promise<void>
}

export const editorContainerMobileReducer = (
  state: IPageModel,
  action: IEditorContainerMobileReducerAction
) => {
  switch (action.type) {
    case CHANGE_MOBILE_PAGE_TEMPLATE_DATA:
      return {
        ...state,
        allTempData: [...action.allTempData],
      }
    case CHANGE_MOBILE_PAGE_ACTIVE_TEMP_ID:
      return {
        ...state,
        activeTempId: action.activeTempId,
      }
    case CHANGE_MOBILE_PAGE_BACKGROUND:
      return {
        ...state,
        background: action.background,
      }
    case SAVE_MOBILE_PAGE_HTML:
      const newState = {
        ...state,
        pageHtml: action.pageHtml,
      }
      window.localStorage.setItem(
        'pageMobileEditorData',
        JSON.stringify(newState)
      )
      action.callBack && action.callBack(newState)
      return newState
    case CHANGE_MOBILE_PAGE_DATA:
      return {
        ...state,
        ...action.pageData,
      }
    default:
      return state || {}
  }
}
