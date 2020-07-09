import React, { Component } from 'react'
import { Modal } from 'antd'
import { SketchPicker, ColorResult } from 'react-color'

interface IFontColorSetProps {
  modalVisible: boolean
  fontColor: string
  handleModalVisible: (flag: boolean) => void
  handleChangeFontColor: (color: string) => void
}

interface IFontColorSetState {
  color?: string
}

class FontColorSet extends Component<IFontColorSetProps, IFontColorSetState> {
  state: IFontColorSetState = {}

  handleOk = () => {
    const { handleChangeFontColor } = this.props
    const { color } = this.state
    handleChangeFontColor(color!)
  }

  changeFontColor = (color: ColorResult) => {
    this.setState({ color: color.hex })
  }

  render() {
    const { modalVisible, fontColor, handleModalVisible } = this.props
    const { color } = this.state

    return (
      <Modal
        title='设置字体颜色'
        visible={modalVisible}
        centered={true}
        getContainer={false}
        destroyOnClose
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={() => handleModalVisible(false)}
      >
        <SketchPicker
          width="100%"
          color={color || fontColor}
          onChange={(color: ColorResult) => this.changeFontColor(color)}
        />
      </Modal>
    )
  }
}

export default FontColorSet