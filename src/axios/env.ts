export enum EnvTpye {
  Test, // 测试环境
  Pre, // 预发布
  Product // 正式环境
}

const domainUrl = [
  'https://wwwtestol.tostar.top',
  'https://wwwpreol.tostar.top',
  'https://www.fx110.hk'
]

const mobileDomainUrl = [
  'https://mtestol.tostar.top',
  'https://mpreol.tostar.top',
  'https://m.fx110.hk'
]

let env: EnvTpye = 4

const getEnvRequestUrl = () => {
  checkDomain()
  switch (env) {
    case EnvTpye.Test:
      return 'https://testmswebapi.tostar.top'
    case EnvTpye.Pre:
      return 'https://premswebapi.tostar.top'
    case EnvTpye.Product:
      return 'http://gamswebapi.wx168e.com'
  }
}

const getSepecialLinkUrl = () => {
  checkDomain()
  return `${domainUrl[env]}/special/`
}

const getMobileSpecialLinkUrl = () => {
  checkDomain()
  return `${mobileDomainUrl[env]}/special/`
}

const getSpecialPreviewUrl = () => {
  checkDomain()
  return `${domainUrl[env]}/info/special/detailspreview`
}

const getMobileSpecialPreviewUrl = () => {
  checkDomain()
  return `${mobileDomainUrl[env]}/special/detailspreview`
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
  getMobileSpecialLinkUrl,
  getSpecialPreviewUrl,
  getMobileSpecialPreviewUrl
}