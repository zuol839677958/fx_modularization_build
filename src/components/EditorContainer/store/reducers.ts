import { CHANGE_PAGE_TEMPLATE_DATA, CHANGE_PAGE_ACTIVE_TEMP_ID, CHANGE_PAGE_BACKGROUND, SAVE_PAGE_HTML, CHANGE_PAGE_DATA } from './actionTypes'
import { IPageModel, ITemplateModel, IBackgroundSetModel } from '../../../store/data'
import { Action } from 'redux'

interface IEditorContainerReducerAction extends Action {
  allTempData: ITemplateModel<any>[]
  activeTempId: string
  background: IBackgroundSetModel
  pageHtml: string
  pageData: IPageModel
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
      const newState = {
        ...state,
        pageHtml: action.pageHtml
      }
      window.localStorage.setItem('pageEditorData', JSON.stringify(newState))
      return newState
    case CHANGE_PAGE_DATA:
      return Object.assign({}, state, action.pageData)
    default:
      return state || {}
  }
}

export {
  editorContainerReducer
}