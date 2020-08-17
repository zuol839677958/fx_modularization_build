import { EditorMobileActionTypes } from '@/store/constants'
import { ITemplateModel, IBackgroundSetModel, IPageModel } from '@/store/data'
const {CHANGE_MOBILE_PAGE_TEMPLATE_DATA, CHANGE_MOBILE_PAGE_ACTIVE_TEMP_ID, CHANGE_MOBILE_PAGE_BACKGROUND, SAVE_MOBILE_PAGE_HTML, CHANGE_MOBILE_PAGE_DATA} = EditorMobileActionTypes
export const changeMobileTempData = (allTempData: ITemplateModel<any>[]) => {
  return {
    type: CHANGE_MOBILE_PAGE_TEMPLATE_DATA,
    allTempData
  }
}

export const changeMobileActiveTempId = (activeTempId: string) => {
  return {
    type: CHANGE_MOBILE_PAGE_ACTIVE_TEMP_ID,
    activeTempId
  }
}

export const changeMobilePageBackground = (background: IBackgroundSetModel) => {
  return {
    type: CHANGE_MOBILE_PAGE_BACKGROUND,
    background
  }
}

export const changeMobilePageData = (pageData: IPageModel) => {
  return {
    type: CHANGE_MOBILE_PAGE_DATA,
    pageData
  }
}

export const saveMobilePageHtml = () => {
  const pageHtml = document.getElementById('generalMobilePage')?.outerHTML || ''
  return {
    type: SAVE_MOBILE_PAGE_HTML,
    pageHtml
  }
}