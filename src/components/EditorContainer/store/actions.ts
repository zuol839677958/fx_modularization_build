import { CHANGE_PAGE_TEMPLATE_DATA, CHANGE_PAGE_ACTIVE_TEMP_ID } from './actionTypes'
import { ITemplateModel } from '../../../store/data'

const changeTempData = (allTempData: ITemplateModel[]) => {
  return {
    type: CHANGE_PAGE_TEMPLATE_DATA,
    allTempData
  }
}

const changeActiveTempId = (activeTempId: string) => {
  return {
    type: CHANGE_PAGE_ACTIVE_TEMP_ID,
    activeTempId
  }
}

export { changeTempData, changeActiveTempId }