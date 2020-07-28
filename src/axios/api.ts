import { axios } from './index'
import { PageResponse, TemplateResponseModel, TemplateSpecialModel, UpdateSpecialContentOptions } from './data'

const getTemplateList = async () => {
  return await axios.get('/api/SpecialTemp/GetPaged') as PageResponse<TemplateResponseModel>
}

const getTemplateDetail = async (tempId: number) => {
  return await axios.get(`/api/SpecialTemp/GetDetail?tempId=${tempId}`) as TemplateResponseModel
}

const uploadImage = async (Base64: string, WatermarkType: number = 0) => {
  return await axios.post('/api/Upload/UploadImage', { Base64, WatermarkType, SiteType: 2 }) as string
}

const getSpeicalData = async (specialId: string) => {
  return await axios.get(`/api/SpecialNewApi?specialId=${specialId}`) as TemplateSpecialModel
}

const updateTemplateData = async (tempData: TemplateResponseModel) => {
  return await axios.post('/api/SpecialTemp/SaveTemp', tempData)
}

const updateSpecialContent = async (tempData: UpdateSpecialContentOptions) => {
  return await axios.post('/api/SpecialApi/EditContent', tempData)
}

export {
  getTemplateList,
  getTemplateDetail,
  uploadImage,
  getSpeicalData,
  updateTemplateData,
  updateSpecialContent
}