import React, { Component } from 'react'
import _ from 'lodash'

export interface IMasterTemplateProps { }

export interface IMasterTemplateState { }

class MasterTemplate<P, S = {}> extends Component<P, S> {
  renderMask() {
    return <div></div>
  }

  getIsShowList(dataList: { isShow: boolean, sort: number, [key: string]: any }[]) {
    if (dataList.length === 0) return
    const filterList = _.filter(dataList, item => item.isShow)
    const sortList = _.sortBy(filterList, item => item.sort)
    return sortList
  }

  getResetSortList(dataList: { sort: number }[]) {
    if (dataList.length === 0) return
    const resetDataList = dataList.map((item, index) => (
      item.sort = index + 1
    ))
    return resetDataList
  }
}

export default MasterTemplate