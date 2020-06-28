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
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175219506.png'
      }
    ]
  },
  {
    tempName: '分享',
    isActive: false,
    tempList: [
      {
        type: TemplateType.Share,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175523692.png'
      }
    ]
  },
  {
    tempName: '文本',
    isActive: false,
    tempList: [
      {
        type: TemplateType.IconTitleText,
        tempImageUrl: ''
      },
    ]
  },
  {
    tempName: '图文',
    isActive: false,
    tempList: [
      {
        type: TemplateType.LeftPictureRightText,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175727447.png'
      },
      {
        type: TemplateType.LeftTextRightPicture,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175741456.png'
      }
    ]
  },
  {
    tempName: '列表',
    isActive: false,
    tempList: [
      {
        type: TemplateType.RelatedList,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175523692.png'
      }
    ]
  },
]

export {
  addTemplateListData
}