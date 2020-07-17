import React, { Component, Fragment } from 'react'
import { Checkbox } from 'antd'

import './index.less'

export interface IDraggableData {
  title: string
  isShow: boolean
  [key: string]: any
}

interface IDraggableProps {
  data: IDraggableData[]
  handleEditItem?: (itemData: IDraggableData, itemIndex: number) => void
  handleCopyItem?: (itemData: IDraggableData, itemIndex: number) => void
  handleDeleteItem?: (itemIndex: number) => void
  handleIsShowItem?: (checked: boolean, itemIndex: number) => void
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
            <li key={index} draggable={true}
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
                  <i className="iconfont amend" onClick={() => this.handleEditItem(draggableData, index)}>&#xE00C;</i>
                  <i className="iconfont copy" onClick={() => this.handleCopyItem(draggableData, index)}>&#xE022;</i>
                  <i className="iconfont recycle" onClick={() => this.handleDeleteItem(index)}>&#xE009;</i>
                </div>
              </div>
              <Checkbox checked={draggableData.isShow} onChange={(e) => this.handleIsShowItem(e.target.checked, index)} />
            </li>
          ))
        }
      </ul>
    )
  }

  handleEditItem(itemData: IDraggableData, itemIndex: number) {
    const { handleEditItem } = this.props
    handleEditItem!(itemData, itemIndex)
  }

  handleCopyItem(itemData: IDraggableData, itemIndex: number) {
    const { handleCopyItem } = this.props
    handleCopyItem!(itemData, itemIndex)
  }

  handleDeleteItem(itemIndex: number) {
    const { handleDeleteItem } = this.props
    handleDeleteItem!(itemIndex)
  }

  handleIsShowItem(checked: boolean, itemIndex: number) {
    const { handleIsShowItem } = this.props
    handleIsShowItem!(checked, itemIndex)
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