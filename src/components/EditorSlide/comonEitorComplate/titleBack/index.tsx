import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import './index.less'

interface IEditortitleBack {
  titleArrow: boolean;
  title: string;
  closeEditorSlide: () => void;
}

class TitleBack extends Component<IEditortitleBack> {
  render() {
    const { closeEditorSlide } = this.props

    return (
      <div className="title-back">
        <p><i style={{ display: this.props.titleArrow ? "inline-block" : "none" }}>←</i><i>{this.props.title}</i></p>
        <CloseOutlined style={{ fontSize: 14, marginTop: 2 }} onClick={() => closeEditorSlide()} />
      </div>
    )
  }
}

export default TitleBack