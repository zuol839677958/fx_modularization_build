import { CHANGE_BACKGROUND_SET_DATA } from './actionTypes'
import { IBackgroundSetModel } from '../../../../store/data'

const changeBackgroundSetData = (backgroundSet: IBackgroundSetModel) => {
  return {
    type: CHANGE_BACKGROUND_SET_DATA,
    backgroundSet
  }
}

export { changeBackgroundSetData }