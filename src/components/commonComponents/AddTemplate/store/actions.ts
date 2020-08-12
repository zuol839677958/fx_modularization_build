import { IS_SHOW_ADD_TEMPLATE_SLIDER } from './actionTypes'

const changeAddTemplateSliderShow = (isShow: boolean) => {
  return {
    type: IS_SHOW_ADD_TEMPLATE_SLIDER,
    isShow
  }
}

export { changeAddTemplateSliderShow }