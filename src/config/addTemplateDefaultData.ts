import { ITemplateModel, IBannerModel, IShareModel, IIconTitleTextModel, IPlaintextModel, IPictureTextModel, ICorrelationSpecialModel, IAudioModel, IMorePictureModel } from '@/store/data'
import { BannerType, TemplateType, TemplatePositionType } from '@/store/state/editor.state'
import { BackgroundSetType } from '@/store/state/backgroundSet.state'

/* 新增Banner模板默认数据 */
const bannerDefaultData: ITemplateModel<IBannerModel> = {
  id: `${TemplateType[TemplateType.Banner]}`,
  type: TemplateType.Banner,
  isShow: true,
  tempData: {
    bannerType: BannerType.SingleImage,
    isFull: false,
    imageData: {
      imageUrl: 'https://imgs.wx168e.com/api/secrecymaster/html_up/2019/6/20190610115945561.png'
    }
  }
}

/* 新增分享模板默认数据 */
const shareDefaultData: ITemplateModel<IShareModel> = {
  id: `${TemplateType[TemplateType.Share]}`,
  type: TemplateType.Share,
  isShow: true,
  tempData: {
    isTW: false,
    labelFontColor: '#fff',
    positionType: TemplatePositionType.Right
  }
}

/* 新增音频模板默认数据 */
const audioDefaultData: ITemplateModel<IAudioModel> = {
  id: `${TemplateType[TemplateType.Audio]}`,
  type: TemplateType.Audio,
  isShow: true,
  tempData: {
    audioUrl:"",
    positionType:2
  }
}

/* 新增多图模板默认数据 */
const morePictureDefaultData: ITemplateModel<IMorePictureModel[]> = {
  id: `${TemplateType[TemplateType.MorePicture]}`,
  type: TemplateType.MorePicture,
  isShow: true,
  tempData:[
    {
    picUrl: "https://imgs.wx168e.com/api/secrecymaster/html_up/2019/6/20190610111700984.jpg",
    picWidthPercent: 49,
    spacingPercent:20
  },
  {
    picUrl: "https://imgs.wx168e.com/api/secrecymaster/html_up/2019/6/20190610111704578.png",
    picWidthPercent: 49,
    spacingPercent:20
  }]
}


/* 新增图标标题文字模板默认数据 */
const iconTitleTextDefaultData: ITemplateModel<IIconTitleTextModel[]> = {
  id: `${TemplateType[TemplateType.IconTitleText]}`,
  type: TemplateType.IconTitleText,
  isShow: true,
  tempData: [
    {
      iconUrl: 'https://img.wx168e.com/upload/files/master/2020/05/07/152733467.png',
      hasIcon: true,
      title: '请输入标题',
      text: ':请输入文字',
      titleFontColor: '#9f3b3c',
      textFontColor: '#f0c9aa',
      background: {
        bgType: BackgroundSetType.PureColor,
        bgColor: '#f0c9aa'
      },
      positionType: TemplatePositionType.Left,
      isShow: true
    }
  ]
}

/* 新增纯文字模板默认数据 */
const plainTextDefaultData: ITemplateModel<IPlaintextModel> = {
  id: `${TemplateType[TemplateType.Plaintext]}`,
  type: TemplateType.Plaintext,
  isShow: true,
  tempData: {
    textHtml: '请输入文字',
    fontColor: '#fff'
  }
}

/* 新增左文右图模板默认数据 */
const leftTextRightPictureDefaultData: ITemplateModel<IPictureTextModel> = {
  id: `${TemplateType[TemplateType.LeftTextRightPicture]}`,
  type: TemplateType.LeftTextRightPicture,
  isShow: true,
  tempData: {
    picUrl: 'https://imgs.wx168e.com/api/secrecymaster/html_up/2019/6/20190610111704578.png',
    picWidthPercent: 49,
    spacingPercent: 2,
    titleTextList: [
      {
        title: '请输入标题',
        text: '请输入文字',
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
        title: '请输入标题',
        text: '请输入文字',
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
}

/* 新增左图右文模板默认数据 */
const leftPictureRightTextDefaultData: ITemplateModel<IPictureTextModel> = {
  id: `${TemplateType[TemplateType.LeftPictureRightText]}`,
  type: TemplateType.LeftPictureRightText,
  isShow: true,
  tempData: {
    picUrl: 'https://imgs.wx168e.com/api/secrecymaster/html_up/2019/6/20190610111700984.jpg',
    picWidthPercent: 49,
    spacingPercent: 2,
    titleTextList: [
      {
        title: '请输入标题',
        text: '请输入文字',
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
        title: '请输入标题',
        text: '请输入文字',
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
}

/* 新增相关专题模板默认数据 */
const defaultSpecialData: ITemplateModel<ICorrelationSpecialModel[]> = {
  id: `${TemplateType[TemplateType.CorrelationSpecial]}`,
  type: TemplateType.CorrelationSpecial,
  isShow: true,
  tempData: []
}

const defaultTemplateList = [
  bannerDefaultData,
  audioDefaultData,
  shareDefaultData,
  iconTitleTextDefaultData,
  plainTextDefaultData,
  leftTextRightPictureDefaultData,
  leftPictureRightTextDefaultData,
  defaultSpecialData,
  morePictureDefaultData
]

export { defaultTemplateList }