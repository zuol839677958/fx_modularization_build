import React, { Fragment } from 'react'
import { ITemplateModel, IPictureTextModel, ITitleTextModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { TemplateType } from '../../components/EditorContainer/store/state'
import { getIsShowList } from '../../utils/utils'

import './index.less'

interface IPictureTextProps {
  activeTempId: string
  allTempData: ITemplateModel[]
  pictureTextTempData: ITemplateModel
  changeActiveTempId: (activeTempId: string) => void
  showEditorSlider: () => void
  changeTempData: (allTempData: ITemplateModel[]) => void
}

interface IPictureTextState extends IMasterTemplateState { }

const defaultSpacingPercent = 2

class PictureText extends MasterTemplate<IPictureTextProps> {
  state: IPictureTextState = {
    isShowMask: false
  }

  render() {
    const {
      activeTempId,
      pictureTextTempData,
      allTempData,
      changeActiveTempId,
      showEditorSlider,
      changeTempData
    } = this.props
    const maskParams: IRenderMaskParams = {
      tempId: pictureTextTempData.id,
      activeTempId,
      tempSort: pictureTextTempData.sort,
      allTempData,
      changeActiveTempId,
      showEditorSlider,
      changeTempData
    }

    return (
      <div id={pictureTextTempData.id} className="pictureText_box"
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={() => {
          changeActiveTempId(pictureTextTempData.id)
          showEditorSlider()
        }}
      >
        {this.renderMask(maskParams)}
        <div className="general-items">
          <div className="general-list">
            {
              pictureTextTempData.type === TemplateType.LeftPictureRightText
                ? this.renderLeftPictureRightTextTemp(pictureTextTempData.tempData as IPictureTextModel)
                : this.rnderLeftTextRightPictureTemp(pictureTextTempData.tempData as IPictureTextModel)
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
          <img src={tempData.picUrl} alt="" />
        </div>
        <div className="general-txt" style={{ width }}>
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
      </Fragment>
    )
  }

  rnderLeftTextRightPictureTemp(tempData: IPictureTextModel): JSX.Element {
    const { spacingPercent } = tempData
    const marginRight = `${spacingPercent}%` || `${defaultSpacingPercent}%`
    const width = `${(100 - (spacingPercent || defaultSpacingPercent)) / 2}%`

    return (
      <Fragment>
        <div className="general-txt" style={{ width, marginRight }}>
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
        <div className="general-img" style={{ width }}>
          <img src={tempData.picUrl} alt="" />
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
            <h5>{tempData.title}</h5>
            <p>{tempData.text}</p>
          </Fragment>
        ))}
      </Fragment>
    )
  }
}

export default PictureText