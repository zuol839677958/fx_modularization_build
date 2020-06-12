import { CHANGE_PAGE_TEMPLATE_DATA, CHANGE_PAGE_ACTIVE_TEMP_ID } from './actionTypes'
import { IPageModel, ITemplateModel } from '../../../store/data'
import { Action } from 'redux'

interface IEditorContainerReducerAction extends Action {
  allTempData: ITemplateModel[]
  activeTempId: string
}

const editorContainerReducer = (state: IPageModel, action: IEditorContainerReducerAction) => {
  switch (action.type) {
    case CHANGE_PAGE_TEMPLATE_DATA:
      return {
        ...state,
        allTempData: action.allTempData
      }
    case CHANGE_PAGE_ACTIVE_TEMP_ID:
      return {
        ...state,
        activeTempId: action.activeTempId
      }
    default:
      return state || {}
  }
}

export {
  editorContainerReducer
}