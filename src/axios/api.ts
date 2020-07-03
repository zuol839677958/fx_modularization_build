import { axios } from './index'
import { PageResponse, TemplateResponseModel, UpdateSpecialContentOptions } from './data'

const getTemplateList = async () => {
  return await axios.get('/api/SpecialTemp/GetPaged') as PageResponse<TemplateResponseModel>
}

const getTemplateDetail = async (tempId: number) => {
  return await axios.get(`/api/SpecialTemp/GetDetail?tempId=${tempId}`) as TemplateResponseModel
}

const uploadImage = async (Base64: string) => {
  return await axios.post('/api/Upload/UploadImage', { Base64, SiteType: 2 }) as string
}

const getSpeicalData = async (specialId: string) => {
  return await axios.get(`/api/SpecialNewApi?specialId=${specialId}`) as any
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