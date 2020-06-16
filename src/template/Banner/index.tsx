import React, { Fragment } from 'react'
import { IBannerModel, IBannerImageModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { BannerType } from '../../components/EditorContainer/store/state'

import './index.less'

interface IBannerProps extends IMasterTemplateProps { }

interface IBannerState extends IMasterTemplateState { }

class Banner extends MasterTemplate<IBannerProps> {
  render() {
    const {
      activeTempId,
      tempData,
      allTempData,
      changeActiveTempId,
      changeEditorSliderShow,
      changeTempData,
      setTempBackground
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
      tempBackground: tempData.background
    }

    return (
      <div id={tempData.id} className="banner_box"
        style={this.initTempBackground(tempData.background)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={(e) => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
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
        return this.renderSingleImage(tempData.imageData)
      default:
        return <Fragment></Fragment>
    }
  }

  renderSingleImage(imageData: IBannerImageModel): JSX.Element {
    return (
      <img
        src={imageData.imageUrl}
        title={imageData.imageTitle}
        alt={imageData.imageDesc}
      ></img>
    )
  }
}

export default Banner