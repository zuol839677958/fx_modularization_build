import { axios } from './index'
import { PageResponse, TemplateResponseModel } from './data'

const getTemplateList = async () => {
  return await axios.get('/api/SpecialTemp/GetPaged') as PageResponse<TemplateResponseModel>
}

const getTemplateDetail = async (tempId: number) => {
  return await axios.get(`/api/SpecialTemp/GetDetail?tempId=${tempId}`) as TemplateResponseModel
}

export {
  getTemplateList,
  getTemplateDetail
}