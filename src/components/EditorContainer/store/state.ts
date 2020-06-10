import { ITemplateModel } from "../../../store/data"

export enum TemplateType {
  Banner = 1,
  IconTitleText,
  LeftPictureRightText,
  LeftTextRightPicture
}

const editorContainerState: ITemplateModel[] = [{
  id: `${TemplateType[TemplateType.IconTitleText]}_1`,
  type: TemplateType.IconTitleText,
  tempSort: 1,
  isShow: true,
  tempData: [{
    iconUrl: 'https://img.wbp5.com/upload/files/master/2020/05/07/152733467.png',
    title: '请输入标题',
    text: '请输入文字',
    isShow: true,
    itemSort: 1
  }]
}]

export {
  editorContainerState
}