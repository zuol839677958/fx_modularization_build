import { axios } from './index'
import { PageResponse, TemplateResponseModel } from './data'

const getTemplateList = async () => {
  return await axios.get('/api/SpecialTemp/GetPaged') as PageResponse<TemplateResponseModel>
}

const getTemplateDetail = async (tempId: number) => {
  return await axios.get(`/api/SpecialTemp/GetDetail?tempId=${tempId}`) as TemplateResponseModel
}

const uploadImage = async (Base64: string) => {
  return await axios.post('/api/Upload/UploadImage', { Base64, SiteType: 2 }) as string
}

export {
  getTemplateList,
  getTemplateDetail,
  uploadImage
}