import React, { PureComponent, Fragment } from 'react'
import { SketchPicker, ColorResult } from 'react-color'
import { Modal, Radio, Button } from 'antd';
import { IBackgroundSetModel, IPageState, IPageModel, ITemplateModel } from '../../store/data'
import { BackgroundSetType } from './store/state'
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { changeBackgroundSetData } from './store/actions'
import { changePageBackground, changeTempData } from '../EditorContainer/store/actions'
import { changeMobilePageBackground, changeMobileTempData } from '../EditorContainerMobile/store/actions'

import AliyunOSSUpload from '../AliyunOSSUpload'

interface IBackgroundSetProps {
  isMobile?: boolean
  backgroundSetData?: IBackgroundSetModel
  pageData?: IPageModel
  mobilePageData?: IPageModel
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changePageBackground?: (background: IBackgroundSetModel) => void
  changeMobilePageBackground?: (background: IBackgroundSetModel) => void
  changeTempData?: (tempData: ITemplateModel<any>[]) => void
  changeMobileTempData?: (tempData: ITemplateModel<any>[]) => void
}

interface IBackgroundSetState {
  bgType?: BackgroundSetType
  bgColor?: string
  bgImageUrl?: string
}

class BackgroundSet extends PureComponent<IBackgroundSetProps, IBackgroundSetState> {
  state: IBackgroundSetState = {}

  handleOk = async () => {
    const {
      isMobile,
      backgroundSetData,
      pageData,
      mobilePageData,
      changePageBackground,
      changeMobilePageBackground,
      changeTempData,
      changeMobileTempData
    } = this.props
    const { bgType, bgColor, bgImageUrl } = this.state
    if (!backgroundSetData?.tempId) {
      if (isMobile) {
        await changeMobilePageBackground!({
          bgType: bgType || pageData?.background?.bgType || BackgroundSetType.NoneColor,
          bgColor,
          bgImageUrl
        })
      } else {
        await changePageBackground!({
          bgType: bgType || pageData?.background?.bgType || BackgroundSetType.NoneColor,
          bgColor,
          bgImageUrl
        })
      }
      this.handleCancel()
    } else {
      if (isMobile) {
        const allMobileTempData = mobilePageData!.allTempData
        allMobileTempData.forEach(item => {
          if (item.id === backgroundSetData!.tempId) {
            item.background = {
              bgType: bgType || item.background?.bgType || BackgroundSetType.NoneColor,
              bgColor,
              bgImageUrl
            }
          }
        })
        await changeMobileTempData!(allMobileTempData)
      } else {
        const allTempData = pageData!.allTempData
        allTempData.forEach(item => {
          if (item.id === backgroundSetData!.tempId) {
            item.background = {
              bgType: bgType || item.background?.bgType || BackgroundSetType.NoneColor,
              bgColor,
              bgImageUrl
            }
          }
        })
        await changeTempData!(allTempData)
      }
      this.handleCancel()
    }
  }

  handleCancel = async () => {
    const { backgroundSetData, changeBackgroundSetData } = this.props
    backgroundSetData!.isShow = false
    await changeBackgroundSetData!(backgroundSetData!)
    this.setState({
      bgType: undefined,
      bgColor: '',
      bgImageUrl: ''
    })
  }

  selectBgType = (value: BackgroundSetType) => {
    this.setState({ bgType: value })
  }

  changeBgColor = (color: ColorResult) => {
    this.setState({ bgColor: color.hex })
  }

  // 还原成模板默认颜色
  changeOriginalBgColor = () => {
    const { pageData } = this.props
    this.setState({ bgColor: pageData?.background?.bgColor })
  }

  render() {
    const { backgroundSetData } = this.props
    const { bgType } = this.state

    return (
      <Modal
        title={backgroundSetData?.tempId ? '设置模块背景' : '设置网页背景'}
        centered={true}
        getContainer={false}
        visible={backgroundSetData?.isShow}
        destroyOnClose
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Radio.Group
          value={bgType || backgroundSetData?.bgType || BackgroundSetType.NoneColor}
          onChange={(e) => this.selectBgType(e.target.value)}
        >
          <Radio value={BackgroundSetType.NoneColor}>无</Radio>
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
      case BackgroundSetType.BackgroundImage:
        return this.renderImageUpload()
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
          width="95%"
          color={bgColor || backgroundSetData?.bgColor}
          onChange={this.changeBgColor}
        />
        {backgroundSetData?.tempId ?
          <Button style={{ marginTop: 10 }} type="primary" onClick={this.changeOriginalBgColor}>还原</Button>
          : null}
      </div>
    )
  }

  renderImageUpload() {
    const { backgroundSetData } = this.props

    return (
      <div style={{ marginTop: 20 }}>
        <AliyunOSSUpload
          preImageUrl={backgroundSetData?.bgImageUrl}
          handleUploadImageChange={bgImageUrl => {
            this.setState({ bgImageUrl })
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IBackgroundSetProps) => ({
  backgroundSetData: state.backgroundSetReducer,
  pageData: state.editorContainerReducer,
  mobilePageData: state.editorContainerMobileReducer
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  async changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    await dispatch(changeBackgroundSetData(backgroundSet))
  },
  async changePageBackground(background: IBackgroundSetModel) {
    await dispatch(changePageBackground(background))
  },
  async changeMobilePageBackground(background: IBackgroundSetModel) {
    await dispatch(changeMobilePageBackground(background))
  },
  async changeTempData(allTempData: ITemplateModel<any>[]) {
    await dispatch(changeTempData(allTempData))
  },
  async changeMobileTempData(allTempData: ITemplateModel<any>[]) {
    await dispatch(changeMobileTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSet)