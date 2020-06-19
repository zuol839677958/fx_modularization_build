import React, { Component, Fragment } from 'react'
import { IIconTitleTextModel } from '../../../../store/data'
import { Checkbox } from 'antd'

interface IDraggableProps { }

interface IDraggableState { }

let dragStartSort = 0
let dragEndIndex = 0
let dragLiHeight = 0

class Draggable extends Component<IDraggableProps, IDraggableState> {
  render() {
    return (
      <div className="modification_switchingPosition"></div>
    )
  }

  renderDraggableItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>

    return (
      <ul
        onDrop={() => this.handleDrop()}
        onDragOver={(e) => this.handleDragOver(e)}>
        {
          tempDataList.map(tempData => (
            <li key={tempData.sort} draggable={true}
              onDragStart={(e) => {
                dragStartSort = tempData.sort
                dragLiHeight = e.currentTarget.offsetHeight
              }}
            >
              <div>
                <i className="iconfont">&#xE011;</i>
                <span>{tempData.title}</span>
                <div className="right">
                  <i className="iconfont amend" onClick={() => this.handleEditItem(tempData)}>&#xE00C;</i>
                  <i className="iconfont recycle" onClick={() => this.handleDeleteItem(tempData.sort)}>&#xE009;</i>
                </div>
              </div>
              <Checkbox checked={tempData.isShow} onChange={(e) => this.handleIsShowItem(e.target.checked, tempData.sort)} />
            </li>
          ))
        }
      </ul>
    )
  }

  handleEditItem(tempData: IIconTitleTextModel) {

  }

  handleDeleteItem(sort: number) {

  }

  handleIsShowItem(checked: boolean, sort: number) {

  }

  handleDragOver(e: React.DragEvent<HTMLUListElement>) {
    // const { data } = this.props
    // e.preventDefault()
    // const { clientY } = e
    // const dragUlHeight = (data.tempData as IIconTitleTextModel[]).length * dragLiHeight
    // dragEndIndex = Math.round((clientY - dragUlHeight) / dragLiHeight)
  }

  handleDrop() {
    // const { data, allTempData, changeTempData } = this.props
    // swapArray(data.tempData as IIconTitleTextModel[], dragStartSort - 1, dragEndIndex)
    // updateCurrentTempData(data, allTempData!)
    // changeTempData!(allTempData!)
  }
}

export default Draggable