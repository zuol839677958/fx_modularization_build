import { IS_INIT_SLIDE } from './actionTypes'

const changeEditorSlideShow = (isShow: boolean) => {
  return {
    type: IS_INIT_SLIDE,
    isShow
  }
}

export { changeEditorSlideShow }