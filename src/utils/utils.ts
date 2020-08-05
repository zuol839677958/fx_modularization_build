import _ from 'lodash'
import { ITemplateModel, IIconTitleTextModel, IBackgroundSetModel } from '../store/data'
import { BackgroundSetType } from '../components/BackgroundSet/store/state'
import { TemplatePositionType } from '../components/EditorContainer/store/state';
import { CSSProperties } from 'react';

/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
const swapArray = (
  arr: { id?: string, type?: number, tempData?: any, background?: any, spacing?: any, isShow?: any, [key: string]: any }[],
  index1: number, index2: number, hasType?: boolean
) => {
  if (hasType && arr[index1].type === arr[index2].type) {
    // 交换相同模板的背景
    [arr[index1].background, arr[index2].background] = [arr[index2].background, arr[index1].background];
    // 交换相同模板的间距
    [arr[index1].spacing, arr[index2].spacing] = [arr[index2].spacing, arr[index1].spacing];
    // 交换相同模板的显示影藏
    [arr[index1].isShow, arr[index2].isShow] = [arr[index2].isShow, arr[index1].isShow];
    // 交换相同模板的模板数据
    [arr[index1].tempData, arr[index2].tempData] = [arr[index2].tempData, arr[index1].tempData];
    return arr[index2].id
  }
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return false
}

//上移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
const zIndexUp = (arr: any[], index: number, hasType?: boolean) => {
  if (index !== 0) return swapArray(arr, index, index - 1, hasType)
  // if (index <= 0) return;
  // let thatIndex = index;

  // while (thatIndex >= 0) {
  //   --thatIndex;
  //   if (thatIndex < 0 || arr[thatIndex].isShow) break;
  // }

  // thatIndex = Math.max(0,thatIndex);

  // [arr[thatIndex], arr[index]] = [arr[index], arr[thatIndex]];
}

//下移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
const zIndexDown = (arr: any[], index: number, length: number, hasType?: boolean) => {
  if (index + 1 !== length) return swapArray(arr, index, index + 1, hasType)
}

const getIsShowList = (dataList: { isShow: boolean }[]) => {
  if (dataList.length === 0) return []
  return _.filter(dataList, item => item.isShow)
}

const insertItemToArray = (arr: any[], index: number, item: any) => {
  arr.splice(index, 0, item)
}

const updateIconTitleTextItemShow = (isShow: boolean, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.isShow = isShow
    }
  })
  return tempData
}

const updateIconTitleTextItemTitle = (title: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.title = title
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleFontSize = (titleFontSize: number, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.titleFontSize = titleFontSize
    }
  })
  return tempData
}

const updateIconTitleTextIconIsShow = (hasIcon: boolean, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel, index) => {
    if (index === itemIndex) {
      item.hasIcon = hasIcon
    }
  })
  return tempData
}

const updateIconTitleTextPositionType = (positionType: number, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel, index) => {
    if (index === itemIndex) {
      item.positionType = positionType
    }
  })
  return tempData
}

const updateIconTitleTextIconUrl = (iconUrl: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel, index) => {
    if (index === itemIndex) {
      item.iconUrl = iconUrl
    }
  })
  return tempData
}

const updateIconTitleTextItemText = (text: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.text = text
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleFontColor = (titleFontColor: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.titleFontColor = titleFontColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTextFontColor = (textFontColor: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.textFontColor = textFontColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgColor = (bgColor: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.background!.bgColor = bgColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgImageUrl = (bgImageUrl: string, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.background!.bgImageUrl = bgImageUrl
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgType = (bgType: BackgroundSetType, itemIndex: number, tempData: IIconTitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.background!.bgType = bgType
    }
  })
  return tempData
}

const deleteIconTitleTextItem = (itemIndex: number, tempData: IIconTitleTextModel[]) => {
  const newTempData = deepClone(tempData) as IIconTitleTextModel[]
  newTempData.splice(itemIndex, 1)
  return newTempData
}

const updateCurrentTempData = (currentTempData: ITemplateModel<any>, allTempData: ITemplateModel<any>[]) => {
  allTempData.forEach(item => {
    if (item.id === currentTempData.id) {
      item.tempData = currentTempData.tempData
    }
  })
  return allTempData
}

const getType = (obj: any) => {
  //tostring会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)];
}

const deepClone = (data: any) => {
  const type = getType(data)
  let obj: any
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    //不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

/**
 * 渲染模板显示位置
 * @param positionType 位置类型 
 */
const initTemplatePositionStyle = (positionType?: TemplatePositionType): CSSProperties => {
  let bgCss: CSSProperties = {}
  switch (positionType) {
    case TemplatePositionType.Left:
      bgCss.textAlign = 'left'
      break
    case TemplatePositionType.Center:
      bgCss.textAlign = 'center'
      break
    case TemplatePositionType.Right:
      bgCss.textAlign = 'right'
      break
    default:
      bgCss.textAlign = 'left'
      break
  }
  return bgCss
}

/**
 * 渲染H5模板显示位置
 * @param positionType 位置类型
 */
const initMobileTemplatePositionStyle = (positionType?: TemplatePositionType): CSSProperties => {
  let bgCss: CSSProperties = {}
  switch (positionType) {
    case TemplatePositionType.Left:
      bgCss.justifyContent = 'flex-start'
      break
    case TemplatePositionType.Center:
      bgCss.justifyContent = 'center'
      break
    case TemplatePositionType.Right:
      bgCss.justifyContent = 'flex-end'
      break
    default:
      bgCss.justifyContent = 'flex-start'
      break
  }
  return bgCss
}

// 渲染模板背景
const initTempBackground = (background?: IBackgroundSetModel, spacing?: number, isMobile?: boolean): CSSProperties => {
  let bgCss: CSSProperties = {}
  bgCss = initTempSpacing(spacing, isMobile)
  if (!background) return bgCss
  switch (background.bgType) {
    case BackgroundSetType.NoneColor:
      break
    case BackgroundSetType.PureColor:
      bgCss.backgroundColor = background.bgColor
      break
    case BackgroundSetType.BackgroundImage:
      bgCss.background = `url(${background.bgImageUrl}) no-repeat center center`
      bgCss.backgroundSize = 'cover'
      break
  }
  return bgCss
}

// 渲染模板间距
const initTempSpacing = (spacing?: number, isMobile?: boolean) => {
  let bgCss: CSSProperties = {}
  if (spacing === void 0) return bgCss
  if (isMobile) {
    bgCss.padding = `${spacing / 100}rem 0rem`
  } else {
    bgCss.padding = `${spacing}px 0px`
  }
  return bgCss
}

export {
  swapArray,
  zIndexUp,
  zIndexDown,
  getIsShowList,
  insertItemToArray,
  updateIconTitleTextItemShow,
  updateIconTitleTextIconIsShow,
  updateIconTitleTextPositionType,
  initMobileTemplatePositionStyle,
  updateIconTitleTextIconUrl,
  updateIconTitleTextItemTitle,
  updateIconTitleTextItemTitleFontSize,
  updateIconTitleTextItemText,
  updateCurrentTempData,
  deleteIconTitleTextItem,
  updateIconTitleTextItemTitleFontColor,
  updateIconTitleTextItemTextFontColor,
  updateIconTitleTextItemTitleBgColor,
  updateIconTitleTextItemTitleBgImageUrl,
  updateIconTitleTextItemTitleBgType,
  deepClone,
  initTemplatePositionStyle,
  initTempBackground
}