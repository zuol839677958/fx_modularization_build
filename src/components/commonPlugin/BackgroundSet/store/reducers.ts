import { CHANGE_BACKGROUND_SET_DATA } from './actionTypes';
import { IBackgroundSetModel } from '../../../../store/data'
import { Action } from 'redux';

interface IBackgroundSetReducerAction extends Action {
  backgroundSet: IBackgroundSetModel
}

const backgroundSetReducer = (state: IBackgroundSetModel, action: IBackgroundSetReducerAction) => {
  switch (action.type) {
    case CHANGE_BACKGROUND_SET_DATA:
      return Object.assign({}, state, action.backgroundSet)
    default:
      return state || {}
  }
}

export {
  backgroundSetReducer
}