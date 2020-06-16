import { CHANGE_PAGE_TEMPLATE_DATA, CHANGE_PAGE_ACTIVE_TEMP_ID, CHANGE_PAGE_BACKGROUND, SAVE_PAGE_HTML } from './actionTypes'
import { IPageModel, ITemplateModel, IBackgroundSetModel } from '../../../store/data'
import { Action } from 'redux'
import { savePageHtml } from './actions'

interface IEditorContainerReducerAction extends Action {
  allTempData: ITemplateModel[]
  activeTempId: string
  background: IBackgroundSetModel
  pageHtml: string
}

const editorContainerReducer = (state: IPageModel, action: IEditorContainerReducerAction) => {
  switch (action.type) {
    case CHANGE_PAGE_TEMPLATE_DATA:
      return {
        ...state,
        allTempData: [...action.allTempData]
      }
    case CHANGE_PAGE_ACTIVE_TEMP_ID:
      return {
        ...state,
        activeTempId: action.activeTempId
      }
    case CHANGE_PAGE_BACKGROUND:
      return {
        ...state,
        background: action.background
      }
    case SAVE_PAGE_HTML:
      return {
        ...state,
        pageHtml: action.pageHtml
      }
    default:
      return state || {}
  }
}

export {
  editorContainerReducer
}