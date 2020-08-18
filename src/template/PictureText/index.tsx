import React, { Fragment, memo } from 'react'
import { IPictureTextModel, IIconTitleTextModel } from '@/store/data'
import MasterTemplate, { IMasterTemplateState, IRenderMaskParams, IMasterTemplateProps } from '../MasterTemplate'
import { TemplateType } from '@/store/state/editor.state'
import { getIsShowList, initTitlePadding, initTitleBackground } from '@/utils'

import './index.less'

interface IPictureTextProps extends IMasterTemplateProps { }

interface IPictureTextState extends IMasterTemplateState { }

const defaultSpacingPercent = 2
const defaultPicWidthPercent = 49

class PictureText extends MasterTemplate<IPictureTextProps> {
  state: IPictureTextState = {
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
      <div id={tempData.id} className="pictureText_box"
        style={this.initTempCss(tempData.background, tempData.topSpacing, tempData.bottomSpacing)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={() => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
          changeAddTemplateSliderShow(false)
          changeEditorSliderTab(0)
        }}
      >
        {this.renderMask(maskParams)}
        <div className="general-items">
          <div className="general-list">
            {
              tempData.type === TemplateType.LeftPictureRightText
                ? this.renderLeftPictureRightTextTemp(tempData.tempData as IPictureTextModel)
                : this.renderLeftTextRightPictureTemp(tempData.tempData as IPictureTextModel)
            }
          </div>
        </div>
      </div>
    )
  }

  renderLeftPictureRightTextTemp(tempData: IPictureTextModel): JSX.Element {
    const { spacingPercent, picWidthPercent } = tempData
    const marginRight = spacingPercent || defaultSpacingPercent
    const picWidth = picWidthPercent || defaultPicWidthPercent
    const txtListWidth = 100 - picWidth - marginRight

    return (
      <Fragment>
        <div className="general-img" style={{ width: `${picWidth}%`, marginRight: `${marginRight}%` }}>
          <img data-viewer={tempData.picUrl} src={tempData.picUrl} alt="" />
        </div>
        <div className="general-txt" style={{ width: `${txtListWidth}%` }}>
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
      </Fragment>
    )
  }

  renderLeftTextRightPictureTemp(tempData: IPictureTextModel): JSX.Element {
    const { spacingPercent, picWidthPercent } = tempData
    const marginRight = spacingPercent || defaultSpacingPercent
    const picWidth = picWidthPercent || defaultPicWidthPercent
    const txtListWidth = 100 - picWidth - marginRight

    return (
      <Fragment>
        <div className="general-txt" style={{ width: `${txtListWidth}%`, marginRight: `${marginRight}%` }}>
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
        <div className="general-img" style={{ width: `${picWidth}%` }}>
          <img data-viewer={tempData.picUrl} src={tempData.picUrl} alt="" />
        </div>
      </Fragment>
    )
  }

  renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>
    const filterList = getIsShowList(tempDataList) as IIconTitleTextModel[]
    return (
      <Fragment>
        {filterList.map((tempData, index) => (
          <Fragment key={index}>
            <h5
              style={{
                fontSize: tempData.titleFontSize,
                color: tempData.titleFontColor,
                padding: initTitlePadding(tempData.background),
                background: initTitleBackground(tempData.background)
              }}
            >{tempData.title}</h5>
            <section
              style={{ color: tempData.textFontColor }}
              dangerouslySetInnerHTML={{ __html: tempData.text }}
            ></section>
          </Fragment>
        ))}
      </Fragment>
    )
  }
}

export default memo(PictureText)