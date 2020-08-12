import { TemplateType } from "../components/web/EditorContainer/store/state";
import { IAddTemplateListDataModel } from "./addTemplateListData";


const addMobileTemplateListData: IAddTemplateListDataModel[] = [
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
  }
]

export {
  addMobileTemplateListData
}