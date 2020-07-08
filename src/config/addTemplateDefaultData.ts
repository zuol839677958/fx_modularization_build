import { ITemplateModel } from '../store/data'
import { BannerType, TemplateType, SharePositionType } from '../components/EditorContainer/store/state'
import { BackgroundSetType } from '../components/BackgroundSet/store/state'

/* 新增Banner模板默认数据 */
const bannerDefaultData: ITemplateModel = {
  id: `${TemplateType[TemplateType.Banner]}`,
  type: TemplateType.Banner,
  sort: Date.now(),
  isShow: true,
  tempData: {
    bannerType: BannerType.SingleImage,
    isFull: false,
    imageData: {
      imageUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610115945561.png'
    }
  }
}

/* 新增分享模板默认数据 */
const shareDefaultData: ITemplateModel = {
  id: `${TemplateType[TemplateType.Share]}`,
  type: TemplateType.Share,
  sort: Date.now(),
  isShow: true,
  tempData: {
    isTW: false,
    labelFontColor: '#fff',
    positionType: SharePositionType.Right
  }
}

/* 新增图标标题文字模板默认数据 */
const iconTitleTextDefaultData: ITemplateModel = {
  id: `${TemplateType[TemplateType.IconTitleText]}`,
  type: TemplateType.IconTitleText,
  sort: Date.now(),
  isShow: true,
  tempData: [
    {
      iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
      hasIcon: true,
      title: '请输入标题',
      text: ':请输入文字',
      titleFontColor: '#9f3b3c',
      textFontColor: '#f0c9aa',
      background: {
        bgType: BackgroundSetType.PureColor,
        bgColor: '#f0c9aa'
      },
      isShow: true,
      sort: 1
    }
  ]
}

/* 新增纯文字模板默认数据 */
const plainTextDefaultData: ITemplateModel = {
  id: `${TemplateType[TemplateType.Plaintext]}`,
  type: TemplateType.Plaintext,
  sort: Date.now(),
  isShow: true,
  tempData: {
    textHtml: '请输入文字',
    fontColor: '#fff'
  }
}

/* 新增左文右图模板默认数据 */
const leftTextRightPictureDefaultData: ITemplateModel = {
  id: `${TemplateType[TemplateType.LeftTextRightPicture]}`,
  type: TemplateType.LeftTextRightPicture,
  sort: Date.now(),
  isShow: true,
  tempData: {
    picUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610111704578.png',
    spacingPercent: 2,
    titleTextList: [
      {
        title: '请输入标题',
        text: '请输入文字',
        titleFontColor: '#9f3b3c',
        textFontColor: '#fff',
        background: {
          bgType: BackgroundSetType.PureColor,
          bgColor: '#f0c9aa'
        },
        isShow: true,
        sort: 1
      },
      {
        title: '请输入标题',
        text: '请输入文字',
        titleFontColor: '#9f3b3c',
        textFontColor: '#fff',
        background: {
          bgType: BackgroundSetType.PureColor,
          bgColor: '#f0c9aa'
        },
        isShow: true,
        sort: 2
      }
    ]
  }
}

/* 新增左图右文模板默认数据 */
const leftPictureRightTextDefaultData: ITemplateModel = {
  id: `${TemplateType[TemplateType.LeftPictureRightText]}`,
  type: TemplateType.LeftPictureRightText,
  sort: Date.now(),
  isShow: true,
  tempData: {
    picUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610111700984.jpg',
    spacingPercent: 2,
    titleTextList: [
      {
        title: '请输入标题',
        text: '请输入文字',
        titleFontColor: '#9f3b3c',
        textFontColor: '#fff',
        background: {
          bgType: BackgroundSetType.PureColor,
          bgColor: '#f0c9aa'
        },
        isShow: true,
        sort: 1
      },
      {
        title: '请输入标题',
        text: '请输入文字',
        titleFontColor: '#9f3b3c',
        textFontColor: '#fff',
        background: {
          bgType: BackgroundSetType.PureColor,
          bgColor: '#f0c9aa'
        },
        isShow: true,
        sort: 2
      }
    ]
  }
}

/* 新增纯文字模板默认数据 */
const defaultSpecialData: ITemplateModel = {
  id: `${TemplateType[TemplateType.CorrelationSpecial]}`,
  type: TemplateType.CorrelationSpecial,
  sort: Date.now(),
  isShow: true,
  tempData: []
}

const defaultTemplateList = [
  bannerDefaultData,
  shareDefaultData,
  iconTitleTextDefaultData,
  plainTextDefaultData,
  leftTextRightPictureDefaultData,
  leftPictureRightTextDefaultData,
  defaultSpecialData
]

export { defaultTemplateList }