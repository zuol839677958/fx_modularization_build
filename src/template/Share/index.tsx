
import React, { CSSProperties, memo } from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { IShareModel } from '@/store/data'
import { TemplatePositionType } from '@/store/state/editor.state'
import { getSpeicalData } from '@/axios/api'
import { RouteComponentProps } from 'react-router-dom'
import { getSepecialLinkUrl } from '@/axios/env'
import { initTemplatePositionStyle } from '@/utils'

import './index.less'

interface IShareProps extends RouteComponentProps, IMasterTemplateProps { }

interface IShareState extends IMasterTemplateState {
  shareTitle: string
  shareSummary: string
  shareUrl: string
}

class Share extends MasterTemplate<IShareProps> {
  state: IShareState = {
    isShowMask: false,
    shareTitle: '',
    shareSummary: '',
    shareUrl: ''
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
        style={this.initTempCss(tempData.background, tempData.topSpacing, tempData.bottomSpacing)}
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

  componentDidMount() {
    this.getSepecialShareData()
  }

  async getSepecialShareData() {
    const { specialId } = this.props.match.params as { specialId: string }
    const res = await getSpeicalData(specialId)
    if (!res) return
    const { SpecialId, Title, Summary } = res
    this.setState({
      shareTitle: Title,
      shareSummary: Summary,
      shareUrl: `${getSepecialLinkUrl()}${SpecialId}`
    })
  }

  initSharePositionStyle(positionType: TemplatePositionType): CSSProperties {
    return initTemplatePositionStyle(positionType)
  }

  renderMainLandShareTemp(): JSX.Element {
    const { tempData } = this.props
    const { shareTitle, shareSummary, shareUrl } = this.state

    return (
      <div className="mainland_share">
        <span className="share">
          <em style={{ color: (tempData.tempData as IShareModel).labelFontColor }}>分享给朋友：</em>
          <i className="qq_div1 weixin bg_i" title="微信"
            data-bshare={`{type:"weixin",url:"${shareUrl}",title:"${shareTitle}",summary:"${shareSummary}",images:""}`}
          ></i>
          <i className="qq_div2 weibo bg_i" title="微博"
            data-bshare={`{type:"weibo",url:"${shareUrl}",title:"${shareTitle}",summary:"${shareSummary}",images:""}`}
          ></i>
          <i className="qq_div3 qzone bg_i" title="QQ空间"
            data-bshare={`{type:"qzone",url:"${shareUrl}",title:"${shareTitle}",summary:"${shareSummary}",images:""}`}
          ></i>
        </span>
      </div>
    )
  }

  renderTWShareTemp(): JSX.Element {
    const { tempData } = this.props
    const { shareTitle, shareSummary, shareUrl } = this.state

    return (
      <div className="tw_share">
        <span className="share">
          <em style={{ color: (tempData.tempData as IShareModel).labelFontColor }}>分享連結：</em>
          <i className="qq_div1 line bg_i" title="line"
            data-bshare={`{type:"line",url:"${shareUrl}",title:"${shareTitle}",summary:"${shareSummary}",images:""}`}
          ></i>
          <i className="qq_div2 facebook bg_i" title="facebook"
            data-bshare={`{type:"facebook",url:"${shareUrl}",title:"${shareTitle}",summary:"${shareSummary}",images:""}`}
          ></i>
          <i className="qq_div3 twitter bg_i" title="twitter"
            data-bshare={`{type:"twitter",url:"${shareUrl}",title:"${shareTitle}",summary:"${shareSummary}",images:""}`}
          ></i>
        </span>
      </div>
    )
  }
}

export default memo(Share)