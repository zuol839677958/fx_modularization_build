import { EditorActionTypes } from '@/store/constants'
import { ITemplateModel, IBackgroundSetModel, IPageModel } from '@/store/data'
const { CHANGE_PAGE_TEMPLATE_DATA, CHANGE_PAGE_ACTIVE_TEMP_ID, CHANGE_PAGE_BACKGROUND, SAVE_PAGE_HTML, CHANGE_PAGE_DATA } = EditorActionTypes

export const changeTempData = (allTempData: ITemplateModel<any>[]) => {
  return {
    type: CHANGE_PAGE_TEMPLATE_DATA,
    allTempData
  }
}

export const changeActiveTempId = (activeTempId: string) => {
  return {
    type: CHANGE_PAGE_ACTIVE_TEMP_ID,
    activeTempId
  }
}

export const changePageBackground = (background: IBackgroundSetModel) => {
  return {
    type: CHANGE_PAGE_BACKGROUND,
    background
  }
}

export const changePageData = (pageData: IPageModel) => {
  return {
    type: CHANGE_PAGE_DATA,
    pageData
  }
}

export const savePageHtml = () => {
  const pageHtml = document.getElementById('generalPage')?.outerHTML || ''
  console.log('pageHtml:', pageHtml)
  return {
    type: SAVE_PAGE_HTML,
    pageHtml
  }
}