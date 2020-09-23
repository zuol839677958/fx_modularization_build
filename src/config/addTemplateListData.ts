import { TemplateType } from "@/store/state/editor.state";

export interface IAddTemplateListDataModel {
  tempName: string // 模板分类名称
  tempList: IAddTemplateItemModel[] // 模块分类列表
  isActive?: boolean // 是否选中
}

export interface IAddTemplateItemModel {
  type: number // 模板类型
  name: string // 模板名字
  tempImageUrl: string // 模板缩略图片链接
  isActive?: boolean // 是否选中
}

// const addTemplateListData: IAddTemplateListDataModel[] = [
//   {
//     tempName: 'Banner',
//     isActive: true,
//     tempList: [
//       {
//         type: TemplateType.Banner,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175219506.png'
//       }
//     ]
//   },
//   {
//     tempName: '分享',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.Share,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/08/143125955.png'
//       },
//       // {
//       //   type: TemplateType.Share,
//       //   tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/08/143205706.png'
//       // }
//     ]
//   },
//   {
//     tempName: '文本',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.Plaintext,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/29/101545330.png'
//       },
//     ]
//   },
//   {
//     tempName: '图标标题文字',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.IconTitleText,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/28/133937984.png'
//       },
//     ]
//   },
//   {
//     tempName: '图文',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.LeftPictureRightText,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175727447.png'
//       },
//       {
//         type: TemplateType.LeftTextRightPicture,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175741456.png'
//       }
//     ]
//   },
//   {
//     tempName: '列表',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.CorrelationSpecial,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/28/113548499.png'
//       }
//     ]
//   },
//   {
//     tempName: '音频',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.Audio,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/28/095536782.png'
//       }
//     ]
//   },
//   {
//     tempName: '双图',
//     isActive: false,
//     tempList: [
//       {
//         type: TemplateType.MorePicture,
//         tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/30/140046775.png'
//       }
//     ]
//   }
// ]

const addTemplateListData: IAddTemplateListDataModel[] = [
  {
    tempName: '常规模块',
    isActive: true,
    tempList: [
      {
        type: TemplateType.Banner,
        name: 'Banner',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175219506.png'
      },
      {
        type: TemplateType.Share,
        name: '分享',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/08/143125955.png'
        //tempImageUrl: https://img.wbp5.com/upload/files/master/2020/07/08/143205706.png 台湾版分享
      },
      {
        type: TemplateType.CorrelationSpecial,
        name: '相关专题列表',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/28/113548499.png'
      }
    ]
  },
  {
    tempName: '正文内容模块',
    isActive: false,
    tempList: [
      {
        type: TemplateType.IconTitleText,
        name: '图标标题文字',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/28/133937984.png'
      },
      {
        type: TemplateType.Plaintext,
        name: '纯文本',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/29/101545330.png'
      },
      {
        type: TemplateType.LeftPictureRightText,
        name: '左图右文',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175727447.png'
      },
      {
        type: TemplateType.LeftTextRightPicture,
        name: '左文右图',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/06/24/175741456.png'
      },
      {
        type: TemplateType.MorePicture,
        name: '双图',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/30/140046775.png'
      }
    ]
  },
  {
    tempName: '特殊模块',
    isActive: false,
    tempList: [
      {
        type: TemplateType.Audio,
        name: '音频',
        tempImageUrl: 'https://img.wbp5.com/upload/files/master/2020/07/28/095536782.png'
      }
    ]
  }
]

export {
  addTemplateListData
}