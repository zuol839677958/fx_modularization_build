
import React, { Fragment } from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { ICorrelationSpecialModel } from '../../store/data'

import './index.less'

interface IShareProps extends IMasterTemplateProps { }

interface ICorrelationSpecialState extends IMasterTemplateState { }

class Share extends MasterTemplate<IShareProps> {
  state: ICorrelationSpecialState = {
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
      changeAddTemplateSliderShow
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
      changeAddTemplateSliderShow
    }

    return (
      <div id={tempData.id}
        className={`share_box`}
        style={this.initTempBackground(tempData.background)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={(e) => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
          changeAddTemplateSliderShow(false)
        }}
      >
        {this.renderMask(maskParams)}
        {/* {this.renderShareTmp(tempData.tempData as ICorrelationSpecialModel[])} */}
        1111
      </div>
    )
  }

  renderShareTmp(): JSX.Element {
    return (
      <Fragment>
        
      </Fragment>
    )
  }
}

export default Share 