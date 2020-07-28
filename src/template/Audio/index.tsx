

import React , { CSSProperties } from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { AudioPositionType } from '../../components/EditorContainer/store/state'

import './index.less'
import { IAudioModel } from '../../store/data'

interface IAudioProps extends IMasterTemplateProps { }

interface IAudioState extends IMasterTemplateState {
  audioUrl?: string
  isShowMask:boolean
}

class Audio extends MasterTemplate<IAudioProps> {
  state: IAudioState = {
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
        className="share_box"
        style={this.initTempBackground(tempData.background, tempData.spacing)}
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
        <div className="share_content">
            <div className="audio_box_c">
                <div className ="audioBox" style={this.initSharePositionStyle((tempData.tempData as IAudioModel).positionType!)}>
                    <audio className="audio-js" controls preload="auto" src={tempData.tempData.audioUrl}>" /&gt;</audio>
                </div>
            </div>
        </div>
      </div>
    )
  }
  initSharePositionStyle(positionType: AudioPositionType): CSSProperties {
    let bgCss: CSSProperties = {}
    switch (positionType) {
      case AudioPositionType.Left:
        bgCss.textAlign = 'left'
        break
      case AudioPositionType.Center:
        bgCss.textAlign = 'center'
        break
      case AudioPositionType.Right:
        bgCss.textAlign = 'right'
        break
      default:
        bgCss.textAlign = 'center'
        break
    }
    return bgCss
  }



 
}

export default Audio 