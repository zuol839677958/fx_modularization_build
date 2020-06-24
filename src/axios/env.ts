export enum EnvTpye {
  Local = 1 // 本地开发环境
}

export enum EnvTypeRequestUrl {
  '' = 1
}

const getEnvRequestUrl = (envTpye: EnvTpye) => {
  return EnvTypeRequestUrl[envTpye]
}

export { getEnvRequestUrl }