import React from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { IPlaintextModel } from '../../store/data'

import './index.less'

interface IPlaintextProps extends IMasterTemplateProps { }

interface IPlaintextState extends IMasterTemplateState { }

class Plaintext extends MasterTemplate<IPlaintextProps> {
  state: IPlaintextState = {
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
      <div id={tempData.id} className="plaintext_box"
        style={this.initTempCss(tempData.background, tempData.spacing)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={() => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
          changeAddTemplateSliderShow(false)
          changeEditorSliderTab(0)
        }}>
        {this.renderMask(maskParams)}
        <div className="general-plaintext"
          style={{ color: (tempData.tempData as IPlaintextModel).fontColor }}
          dangerouslySetInnerHTML={{ __html: (tempData.tempData as IPlaintextModel).textHtml }}></div>
      </div>
    )
  }
}

export default Plaintext