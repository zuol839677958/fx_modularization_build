export enum EnvTpye {
  Test = 1, // 测试环境
  Pre, // 预发布
  Product // 正式环境
}

const env: EnvTpye = 2

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
      return 'https://wwwtestolv4.tostar.top/special/'
    case EnvTpye.Pre:
      return 'https://wwwpreolv4.tostar.top/special/'
    case EnvTpye.Product:
      return 'https://www.fx110.com/special/'
  }
}

export {
  getEnvRequestUrl,
  getSepecialLinkUrl
}