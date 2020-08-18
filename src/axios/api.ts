import { http } from './index'
import { PageResponse, TemplateResponseModel, TemplateSpecialModel, UpdateSpecialContentOptions } from './data'

const getTemplateList = async () => {
  const res = await http.get('/api/SpecialTemp/GetPaged')
  return res?.bodyMessage as PageResponse<TemplateResponseModel>
}

const getTemplateDetail = async (tempId: number) => {
  const res = await http.get(`/api/SpecialTemp/GetDetail?tempId=${tempId}`)
  return res?.bodyMessage as TemplateResponseModel
}

const uploadImage = async (Base64: string, WatermarkType: number = 0) => {
  const res = await http.post('/api/Upload/UploadImage', { Base64, WatermarkType, SiteType: 2 })
  return res?.bodyMessage as string
}

const getSpeicalData = async (specialId: string) => {
  const res = await http.get(`/api/SpecialNewApi?specialId=${specialId}`, { unErrorMsg: true })
  return res?.bodyMessage as TemplateSpecialModel
}

const updateTemplateData = (tempData: TemplateResponseModel) => {
  return http.post('/api/SpecialTemp/SaveTemp', tempData)
}

const updateSpecialContent = (tempData: UpdateSpecialContentOptions) => {
  return http.post('/api/SpecialApi/EditContent', tempData)
}

export {
  getTemplateList,
  getTemplateDetail,
  uploadImage,
  getSpeicalData,
  updateTemplateData,
  updateSpecialContent
}