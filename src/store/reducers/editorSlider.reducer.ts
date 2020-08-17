import { EditorSliderActionTypes } from '@/store/constants'
import { IEditorSliderModel } from '@/store/data'
import { Action } from 'redux'
const { IS_INIT_SLIDER, CHANGE_SLIDER_TAB } = EditorSliderActionTypes
interface IEditorSliderReducerAction extends Action {
  isShow: boolean
  tabTypeIndex: number
}

export const editorSliderReducer = (
  state: IEditorSliderModel,
  action: IEditorSliderReducerAction
) => {
  switch (action.type) {
    case IS_INIT_SLIDER:
      return {
        ...state,
        isShow: action.isShow,
      }
    case CHANGE_SLIDER_TAB:
      return {
        ...state,
        tabTypeIndex: action.tabTypeIndex,
      }
    default:
      return state || {}
  }
}
