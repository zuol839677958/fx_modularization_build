export enum EnvTpye {
  Test, // 测试环境
  Pre, // 预发布
  Product // 正式环境
}

export enum RequestUrl {
  'https://testmswebapi.tostar.top',
}

export enum SpecialLinkUrl {
  '',
}

export const env = EnvTpye.Test

const getEnvRequestUrl = () => {
  return RequestUrl[env]
}

const getSepecialLinkUrl = () => {
  return SpecialLinkUrl[env]
}

export {
  getEnvRequestUrl,
  getSepecialLinkUrl
}