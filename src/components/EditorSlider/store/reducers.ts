import { IS_INIT_SLIDE } from './actionTypes';
import { IEditorSliderModel } from '../../../store/data'
import { Action } from 'redux';

interface IEditorSliderReducerAction extends Action {
  isShow: boolean;
}

const editorSliderReducer = (state: IEditorSliderModel, action: IEditorSliderReducerAction) => {
  switch (action.type) {
    case IS_INIT_SLIDE:
      return {
        ...state,
        isShow: action.isShow
      }
    default:
      return state || {}
  }
}

export {
  editorSliderReducer
}