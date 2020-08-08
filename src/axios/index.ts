import HttpService from '@stl/request'
import { getEnvRequestUrl } from './env'
import { message } from 'antd'

export const http = new HttpService(getEnvRequestUrl(), {
  msgUI: message
})
