import { IS_SHOW_ADD_TEMPLATE_SLIDER } from './actionTypes';
import { IEditorSliderModel } from '../../../store/data'
import { Action } from 'redux';

interface IAddTemplateSliderReducerAction extends Action {
  isShow: boolean;
}

const addTemplateSliderReducer = (state: IEditorSliderModel, action: IAddTemplateSliderReducerAction) => {
  switch (action.type) {
    case IS_SHOW_ADD_TEMPLATE_SLIDER:
      return {
        ...state,
        isShow: action.isShow
      }
    default:
      return state || {}
  }
}

export {
  addTemplateSliderReducer
}