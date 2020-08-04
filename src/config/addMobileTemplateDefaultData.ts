import { ITemplateModel, IBannerModel, IIconTitleTextModel, IPlaintextModel, ICorrelationSpecialModel, IAudioModel } from '../store/data'
import { BannerType, TemplateType, TemplatePositionType } from '../components/EditorContainer/store/state'
import { BackgroundSetType } from '../components/BackgroundSet/store/state'

/* 新增Banner模板默认数据 */
const bannerDefaultData: ITemplateModel<IBannerModel> = {
  id: `${TemplateType[TemplateType.Banner]}`,
  type: TemplateType.Banner,
  isShow: true,
  tempData: {
    bannerType: BannerType.SingleImage,
    isFull: false,
    imageData: {
      imageUrl: 'https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610115945561.png'
    }
  }
}

/* 新增音频模板默认数据 */
const audioDefaultData: ITemplateModel<IAudioModel> = {
  id: `${TemplateType[TemplateType.Audio]}`,
  type: TemplateType.Audio,
  isShow: true,
  tempData: {
    audioUrl: "",
    positionType: 2
  }
}

/* 新增图标标题文字模板默认数据 */
const iconTitleTextDefaultData: ITemplateModel<IIconTitleTextModel[]> = {
  id: `${TemplateType[TemplateType.IconTitleText]}`,
  type: TemplateType.IconTitleText,
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

/* 新增相关专题模板默认数据 */
const defaultSpecialData: ITemplateModel<ICorrelationSpecialModel[]> = {
  id: `${TemplateType[TemplateType.CorrelationSpecial]}`,
  type: TemplateType.CorrelationSpecial,
  isShow: true,
  tempData: []
}

const defaultMobileTemplateList = [
  bannerDefaultData,
  audioDefaultData,
  iconTitleTextDefaultData,
  plainTextDefaultData,
  defaultSpecialData,
]

export { defaultMobileTemplateList }