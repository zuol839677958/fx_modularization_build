import { CHANGE_PAGE_TEMPLATE_DATA } from './actionTypes';
import { IPageModel, ITemplateModel } from '../../../store/data'
import { Action } from 'redux';

interface IEditorContainerReducerAction extends Action {
  tempData: ITemplateModel[];
}

const editorContainerReducer = (state: IPageModel, action: IEditorContainerReducerAction) => {
  switch (action.type) {
    case CHANGE_PAGE_TEMPLATE_DATA:
      return {
        ...state,
        tempData: action.tempData
      }
    default:
      return state || {}
  }
}

export {
  editorContainerReducer
}