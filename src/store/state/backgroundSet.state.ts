import { IBackgroundSetModel } from "@/store/data"

export enum BackgroundSetType {
  NoneColor = 1,
  PureColor,
  BackgroundImage
}

export const backgroundSetState: IBackgroundSetModel = {
  tempId: '',
  bgType: BackgroundSetType.NoneColor,
  bgColor: '',
  bgImageUrl: '',
  isShow: false
}