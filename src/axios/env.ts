export enum EnvTpye {
  Test = 1, // 测试环境
  Pre, // 预发布
  Product // 正式环境
}

let env: EnvTpye = 4

const getEnvRequestUrl = () => {
  checkDomain()
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
  checkDomain()
  switch (env) {
    case EnvTpye.Test:
      return 'https://wwwtestolv4.tostar.top/special/'
    case EnvTpye.Pre:
      return 'https://wwwpreolv4.tostar.top/special/'
    case EnvTpye.Product:
      return 'https://www.fx110.com/special/'
  }
}

const getMobileSpecialLinkUrl = () => {
  checkDomain()
  switch (env) {
    case EnvTpye.Test:
      return 'https://mtestolv1.tostar.top/special/'
    case EnvTpye.Pre:
      return 'https://mpreolv1.tostar.top/special/'
    case EnvTpye.Product:
      return 'https://m.fx110.com/special/'
  }
}

const checkDomain = () => {
  const domain = window.location.origin
  if (domain.indexOf('localhost') > -1 || domain.indexOf('spadminstest') > -1) env = EnvTpye.Test
  else if (domain.indexOf('spadminspre') > -1) env = EnvTpye.Pre
  else if (domain.indexOf('spadminsdcdn') > -1) env = EnvTpye.Product
}

export {
  getEnvRequestUrl,
  getSepecialLinkUrl,
  getMobileSpecialLinkUrl
}