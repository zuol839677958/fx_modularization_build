import React, { Fragment } from 'react'
import { IPictureTextModel, ITitleTextModel, IBackgroundSetModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateState, IRenderMaskParams, IMasterTemplateProps } from '../MasterTemplate'
import { TemplateType } from '../../components/EditorContainer/store/state'
import { getIsShowList } from '../../utils/utils'
import { BackgroundSetType } from '../../components/BackgroundSet/store/state'

import './index.less'

interface IPictureTextProps extends IMasterTemplateProps { }

interface IPictureTextState extends IMasterTemplateState { }

const defaultSpacingPercent = 2

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
      <div id={tempData.id} className="pictureText_box"
        style={this.initTempBackground(tempData.background, tempData.spacing)}
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
    const { spacingPercent } = tempData
    const marginRight = `${spacingPercent}%` || `${defaultSpacingPercent}%`
    const width = `${(100 - (spacingPercent || defaultSpacingPercent)) / 2}%`

    return (
      <Fragment>
        <div className="general-img" style={{ width, marginRight }}>
          <img data-viewer={tempData.picUrl} src={tempData.picUrl} alt="" />
        </div>
        <div className="general-txt" style={{ width }}>
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
      </Fragment>
    )
  }

  renderLeftTextRightPictureTemp(tempData: IPictureTextModel): JSX.Element {
    const { spacingPercent } = tempData
    const marginRight = `${spacingPercent}%` || `${defaultSpacingPercent}%`
    const width = `${(100 - (spacingPercent || defaultSpacingPercent)) / 2}%`

    return (
      <Fragment>
        <div className="general-txt" style={{ width, marginRight }}>
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
        <div className="general-img" style={{ width }}>
          <img data-viewer={tempData.picUrl} src={tempData.picUrl} alt="" />
        </div>
      </Fragment>
    )
  }

  renderTemplateItem(tempDataList: ITitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>
    const filterList = getIsShowList(tempDataList) as ITitleTextModel[]
    return (
      <Fragment>
        {filterList.map(tempData => (
          <Fragment key={tempData.sort}>
            <h5
              style={{ color: tempData.titleFontColor, padding: this.initTitlePadding(tempData.background), background: this.initTitleBackground(tempData.background) }}
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

  initTitleBackground(backgroundSet?: IBackgroundSetModel) {
    if (!backgroundSet) return ''
    switch (backgroundSet.bgType) {
      case BackgroundSetType.NoneColor:
        return 'none'
      case BackgroundSetType.PureColor:
        return backgroundSet.bgColor
      case BackgroundSetType.BackgroundImage:
        return `url(${backgroundSet.bgImageUrl}) center center / cover no-repeat`
      default:
        return ''
    }
  }

  initTitlePadding(backgroundSet?: IBackgroundSetModel) {
    if (backgroundSet?.bgType === BackgroundSetType.NoneColor) return '0px'
  }
}

export default PictureText