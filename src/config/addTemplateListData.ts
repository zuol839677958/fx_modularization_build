import { TemplateType } from "../components/web/EditorContainer/store/state";

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
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/08/143125955.png'
      },
      // {
      //   type: TemplateType.Share,
      //   tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/08/143205706.png'
      // }
    ]
  },
  {
    tempName: '文本',
    isActive: false,
    tempList: [
      {
        type: TemplateType.Plaintext,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/29/101545330.png'
      },
    ]
  },
  {
    tempName: '图标标题文字',
    isActive: false,
    tempList: [
      {
        type: TemplateType.IconTitleText,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/28/133937984.png'
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
        type: TemplateType.CorrelationSpecial,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/28/113548499.png'
      }
    ]
  },
  {
    tempName: '音频',
    isActive: false,
    tempList: [
      {
        type: TemplateType.Audio,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/28/095536782.png'
      }
    ]
  },
  {
    tempName: '双图',
    isActive: false,
    tempList: [
      {
        type: TemplateType.MorePicture,
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/30/140046775.png'
      }
    ]
  }
]

export {
  addTemplateListData
}