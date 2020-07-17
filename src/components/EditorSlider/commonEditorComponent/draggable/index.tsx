import React, { Component, Fragment } from 'react'
import { Checkbox } from 'antd'

import './index.less'

export interface IDraggableData {
  sort: number
  title: string
  isShow: boolean
  [key: string]: any
}

interface IDraggableProps {
  data: IDraggableData[]
  handleEditItem?: (itemData: IDraggableData) => void
  handleCopyItem?: (itemData: IDraggableData, itemIndex: number) => void
  handleDeleteItem?: (itemSort: number) => void
  handleIsShowItem?: (checked: boolean, itemSort: number) => void
  handleDraggableItemChange?: (dragItemStartIndex: number, dragItemEndIndex: number) => void
}

let dragItemStartIndex = 0
let dragItemEndIndex = 0

class Draggable extends Component<IDraggableProps> {
  render() {
    const { data } = this.props

    return (
      <div className="modification_switchingPosition">
        {this.renderDraggableItem(data)}
      </div>
    )
  }

  renderDraggableItem(draggableDataList: IDraggableData[]): JSX.Element {
    if (draggableDataList.length === 0) return <Fragment></Fragment>

    return (
      <ul
        onDrop={() => this.handleDrop()}
        onDragOver={(e) => this.handleDragOver(e)}>
        {
          draggableDataList.map((draggableData, index: number) => (
            <li key={draggableData.sort} draggable={true}
              onDragStart={() => {
                dragItemStartIndex = index
              }}
              onDragEnter={() => {
                dragItemEndIndex = index
              }}
            >
              <div>
                <i className="iconfont">&#xE011;</i>
                <span>{draggableData.title}</span>
                <div className="right">
                  <i className="iconfont amend" onClick={() => this.handleEditItem(draggableData)}>&#xE00C;</i>
                  <i className="iconfont copy" onClick={() => this.handleCopyItem(draggableData, index)}>&#xE022;</i>
                  <i className="iconfont recycle" onClick={() => this.handleDeleteItem(draggableData.sort)}>&#xE009;</i>
                </div>
              </div>
              <Checkbox checked={draggableData.isShow} onChange={(e) => this.handleIsShowItem(e.target.checked, draggableData.sort)} />
            </li>
          ))
        }
      </ul>
    )
  }

  handleEditItem(itemData: IDraggableData) {
    const { handleEditItem } = this.props
    handleEditItem!(itemData)
  }

  handleCopyItem(itemData: IDraggableData, itemIndex: number) {
    const { handleCopyItem } = this.props
    handleCopyItem!(itemData, itemIndex)
  }

  handleDeleteItem(itemSort: number) {
    const { handleDeleteItem } = this.props
    handleDeleteItem!(itemSort)
  }

  handleIsShowItem(checked: boolean, itemSort: number) {
    const { handleIsShowItem } = this.props
    handleIsShowItem!(checked, itemSort)
  }

  handleDragOver(e: React.DragEvent<HTMLUListElement>) {
    e.preventDefault()
  }

  handleDrop() {
    const { handleDraggableItemChange } = this.props
    handleDraggableItemChange!(dragItemStartIndex, dragItemEndIndex)
  }
}

export default Draggable