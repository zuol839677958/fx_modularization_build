export type PageResponse<T> = {
  ExtraInfo?: any
  HasNextPage?: boolean
  HasPreviousPage?: boolean
  PageDatas?: T[]
  PageIndex?: number
  PageSize?: number
  TotalCount?: number
  TotalPages?: number
}

export type TemplateResponseModel = {
  TempId: number
  Title: string
  Img: string
  Summary: string
  Describe: string
  Content: string
  ContentH5: string
  EditType: number
}