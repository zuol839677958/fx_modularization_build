import { TemplateType } from "@/store/state/editor.state";
import { IAddTemplateListDataModel } from "./addTemplateListData";

const addMobileTemplateListData: IAddTemplateListDataModel[] = [
  {
    tempName: '常规模块',
    isActive: true,
    tempList: [
      {
        type: TemplateType.Banner,
        name: 'Banner',
        tempImageUrl: 'https://img.wx168e.com/upload/files/master/2020/06/24/175219506.png'
      },
      {
        type: TemplateType.CorrelationSpecial,
        name: '相关专题列表',
        tempImageUrl: 'https://img.wx168e.com/upload/files/master/2020/06/28/113548499.png'
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
        tempImageUrl: 'https://img.wx168e.com/upload/files/master/2020/06/28/133937984.png'
      },
      {
        type: TemplateType.Plaintext,
        name: '纯文本',
        tempImageUrl: 'https://img.wx168e.com/upload/files/master/2020/07/29/101545330.png'
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
        tempImageUrl: 'https://img.wx168e.com/upload/files/master/2020/07/28/095536782.png'
      }
    ]
  }
]

export {
  addMobileTemplateListData
}