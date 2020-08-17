import { AddTemplateActionTypes } from '@/store/constants'
import { IEditorSliderModel } from '@/store/data'
import { Action } from 'redux'
const { IS_SHOW_ADD_TEMPLATE_SLIDER } = AddTemplateActionTypes

interface IAddTemplateSliderReducerAction extends Action {
  isShow: boolean
}

export const addTemplateSliderReducer = (
  state: IEditorSliderModel,
  action: IAddTemplateSliderReducerAction
) => {
  const { isShow } = action
  switch (action.type) {
    case IS_SHOW_ADD_TEMPLATE_SLIDER:
      return {
        ...state,
        isShow,
      }
    default:
      return state || {}
  }
}
