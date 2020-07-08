
import React, { CSSProperties } from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { IShareModel } from '../../store/data'
import { SharePositionType } from '../../components/EditorContainer/store/state'

import './index.less'

interface IShareProps extends IMasterTemplateProps { }

interface IShareState extends IMasterTemplateState { }

class Share extends MasterTemplate<IShareProps> {
  state: IShareState = {
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
        <div className="share_content" style={this.initSharePositionStyle((tempData.tempData as IShareModel).positionType!)}>
          {(tempData.tempData as IShareModel).isTW ? this.renderTWShareTemp() : this.renderMainLandShareTemp()}
        </div>
      </div>
    )
  }

  initSharePositionStyle(positionType: SharePositionType): CSSProperties {
    let bgCss: CSSProperties = {}
    switch (positionType) {
      case SharePositionType.Left:
        bgCss.textAlign = 'left'
        break
      case SharePositionType.Center:
        bgCss.textAlign = 'center'
        break
      case SharePositionType.Right:
        bgCss.textAlign = 'right'
        break
      default:
        bgCss.textAlign = 'right'
        break
    }
    return bgCss
  }

  renderMainLandShareTemp(): JSX.Element {
    const { tempData } = this.props
    return (
      <div className="mainland_share">
        <span className="share">
          <em style={{ color: (tempData.tempData as IShareModel).labelFontColor }}>分享给朋友：</em>
          <i className="qq_div1 weixin bg_i" title="微信" data-bshare='{type:"weixin",url:"fx110.com",title:"111",summary:"111",images:""}'></i>
          <i className="qq_div2 weibo bg_i" title="微博" data-bshare='{type:"weibo",url:"",title:"",summary:"（分享至@FX110）",images:""}'></i>
          <i className="qq_div3 qzone bg_i" title="QQ空间" data-bshare='{type:"qzone",url:"",title:"",summary:"",images:""}'></i>
        </span>
      </div>
    )
  }

  renderTWShareTemp(): JSX.Element {
    const { tempData } = this.props
    return (
      <div className="tw_share">
        <span className="share">
          <em style={{ color: (tempData.tempData as IShareModel).labelFontColor }}>分享連結：</em>
          <i className="qq_div1 line bg_i" title="line" data-bshare='{type:"line",url:"",title:"",summary:"",images:""}'></i>
          <i className="qq_div2 facebook bg_i" title="facebook" data-bshare='{type:"facebook",url:"",title:"",summary:"（分享至@FX110）",images:""}'></i>
          <i className="qq_div3 twitter bg_i" title="twitter" data-bshare='{type:"twitter",url:"",title:"",summary:"",images:""}'></i>
        </span>
      </div>
    )
  }
}

export default Share 