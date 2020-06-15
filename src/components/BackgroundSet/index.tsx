import React, { Component, Fragment } from 'react'
import { SketchPicker, ColorResult } from 'react-color'
import { Modal, Radio } from 'antd';
import { IBackgroundSetModel, IPageState, IPageModel } from '../../store/data';
import { BackgroundSetType } from './store/state';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { changeBackgroundSetData } from './store/actions'
import { changePageBackground } from '../EditorContainer/store/actions';

interface IBackgroundSetProps {
  backgroundSetData?: IBackgroundSetModel
  pageData?: IPageModel
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changePageBackground?: (background: IBackgroundSetModel) => void
}

interface IBackgroundSetState {
  bgType?: BackgroundSetType
  bgColor?: string
}

class BackgroundSet extends Component<IBackgroundSetProps, IBackgroundSetState> {
  state: IBackgroundSetState = {}

  handleOk = () => {
    const { backgroundSetData, changePageBackground } = this.props
    if (!backgroundSetData?.tempId) changePageBackground!({ ...this.state })
    this.handleCancel()
  }

  handleCancel = () => {
    let { backgroundSetData, changeBackgroundSetData } = this.props
    backgroundSetData!.isShow = false
    changeBackgroundSetData!(backgroundSetData!)
  }

  selectBgType = (value: BackgroundSetType) => {
    this.setState({ bgType: value })
  }

  changeBgColor = (color: ColorResult) => {
    this.setState({ bgColor: color.hex })
  }

  render() {
    const { backgroundSetData } = this.props
    const { bgType } = this.state

    return (
      <Modal
        title="设置背景"
        visible={backgroundSetData?.isShow}
        destroyOnClose
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Radio.Group value={bgType || backgroundSetData?.bgType} onChange={(e) => this.selectBgType(e.target.value)}>
          <Radio value={BackgroundSetType.NoneColor}>无色</Radio>
          <Radio value={BackgroundSetType.PureColor}>纯色</Radio>
          <Radio value={BackgroundSetType.BackgroundImage}>背景图</Radio>
        </Radio.Group>
        {this.renderBackgroundSetTemp(bgType || backgroundSetData?.bgType)}
      </Modal>
    )
  }

  renderBackgroundSetTemp(bgType?: BackgroundSetType) {
    switch (bgType) {
      case BackgroundSetType.PureColor:
        return this.renderSketchPicker()
      case BackgroundSetType.NoneColor:
      default:
        return <Fragment></Fragment>
    }
  }

  renderSketchPicker() {
    const { backgroundSetData } = this.props
    const { bgColor } = this.state

    return (
      <div style={{ marginTop: 20 }}>
        <SketchPicker
          width="100%"
          color={bgColor || backgroundSetData?.bgColor}
          onChange={(color: ColorResult) => this.changeBgColor(color)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IBackgroundSetProps) => ({
  backgroundSetData: state.backgroundSetReducer,
  pageData: state.editorContainerReducer
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  },
  changePageBackground(background: IBackgroundSetModel) {
    dispatch(changePageBackground(background))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSet)