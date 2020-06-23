import { TemplateType } from "../components/EditorContainer/store/state";

export interface IAddTemplateListDataModel {
  tempName: string // 模板分类名称
  tempList: IAddTemplateItemModel[] // 模块分类列表
  isActive?: boolean // 是否选中
}

export interface IAddTemplateItemModel {
  type: number // 模板类型
  tempImageUrl: string // 模板缩略图片链接
  isActive?: boolean // 是否选中
}

const addTemplateListData: IAddTemplateListDataModel[] = [
  {
    tempName: 'Banner',
    isActive: true,
    tempList: [
      {
        type: TemplateType.Banner,
        tempImageUrl: ''
      }
    ]
  },
  {
    tempName: '文本',
    isActive: true,
    tempList: [
      {
        type: TemplateType.IconTitleText,
        tempImageUrl: ''
      },
      {
        type: TemplateType.Plaintext,
        tempImageUrl: ''
      }
    ]
  },
  {
    tempName: '图文',
    isActive: true,
    tempList: [
      {
        type: TemplateType.LeftPictureRightText,
        tempImageUrl: ''
      },
      {
        type: TemplateType.LeftTextRightPicture,
        tempImageUrl: ''
      }
    ]
  }
]

export default {
  addTemplateListData
}