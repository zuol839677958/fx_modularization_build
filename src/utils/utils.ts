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
const swapArray = (arr: any[], index1: number, index2: number) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  arr?.forEach((item: { sort: number }, index: number) => {
    item.sort = index + 1
  })
}

//上移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
const zIndexUp = (arr: any[], index: number) => {
  if (index !== 0) swapArray(arr, index, index - 1)
}

//下移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
const zIndexDown = (arr: any[], index: number, length: number) => {
  if (index + 1 !== length) swapArray(arr, index, index + 1)
}

//置顶，即将当前元素移到数组的最后一位
const zIndexTop = (arr: any[], index: number, length: number) => {
  if (index + 1 !== length) {
    //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
    const moveNum = length - 1 - index
    //循环出需要一个一个上移的次数
    for (let i = 0; i < moveNum; i++) {
      swapArray(arr, index, index + 1)
      index++
    }
  }
}

//置底，即将当前元素移到数组的第一位
const zIndexBottom = (arr: any[], index: number) => {
  if (index !== 0) {
    //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
    const moveNum = index - 0
    //循环出需要一个一个上移的次数
    for (let i = 0; i < moveNum; i++) {
      swapArray(arr, index, index - 1)
      index--
    }
  }
}

const getIsShowList = (dataList: { isShow: boolean, sort: number, id?: string, type?: number, [key: string]: any }[]) => {
  if (dataList.length === 0) return
  const filterList = _.filter(dataList, item => item.isShow)
  const sortList = _.sortBy(filterList, item => item.sort)
  return sortList
}

const getResetSortList = (dataList: { sort: number }[]) => {
  if (dataList.length === 0) return
  dataList.forEach((item, index) => (
    item.sort = index + 1
  ))
}

const insertItemToArray = (arr: any[], index: number, item: any) => {
  arr.splice(index, 0, item)
  getResetSortList(arr)
}

const updateIconTitleTextItemShow = (isShow: boolean, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.isShow = isShow
    }
  })
  return tempData
}

const updateIconTitleTextItemTitle = (title: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.title = title
    }
  })
  return tempData
}

const updateIconTitleTextIconIsShow = (hasIcon: boolean, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel) => {
    if (item.sort === sort) {
      item.hasIcon = hasIcon
    }
  })
  return tempData
}

const updateIconTitleTextIconUrl = (iconUrl: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach((item: IIconTitleTextModel) => {
    if (item.sort === sort) {
      item.iconUrl = iconUrl
    }
  })
  return tempData
}

const updateIconTitleTextItemText = (text: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.text = text
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleFontColor = (titleFontColor: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.titleFontColor = titleFontColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTextFontColor = (textFontColor: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.textFontColor = textFontColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgColor = (bgColor: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.background!.bgColor = bgColor
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgImageUrl = (bgImageUrl: string, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.background!.bgImageUrl = bgImageUrl
    }
  })
  return tempData
}

const updateIconTitleTextItemTitleBgType = (bgType: BackgroundSetType, sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  tempData.forEach(item => {
    if (item.sort === sort) {
      item.background!.bgType = bgType
    }
  })
  return tempData
}

const deleteIconTitleTextItem = (sort: number, tempData: IIconTitleTextModel[] | ITitleTextModel[]) => {
  return tempData.filter(item => item.sort !== sort)
}

const updateCurrentTempData = (currentTempData: ITemplateModel, allTempData: ITemplateModel[]) => {
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
  zIndexTop,
  zIndexBottom,
  getIsShowList,
  getResetSortList,
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