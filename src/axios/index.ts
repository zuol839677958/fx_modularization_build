import axios from 'axios'
import { getEnvRequestUrl, EnvTpye } from './env'

axios.defaults.baseURL = getEnvRequestUrl(EnvTpye.Local)

// 请求时的拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  return response
}, error => {
  // 这里我们把错误信息扶正, 后面就不需要写catch了
  return Promise.resolve(error.response)
})

export { axios }