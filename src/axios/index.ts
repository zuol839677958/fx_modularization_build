import axios, { AxiosResponse } from 'axios'
import { getEnvRequestUrl } from './env'
import { message } from 'antd'

type IResponseOptions = {
  code: string
  subCode: string
  requestLine: number
  message: string
  bodyMessage: string
}

export const baseRequestUrl = getEnvRequestUrl()
axios.defaults.baseURL = baseRequestUrl

// 请求时的拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use((response: AxiosResponse<IResponseOptions>) => {
  // 对响应数据做些事
  if (response.data.code === '0') {
    try {
      return JSON.parse(response.data.bodyMessage)
    } catch {
      return response.data.bodyMessage
    }
  } else {
    message.error(response.data.message)
    return {}
  }
}, error => {
  // 这里我们把错误信息扶正, 后面就不需要写catch了
  return Promise.resolve(error.response)
})

export { axios }