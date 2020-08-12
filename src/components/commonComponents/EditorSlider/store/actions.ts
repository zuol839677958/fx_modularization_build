import { IS_INIT_SLIDER, CHANGE_SLIDER_TAB } from './actionTypes'

const changeEditorSliderShow = (isShow: boolean) => {
  return {
    type: IS_INIT_SLIDER,
    isShow
  }
}

const changeEditorSliderTab = (tabTypeIndex: number) => {
  return {
    type: CHANGE_SLIDER_TAB,
    tabTypeIndex
  }
}

export { changeEditorSliderShow, changeEditorSliderTab }