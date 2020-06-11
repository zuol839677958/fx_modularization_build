import { IS_INIT_SLIDE } from './actionTypes';
import { IEditorSlideModel } from '../../../store/data'
import { Action } from 'redux';

interface IEditorSlideReducerAction extends Action {
  isShow: boolean;
}

const editorSlideReducer = (state: IEditorSlideModel, action: IEditorSlideReducerAction) => {
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
  editorSlideReducer
}