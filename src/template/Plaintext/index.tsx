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
      <div id={tempData.id} className="plaintext_box"
        style={this.initTempBackground(tempData.background)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={() => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
        }}>
        {this.renderMask(maskParams)}
        <div className="general-plaintext"
          dangerouslySetInnerHTML={{ __html: (tempData.tempData as IPlaintextModel).textHtml }}></div>
      </div>
    )
  }
}

export default Plaintext