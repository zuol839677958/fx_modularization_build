import { CHANGE_PAGE_TEMPLATE_DATA } from './actionTypes'
import { ITemplateModel } from '../../../store/data'

const changeTempData = (tempData: ITemplateModel[]) => {
  return {
    type: CHANGE_PAGE_TEMPLATE_DATA,
    tempData
  }
}

export { changeTempData }