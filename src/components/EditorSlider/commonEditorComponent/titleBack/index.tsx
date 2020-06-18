import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import './index.less'

interface ITitleBackProps {
  titleArrow: boolean;
  title: string;
  closeEditorSlide: () => void;
  changeTypeIndex?: (index: number) => void;
}

class TitleBack extends Component<ITitleBackProps> {
  render() {
    const { title, closeEditorSlide, changeTypeIndex } = this.props

    return (
      <div className="title-back">
        <p onClick={() => changeTypeIndex!(0)}>
          <i style={{ display: this.props.titleArrow ? "inline-block" : "none", marginRight: 5 }}>←</i>
          <i>{title}</i>
        </p>
        <CloseOutlined style={{ fontSize: 14, marginTop: 2 }} onClick={() => closeEditorSlide()} />
      </div>
    )
  }
}

export default TitleBack