export enum EnvTpye {
  Test = 'https://testmswebapi.tostar.top' // 测试环境
}

const getEnvRequestUrl = (envTpye: EnvTpye) => {
  return envTpye
}

export { getEnvRequestUrl }