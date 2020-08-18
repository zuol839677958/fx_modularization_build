import { BaseActionTypes } from '@/store/constants'

export const addCount = () => {
  return {
    type: BaseActionTypes.ADD_COUNT
  }
}

export const closeEditorBox = () => {
  return {
    type: BaseActionTypes.CLOSE_EDITOR_BOX
  }
}