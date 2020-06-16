export interface IPageState {
  editorContainerReducer: IPageModel;
  editorSliderReducer: IEditorSliderModel;
  backgroundSetReducer: IBackgroundSetModel;
}

export interface IEditorSliderModel {
  isShow: boolean;
}

export interface IPageModel {
  modeType: number;
  pageHtml: string;
  activeTempId: string;
  allTempData: ITemplateModel[];
  background?: IBackgroundSetModel;
}

export interface ITemplateModel {
  id: string;
  type: number;
  sort: number;
  isShow: boolean;
  background?: IBackgroundSetModel;
  tempData: IIconTitleTextModel[] | IPictureTextModel;
}

/* 图标标题文字模板 */
export interface IIconTitleTextModel {
  iconUrl?: string;
  title: string;
  background?: IBackgroundSetModel;
  text: string;
  isShow: boolean;
  sort: number;
}

/* 图文模板 */
export interface IPictureTextModel {
  picUrl: string;
  spacingPercent?: number;
  titleTextList: IIconTitleTextModel[];
}

/* 标题文字模板 */
export interface ITitleTextModel {
  title: string;
  background?: IBackgroundSetModel;
  text: string;
  isShow: boolean;
  sort: number;
}

/* 背景设置 */
export interface IBackgroundSetModel {
  tempId?: string;
  bgType?: number;
  bgColor?: string;
  bgImageUrl?: string;
  isShow?: boolean;
}
