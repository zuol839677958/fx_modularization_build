import { EditorSliderActionTypes } from '@/store/constants'
const {IS_INIT_SLIDER, CHANGE_SLIDER_TAB} = EditorSliderActionTypes
export const changeEditorSliderShow = (isShow: boolean) => {
  return {
    type: IS_INIT_SLIDER,
    isShow
  }
}

export const changeEditorSliderTab = (tabTypeIndex: number) => {
  return {
    type: CHANGE_SLIDER_TAB,
    tabTypeIndex
  }
}
