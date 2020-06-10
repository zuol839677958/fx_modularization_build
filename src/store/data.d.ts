export interface IPageState {
  editorContainerReducer: IPageModel
}

export interface IPageModel {
  modeType: number;
  pageHtml: string;
  allTempData: ITemplateModel[];
  bgColor?: string;
  bgImageUrl?: string;
}

export interface ITemplateModel {
  id: string;
  type: number;
  tempSort: number;
  isShow: boolean;
  bgColor?: string;
  bgImageUrl?: string;
  tempData: IIconTitleTextModel[] | IPictureTextModel;
}

/* 图标标题文字模板 */
export interface IIconTitleTextModel {
  iconUrl: string;
  title: string;
  titleBgColor?: string;
  titleBgImageUrl?: string;
  text: string;
  isShow: boolean;
  itemSort: number;
}

/* 图文模板 */
export interface IPictureTextModel {
  picUrl: string;
  bgColor?: string;
  bgImageurl?: string;
  titleTextList: IIconTitleTextModel[];
}

/* 标题文字模板 */
export interface ITitleTextModel {
  title: string;
  titleBgColor?: string;
  titleBgImageUrl?: string;
  text: string;
  isShow: boolean;
  itemSort: number;
}
