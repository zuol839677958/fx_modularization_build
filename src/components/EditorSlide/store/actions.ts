import { IS_INIT_SLIDE } from './actionTypes'

const changeSlideShow = (isShow: boolean) => {
  return {
    type: IS_INIT_SLIDE,
    isShow
  }
}

export { changeSlideShow }