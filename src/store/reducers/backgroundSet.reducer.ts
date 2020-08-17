import { BackgroundSetActionTypes } from '@/store/constants'
import { IBackgroundSetModel } from '@/store/data'
import { Action } from 'redux'
const { CHANGE_BACKGROUND_SET_DATA } = BackgroundSetActionTypes
interface IBackgroundSetReducerAction extends Action {
  backgroundSet: IBackgroundSetModel
}

export const backgroundSetReducer = (
  state: IBackgroundSetModel,
  action: IBackgroundSetReducerAction
) => {
  const { backgroundSet } = action
  switch (action.type) {
    case CHANGE_BACKGROUND_SET_DATA:
      return Object.assign({}, state, backgroundSet)
    default:
      return state || {}
  }
}
