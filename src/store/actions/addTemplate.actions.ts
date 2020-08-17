import { AddTemplateActionTypes } from '@/store/constants'

export const changeAddTemplateSliderShow = (isShow: boolean) => {
  return {
    type: AddTemplateActionTypes.IS_SHOW_ADD_TEMPLATE_SLIDER,
    isShow
  }
}