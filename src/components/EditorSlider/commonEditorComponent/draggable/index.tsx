import React, { Component, Fragment } from 'react'
import { IIconTitleTextModel } from '../../../../store/data'

interface IDraggableProps { }

interface IDraggableState { }

class Draggable extends Component<IDraggableProps, IDraggableState> {
  render() {
    return (
      <div className="modification_switchingPosition"></div>
    )
  }

  renderDraggableItem(tempData: IIconTitleTextModel[]): JSX.Element {
    if (tempData.length === 0) return <Fragment></Fragment>

    return <div></div>
  }
}

export default Draggable