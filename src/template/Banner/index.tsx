import React, { Fragment } from 'react'
import { IBannerModel, IBannerImageModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { BannerType } from '../../components/EditorContainer/store/state'

import './index.less'

interface IBannerProps extends IMasterTemplateProps { }

interface IBannerState extends IMasterTemplateState { }

class Banner extends MasterTemplate<IBannerProps> {
  state: IBannerState = {
    isShowMask: false
  }

  render() {
    const {
      activeTempId,
      tempData,
      allTempData,
      changeActiveTempId,
      changeEditorSliderShow,
      changeTempData,
      setTempBackground,
      changeAddTemplateSliderShow,
      changeEditorSliderTab
    } = this.props
    const maskParams: IRenderMaskParams = {
      tempId: tempData.id,
      activeTempId,
      tempSort: tempData.sort,
      allTempData,
      changeActiveTempId,
      changeEditorSliderShow,
      changeTempData,
      setTempBackground,
      tempBackground: tempData.background,
      changeAddTemplateSliderShow,
      changeEditorSliderTab
    }

    return (
      <div id={tempData.id}
        className="banner_box"
        style={this.initTempBackground(tempData.background, tempData.spacing)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={(e) => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
          changeAddTemplateSliderShow(false)
          changeEditorSliderTab(0)
        }}
      >
        {this.renderMask(maskParams)}
        {this.renderBannerTemplate(tempData.tempData as IBannerModel)}
      </div>
    )
  }

  renderBannerTemplate(tempData: IBannerModel): JSX.Element {
    switch (tempData.bannerType) {
      case BannerType.SingleImage:
        return this.renderSingleImage(tempData.imageData, tempData.widthPercent)
      default:
        return <Fragment></Fragment>
    }
  }

  renderSingleImage(imageData: IBannerImageModel, widthPercent?: number): JSX.Element {
    const { tempData } = this.props

    return (
      <div className={`img-box ${(tempData.tempData as IBannerModel).isFull ? 'isFull' : ''}`}>
        <img
          style={{ width: `${widthPercent || 100}%` }}
          data-viewer={(tempData.tempData as IBannerModel).isFull ? '' : imageData.imageUrl}
          src={imageData.imageUrl}
          title={imageData.imageTitle}
          alt={imageData.imageDesc}
        ></img>
      </div>
    )
  }
}

export default Banner