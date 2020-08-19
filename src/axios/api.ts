import { http } from './index'
import { PageResponse, TemplateResponseModel, TemplateSpecialModel, UpdateSpecialContentOptions } from './data'

/**
 * 获取模板列表
 */
export const getTemplateList = async () => {
  const res = await http.get('/api/SpecialTemp/GetPaged')
  return res?.bodyMessage as PageResponse<TemplateResponseModel>
}

/**
 * 获取模板详情数据
 * @param tempId 模板id
 */
export const getTemplateDetail = async (tempId: number) => {
  const res = await http.get(`/api/SpecialTemp/GetDetail?tempId=${tempId}`)
  return res?.bodyMessage as TemplateResponseModel
}

/**
 * 上传图片
 * @param Base64 base64图片 
 * @param WatermarkType 是否显示水印, 0不显示， 1显示
 */
export const uploadImage = async (Base64: string, WatermarkType: number = 0) => {
  const res = await http.post('/api/Upload/UploadImage', { Base64, WatermarkType, SiteType: 2 })
  return res?.bodyMessage as string
}

/**
 * 获取专题数据
 * @param specialId 专题id 
 */
export const getSpeicalData = async (specialId: string) => {
  const res = await http.get(`/api/SpecialNewApi?specialId=${specialId}`, { unErrorMsg: true })
  return res?.bodyMessage as TemplateSpecialModel
}

/**
 * 更新模板数据
 * @param tempData 模板数据
 */
export const updateTemplateData = (tempData: TemplateResponseModel) => {
  return http.post('/api/SpecialTemp/SaveTemp', tempData)
}

/**
 * 更新专题html内容
 * @param tempData 模板数据
 */
export const updateSpecialContent = (tempData: UpdateSpecialContentOptions) => {
  return http.post('/api/SpecialApi/EditContent', tempData)
}

/**
 * 保存专题预览数据
 * @param tempData 模板数据
 */
export const savePreviewCache = (tempData: UpdateSpecialContentOptions) => {
  return http.post('/api/SpecialApi/SavePreviewCache', tempData)
}