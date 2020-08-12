import React, { Fragment } from 'react'
import { IBannerModel, IBannerImageModel, IBannerVideoModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { BannerType } from '../../components/web/EditorContainer/store/state'

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
        style={this.initTempCss(tempData.background, tempData.topSpacing, tempData.bottomSpacing)}
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
        <div className={`banner-container ${(tempData.tempData as IBannerModel).isFull ? 'isFull' : ''}`}>
          {this.renderBannerTemplate(tempData.tempData as IBannerModel)}
        </div>
      </div>
    )
  }

  renderBannerTemplate(tempData: IBannerModel): JSX.Element {
    switch (tempData.bannerType) {
      case BannerType.SingleImage:
        return this.renderSingleImage(tempData.imageData, tempData.widthPercent)
      case BannerType.Swiper:
        return this.renderSwiper()
      case BannerType.Video:
        return this.renderVideo(tempData.videoData, tempData.widthPercent)
      default:
        return <Fragment></Fragment>
    }
  }

  // 渲染单图Banner
  renderSingleImage(imageData: IBannerImageModel, widthPercent?: number): JSX.Element {
    const { tempData } = this.props

    return (
      <img
        style={{ width: `${widthPercent || 100}%` }}
        data-viewer={(tempData.tempData as IBannerModel).isFull ? '' : imageData.imageUrl}
        src={imageData.imageUrl}
        title={imageData.imageTitle}
        alt={imageData.imageDesc}
      ></img>
    )
  }

  // 渲染轮播图Banner
  renderSwiper() {
    return (
      <div></div>
    )
  }

  // 渲染视频Banner
  renderVideo(videoData?: IBannerVideoModel, widthPercent?: number) {
    return (
      <video
        style={{ width: `${widthPercent || 100}%` }}
        controls
        poster={videoData?.poster}
        src={videoData?.videoSrc}
      />
    )
  }
}

export default Banner