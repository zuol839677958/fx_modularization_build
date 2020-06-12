import { ITemplateModel } from "../../../store/data"

export enum TemplateType {
  Banner = 1,
  IconTitleText,
  LeftPictureRightText,
  LeftTextRightPicture
}

const editorContainerState: ITemplateModel[] = [
  {
    id: `${TemplateType[TemplateType.IconTitleText]}_1`,
    type: TemplateType.IconTitleText,
    sort: 1,
    isShow: true,
    tempData: [
      {
        iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
        title: '请输入标题2',
        text: '请输入文字2',
        isShow: true,
        sort: 2
      },
      {
        iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
        title: '请输入标题',
        text: '请输入文字',
        isShow: true,
        sort: 1
      }
    ]
  },
  {
    id: `${TemplateType[TemplateType.LeftTextRightPicture]}_2`,
    type: TemplateType.LeftTextRightPicture,
    sort: 2,
    isShow: true,
    tempData: {
      picUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610111704578.png',
      spacingPercent: 2,
      titleTextList: [
        {
          title: '故事过程',
          text: '我吃你家饺子”是在2013年接触到外汇交易的，当时才21岁，学财务出身，喜欢外汇行业。他的外汇求学之旅也并不是一帆风顺的，一开始被一些所谓的“金融公司交易员培训”吸引，进去后交了不少“学费”。年轻气盛的他，肯定不服气、不服输，于是痛下决心，要“搞懂吃透”外汇交易。',
          isShow: true,
          sort: 1
        },
        {
          title: '他初入市场的亏损经历？',
          text: '他说：“虽然很多人调侃我是‘土豪’，但其实我进入外汇市场的起始资金并不高：5000美金的账户，出于控制亏损的考虑，以入门级别的小资金进行试探。果然，一入外汇深海就被应聘时遇到的操盘手给骗了，5000美金打了水漂，这是首次交学费。第二次爆仓是发生在EA交易中。一个账户挂了两个EA，一样的魔术号，两个EA系统无法识别彼此，疯狂下单，直接爆仓了，2万美金又一次交了学费。”',
          isShow: true,
          sort: 2
        }
      ]
    }
  },
  {
    id: `${TemplateType[TemplateType.LeftPictureRightText]}_3`,
    type: TemplateType.LeftPictureRightText,
    sort: 3,
    isShow: true,
    tempData: {
      picUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610111704578.png',
      spacingPercent: 2,
      titleTextList: [
        {
          title: '故事过程',
          text: '我吃你家饺子”是在2013年接触到外汇交易的，当时才21岁，学财务出身，喜欢外汇行业。他的外汇求学之旅也并不是一帆风顺的，一开始被一些所谓的“金融公司交易员培训”吸引，进去后交了不少“学费”。年轻气盛的他，肯定不服气、不服输，于是痛下决心，要“搞懂吃透”外汇交易。',
          isShow: true,
          sort: 1
        },
        {
          title: '他初入市场的亏损经历？',
          text: '他说：“虽然很多人调侃我是‘土豪’，但其实我进入外汇市场的起始资金并不高：5000美金的账户，出于控制亏损的考虑，以入门级别的小资金进行试探。果然，一入外汇深海就被应聘时遇到的操盘手给骗了，5000美金打了水漂，这是首次交学费。第二次爆仓是发生在EA交易中。一个账户挂了两个EA，一样的魔术号，两个EA系统无法识别彼此，疯狂下单，直接爆仓了，2万美金又一次交了学费。”',
          isShow: true,
          sort: 2
        }
      ]
    }
  }
]

export {
  editorContainerState
}