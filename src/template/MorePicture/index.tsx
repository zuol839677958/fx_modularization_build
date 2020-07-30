import React, { Fragment } from 'react'
import MasterTemplate, { IMasterTemplateState, IRenderMaskParams, IMasterTemplateProps } from '../MasterTemplate'
import { IMorePictureModel } from '../../store/data'

import './index.less'

interface IMorePictureProps extends IMasterTemplateProps { }

interface IMorePictureState extends IMasterTemplateState { }

class MorePicture extends MasterTemplate<IMorePictureProps> {
  state: IMorePictureState = {
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
      <div id={tempData.id} className="MorePicture_box"
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
        <div className="more_pic_box">
          {this.renderMorePicList(tempData.tempData as IMorePictureModel[])}
        </div>
      </div>
    )
  }
  renderMorePicList = (tempDataList: IMorePictureModel[]): JSX.Element => {
    return (
      <Fragment>
        {
          tempDataList.map((item, index) => (
            <div key={index} className={index === 0 ? "first_img" : ""}>
              <img data-viewer={item.picUrl} src={item.picUrl} alt="" />
            </div>
          ))
        }
      </Fragment>
    )
  }
}

export default MorePicture