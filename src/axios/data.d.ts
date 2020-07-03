import { type } from "os"

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
  TempId?: number
  Title?: string
  Img?: string
  Summary?: string
  Describe?: string
  Content?: string 
  ContentH5?: string
  EditType?: number
}
export type TemplateSpecialModel = {
  SpecialId:number
  Title:string
  TitleImg:string
  TitleImgR:string
  TitleImgS:string
  Summary?:string
  Content?: string
  ContentH5?: string
  Status:number;//专题类型是否已经发布 1为已经发布 
}
export type UpdateSpecialContentOptions = {
  SpecialId: number
  Content?: string
  ContentH5?: string
  EditType: number
}