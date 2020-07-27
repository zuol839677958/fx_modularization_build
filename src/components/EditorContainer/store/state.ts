import { ITemplateModel, IBannerModel, IIconTitleTextModel, IPlaintextModel, IPictureTextModel, IShareModel, ICorrelationSpecialModel, IAudioModel } from "../../../store/data"
import { BackgroundSetType } from "../../BackgroundSet/store/state"

export enum TemplateType {
  Banner = 1,
  Share,
  IconTitleText,
  LeftPictureRightText,
  LeftTextRightPicture,
  Plaintext,
  RelatedList,
  CorrelationSpecial,
  Audio
}

export enum BannerType {
  SingleImage = 1,
  Swiper,
  Video
}

export enum SharePositionType {
  Left = 1,
  Center,
  Right
}
export enum AudioPositionType {
  Left = 1,
  Center,
  Right
}

const editorContainerState: ITemplateModel<
  IBannerModel
  | IIconTitleTextModel[]
  | IPlaintextModel
  | IPictureTextModel
  | IShareModel
  | ICorrelationSpecialModel
  | IAudioModel
>[] = [
    {
      id: `${TemplateType[TemplateType.Banner]}_${Date.now()}`,
      type: TemplateType.Banner,
      isShow: true,
      tempData: {
        bannerType: BannerType.SingleImage,
        isFull: true,
        imageData: {
          imageUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610115945561.png'
        }
      }
    },
    {
      id: `${TemplateType[TemplateType.Share]}_${Date.now()}`,
      type: TemplateType.Share,
      isShow: true,
      spacing: 20,
      tempData: {
        isTW: false,
        labelFontColor: '#fff',
        positionType: SharePositionType.Right
      }
    },
    {
      id: `${TemplateType[TemplateType.IconTitleText]}_${Date.now()}`,
      type: TemplateType.IconTitleText,
      isShow: true,
      spacing: 20,
      tempData: [
        {
          iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
          title: '人物',
          text: ':Mahasagara',
          titleFontColor: '#9f3b3c',
          textFontColor: '#f0c9aa',
          background: {
            bgType: BackgroundSetType.PureColor,
            bgColor: '#f0c9aa'
          },
          isShow: true
        },
        {
          iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
          title: '成绩',
          text: ':1年翻仓6倍，胜率93.91%',
          titleFontColor: '#9f3b3c',
          textFontColor: '#f0c9aa',
          background: {
            bgType: BackgroundSetType.PureColor,
            bgColor: '#f0c9aa'
          },
          isShow: true
        },
        {
          iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
          title: '特色',
          text: ':擅长做波段和中线交易',
          titleFontColor: '#9f3b3c',
          textFontColor: '#f0c9aa',
          background: {
            bgType: BackgroundSetType.PureColor,
            bgColor: '#f0c9aa'
          },
          isShow: true
        }
      ]
    },
    {
      id: `${TemplateType[TemplateType.Plaintext]}_${Date.now()}`,
      type: TemplateType.Plaintext,
      isShow: true,
      spacing: 20,
      tempData: {
        textHtml: 'Mahasagara，汇聊号“521667”，总盈利率排名第49，获胜率高达93.91%擅长做波段和中线1年时间。 内将资金翻仓6倍，因眼光精准、下手果决而闻名。',
        fontColor: '#fff'
      }
    },
    {
      id: `${TemplateType[TemplateType.LeftPictureRightText]}_${Date.now()}`,
      type: TemplateType.LeftPictureRightText,
      isShow: true,
      spacing: 50,
      tempData: {
        picUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610111700984.jpg',
        spacingPercent: 2,
        titleTextList: [
          {
            title: '惊人的准确率',
            text: '这个账户以2200美金做起，不到一年的时间做到1.54万美金，Mahasagara实现了6倍的资金增长，116笔交易中，错误仅7笔，这是个非常惊人的准确率。据Mahasagara所言，这完全得益于他对经济现状的了解以及技术面上的分析。',
            titleFontSize: 28,
            titleFontColor: '#9f3b3c',
            textFontColor: '#fff',
            background: {
              bgType: BackgroundSetType.PureColor,
              bgColor: '#f0c9aa'
            },
            isShow: true
          },
          {
            title: '从事背景',
            text: 'Mahasagara从事外贸行业，又涉及到一些其他实体，对经济形势有一个直观的感受。因为是做外贸行业，不可避免地接触到了外汇，加上读书时就对股票期货很感兴趣，对外汇的接受度自然就比较高。多番研究下，因外汇保证金交易的高杠杆、多空双向交易等优点，Mahasagara渐渐将投资从股票期货转向了外汇。',
            titleFontSize: 28,
            titleFontColor: '#9f3b3c',
            textFontColor: '#fff',
            background: {
              bgType: BackgroundSetType.PureColor,
              bgColor: '#f0c9aa'
            },
            isShow: true
          }
        ]
      }
    },
    {
      id: `${TemplateType[TemplateType.LeftTextRightPicture]}_${Date.now()}`,
      type: TemplateType.LeftTextRightPicture,
      isShow: true,
      spacing: 50,
      tempData: {
        picUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610111704578.png',
        spacingPercent: 2,
        titleTextList: [
          {
            title: '故事过程',
            text: '我吃你家饺子”是在2013年接触到外汇交易的，当时才21岁，学财务出身，喜欢外汇行业。他的外汇求学之旅也并不是一帆风顺的，一开始被一些所谓的“金融公司交易员培训”吸引，进去后交了不少“学费”。年轻气盛的他，肯定不服气、不服输，于是痛下决心，要“搞懂吃透”外汇交易。',
            titleFontSize: 28,
            titleFontColor: '#9f3b3c',
            textFontColor: '#fff',
            background: {
              bgType: BackgroundSetType.PureColor,
              bgColor: '#f0c9aa'
            },
            isShow: true
          },
          {
            title: '他初入市场的亏损经历？',
            text: '他说：“虽然很多人调侃我是‘土豪’，但其实我进入外汇市场的起始资金并不高：5000美金的账户，出于控制亏损的考虑，以入门级别的小资金进行试探。果然，一入外汇深海就被应聘时遇到的操盘手给骗了，5000美金打了水漂，这是首次交学费。第二次爆仓是发生在EA交易中。一个账户挂了两个EA，一样的魔术号，两个EA系统无法识别彼此，疯狂下单，直接爆仓了，2万美金又一次交了学费。”',
            titleFontSize: 28,
            titleFontColor: '#9f3b3c',
            textFontColor: '#fff',
            background: {
              bgType: BackgroundSetType.PureColor,
              bgColor: '#f0c9aa'
            },
            isShow: true
          }
        ]
      }
    },
    {
      id: `${TemplateType[TemplateType.CorrelationSpecial]}_${Date.now()}`,
      type: TemplateType.CorrelationSpecial,
      isShow: true,
      spacing: 20,
      tempData: []
    },
    {
      id: `${TemplateType[TemplateType.Audio]}_${Date.now()}`,
      type: TemplateType.Audio,
      isShow: true,
      spacing: 20,
      tempData: {
        audioUrl:"https://file.wbp5.com/upload/files/2020/07/24/024311228495.mp3",
        positionType: SharePositionType.Center
    }
    }
  ]

export {
  editorContainerState
}