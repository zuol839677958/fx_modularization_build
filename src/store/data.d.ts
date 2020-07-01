// 整个项目状态管理
export interface IPageState {
  editorContainerReducer: IPageModel; // 编辑生成的网页内容
  editorSliderReducer: IEditorSliderModel; // 侧滑栏编辑
  backgroundSetReducer: IBackgroundSetModel; // 网页背景以及模板背景设置
  addTemplateSliderReducer: IAddTemplateSliderModel; // 新增模块
}

/* 侧滑栏编辑模型 */
export interface IEditorSliderModel {
  isShow: boolean; // 是否显示侧滑栏编辑
}

/* 新增模板侧滑栏模型 */
export interface IAddTemplateSliderModel {
  isShow: boolean;
}

/* 生成网页模型 */
export interface IPageModel {
  modeType: number; // 专题模板类型
  pageHtml: string; // 生成的网页html
  activeTempId: string; // 正在编辑中的模板id
  allTempData: ITemplateModel[]; // 所有的模板数据
  background?: IBackgroundSetModel; // 整个网页的背景
}

export interface ITemplateModel {
  id: string; // 模板id
  type: number; // 模板类型
  sort: number; // 模板排序
  isShow: boolean; // 模板是否显示
  background?: IBackgroundSetModel; // 模板背景
  tempData: IBannerModel | IIconTitleTextModel[] | IPictureTextModel | IPlaintextModel | ICorrelationSpecialModel[]; // 模板数据
}

/* Banner模板 */
export interface IBannerModel {
  bannerType: number; // banner类型，1->单图，2->轮播图, 3->视频
  isFull: boolean; // 图片是否横向铺满整个网页
  imageData: IBannerImageModel; // 单个图片数据模型
  imageListData?: IBannerImageModel[]; // 轮播图数据模型
  videoData?: IBannerVideoModel; // 视频数据模型
}

export interface IBannerImageModel {
  imageUrl: string; // 图片链接
  imageTitle?: string; // 图片标题
  imageDesc?: string; // 图片描述
  imageLinkUrl?: string; // 图片跳转链接
}

export interface IBannerVideoModel {
  videoSrc: string; // 视频资源链接
  videoTitle?: string; // 视频标题
  videoDesc?: string; // 视频描述
}

/* 图标标题文字模板 */
export interface IIconTitleTextModel {
  iconUrl?: string; // 图标链接
  title: string; // 标题
  titleFontColor?: string; // 标题字体颜色
  background?: IBackgroundSetModel; // 标题背景
  text: string; // 文字内容
  textFontColor?: string; // 文字字体颜色
  isShow: boolean; // 是否显示此项条目
  sort: number;  // 条目排序
}

/* 图文模板 */
export interface IPictureTextModel {
  picUrl: string; // 图片链接
  spacingPercent?: number; // 图文间距
  titleTextList: IIconTitleTextModel[]; // 标题文字条目
}

/* 标题文字模板 */
export interface ITitleTextModel {
  title: string; // 标题
  titleFontColor?: string; // 标题字体颜色
  background?: IBackgroundSetModel; // 标题背景
  text: string; // 文字内容
  textFontColor?: string; // 文字字体颜色
  isShow: boolean; // 是否显示此项条目
  sort: number; // 条目排序
}

/* 纯文字模板 */
export interface IPlaintextModel {
  textHtml: string; // 文本html内容
  fontColor?: string; // 文本内容字体颜色
}

/* 相关专题模板 */
export interface ICorrelationSpecialModel {
  specailId:string;//专题id
  title: string; // 标题
  imageUrl: string; // 图片链接
  fontColor?: string; // 文本内容字体颜色
  Summary?: string; // 描述
}

/* 背景设置 */
export interface IBackgroundSetModel {
  tempId?: string; // 正在编辑中的模板id
  bgType?: number;  // 背景类型：1->无图，2->纯色，3->背景图
  bgColor?: string; // 纯色背景
  bgImageUrl?: string; // 背景图链接
  isShow?: boolean; // 是否显示背景设置弹窗
}

