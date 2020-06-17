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
  tempData: IBannerModel | IIconTitleTextModel[] | IPictureTextModel | IPlaintextModel;
}

/* Banner模板 */
export interface IBannerModel {
  bannerType: number;
  imageData: IBannerImageModel;
  imageListData?: IBannerImageModel[];
  videoData?: IBannerVideoModel;
}

export interface IBannerImageModel {
  imageUrl: string;
  imageTitle?: string;
  imageDesc?: string;
  imageLinkUrl?: string;
}

export interface IBannerVideoModel {
  videoSrc: string;
  videoTitle?: string;
  videoDesc?: string;
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

/* 纯文字模板 */
export interface IPlaintextModel {
  textHtml: string
}

/* 背景设置 */
export interface IBackgroundSetModel {
  tempId?: string;
  bgType?: number;
  bgColor?: string;
  bgImageUrl?: string;
  isShow?: boolean;
}
