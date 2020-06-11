import React, { Fragment } from 'react'
import { ITemplateModel, IPictureTextModel, ITitleTextModel } from '../../store/data'
import MasterTemplate from '../MasterTemplate'
import { TemplateType } from '../../components/EditorContainer/store/state'

import './less'

interface IPictureTextProps {
  pictureTextTempData: ITemplateModel
}

class PictureText extends MasterTemplate<IPictureTextProps> {
  render() {
    const { pictureTextTempData } = this.props

    return (
      <div className="general-items">
        <div className="general-list">
          {
            pictureTextTempData.type === TemplateType.LeftPictureRightText
              ? this.renderLeftPictureRightTextTemp(pictureTextTempData.tempData as IPictureTextModel)
              : this.rnderLeftTextRightPictureTemp(pictureTextTempData.tempData as IPictureTextModel)
          }
        </div>
      </div>
    )
  }

  renderLeftPictureRightTextTemp(tempData: IPictureTextModel): JSX.Element {
    return (
      <Fragment>
        <div className="general-img">
          <img src={tempData.picUrl} alt="" />
        </div>
        <div className="general-txt">
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
      </Fragment>
    )
  }

  rnderLeftTextRightPictureTemp(tempData: IPictureTextModel): JSX.Element {
    return (
      <Fragment>
        <div className="general-txt">
          {this.renderTemplateItem(tempData.titleTextList)}
        </div>
        <div className="general-img">
          <img src={tempData.picUrl} alt="" />
        </div>
      </Fragment>
    )
  }

  renderTemplateItem(tempDataList: ITitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>
    const filterList = this.getIsShowList(tempDataList) as ITitleTextModel[]
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