export enum EnvTpye {
  Test = 1, // 测试环境
  Pre, // 预发布
  Product // 正式环境
}

const env: EnvTpye = 1

const getEnvRequestUrl = () => {
  switch (env) {
    case EnvTpye.Test:
      return 'https://testmswebapi.tostar.top'
    case EnvTpye.Pre:
      return 'https://premswebapi.tostar.top'
    case EnvTpye.Product:
      return 'https://gamswebapi.wbp5.com'
  }
}

const getSepecialLinkUrl = () => {
  switch (env) {
    case EnvTpye.Test:
      return ''
    case EnvTpye.Pre:
      return ''
    case EnvTpye.Product:
      return ''
  }
}

export {
  getEnvRequestUrl,
  getSepecialLinkUrl
}