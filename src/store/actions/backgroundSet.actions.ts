import { BackgroundSetActionTypes } from '@/store/constants'
import { IBackgroundSetModel } from '@/store/data'

export const changeBackgroundSetData = (backgroundSet: IBackgroundSetModel) => {
  return {
    type: BackgroundSetActionTypes.CHANGE_BACKGROUND_SET_DATA,
    backgroundSet
  }
}
