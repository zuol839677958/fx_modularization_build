import _ from 'lodash'
import { ITemplateModel, IIconTitleTextModel, ITitleTextModel } from '../store/data'
import { BackgroundSetType } from '../components/BackgroundSet/store/state'

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
}

//下移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
const zIndexDown = (arr: any[], index: number, length: number, hasType?: boolean) => {
  if (index + 1 !== length) return swapArray(arr, index, index + 1, hasType)
}

const getIsShowList = (dataList: { isShow: boolean }[]) => {
  if (dataList.length === 0) return
  return _.filter(dataList, item => item.isShow)
}

const insertItemToArray = (arr: any[], index: number, item: any) => {
  arr.splice(index, 0, item)
}

const updateIconTitleTextItemShow = (isShow: boolean, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.isShow = isShow
    }
  })
  return tempData
}

const updateIconTitleTextItemTitle = (title: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.title = title
    }
  })
  return tempData
}

const updateIconTitleTextIconIsShow = (hasIcon: boolean, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel, index) => {
    if (index === itemIndex) {
      item.hasIcon = hasIcon
    }
  })
  return tempData
}

const updateIconTitleTextIconUrl = (iconUrl: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel, index) => {
    if (index === itemIndex) {
      item.iconUrl = iconUrl
    }
  })
  return tempData
}

const updateIconTitleTextItemText = (text: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.text = text
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleFontColor = (titleFontColor: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.titleFontColor = titleFontColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTextFontColor = (textFontColor: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.textFontColor = textFontColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgColor = (bgColor: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.background!.bgColor = bgColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgImageUrl = (bgImageUrl: string, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.background!.bgImageUrl = bgImageUrl
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgType = (bgType: BackgroundSetType, itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item, index) => {
    if (index === itemIndex) {
      item.background!.bgType = bgType
    }
  })
  return tempData
}

const deleteIconTitleTextItem = (itemIndex: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
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

export {
  swapArray,
  zIndexUp,
  zIndexDown,
  getIsShowList,
  insertItemToArray,
  updateIconTitleTextItemShow,
  updateIconTitleTextIconIsShow,
  updateIconTitleTextIconUrl,
  updateIconTitleTextItemTitle,
  updateIconTitleTextItemText,
  updateCurrentTempData,
  deleteIconTitleTextItem,
  updateIconTitleTextItemTitleFontColor,
  updateIconTitleTextItemTextFontColor,
  updateIconTitleTextItemTitleBgColor,
  updateIconTitleTextItemTitleBgImageUrl,
  updateIconTitleTextItemTitleBgType,
  deepClone
}