import { CHANGE_PAGE_TEMPLATE_DATA, CHANGE_PAGE_ACTIVE_TEMP_ID, CHANGE_PAGE_BACKGROUND, SAVE_PAGE_HTML, CHANGE_PAGE_DATA } from './actionTypes'
import { ITemplateModel, IBackgroundSetModel, IPageModel } from '../../../store/data'

const changeTempData = (allTempData: ITemplateModel<any>[]) => {
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

const changePageBackground = (background: IBackgroundSetModel) => {
  return {
    type: CHANGE_PAGE_BACKGROUND,
    background
  }
}

const changePageData = (pageData: IPageModel) => {
  return {
    type: CHANGE_PAGE_DATA,
    pageData
  }
}

const savePageHtml = () => {
  const pageHtml = document.getElementById('generalPage')?.outerHTML || ''
  return {
    type: SAVE_PAGE_HTML,
    pageHtml
  }
}

export {
  changeTempData,
  changeActiveTempId,
  changePageBackground,
  savePageHtml,
  changePageData
}