
import React, { Fragment } from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'


import './index.less'

interface IShareProps extends IMasterTemplateProps { }

interface IShareState extends IMasterTemplateState { }

class Share extends MasterTemplate<IShareProps> {
  state: IShareState = {
    isShowMask: false
  }
  componentDidMount(){
    let s:Element = document.querySelector(".share_box")!;
    let script = document.createElement("script");
    script.src = 'https://js.wbp5.com/script/public/jquery/jquery-1.8.3.min.js';
    s.appendChild(script);
    let script2 = document.createElement("script");
    script2.src = 'https://js.wbp5.com/script/public/Bshare/bshare.min.js';
    s.appendChild(script2);
    let script1 = document.createElement("script");
    script1.src = 'https://js.wbp5.com/script/public/QRCode/generate.min.js';
    s.appendChild(script1);
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
        className={`share_box`}
        style={this.initTempBackground(tempData.background)}
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
        {/* {this.renderShareTmp(tempData.tempData as ICorrelationSpecialModel[])} */}
        <div className="share_content">
            <div className="mainland_share">
              <span className="share">
                    <em>分享给朋友：</em>
                    <i className="qq_div1 weixin bg_i" title="微信" data-bshare='{type:"weixin",url:"fx110.com",title:"111",summary:"111",images:""}'></i>
                    <i className="qq_div2 weibo bg_i" title="微博" data-bshare='{type:"weibo",url:"",title:"",summary:"（分享至@FX110）",images:""}'></i>
                    <i className="qq_div3 qzone bg_i" title="QQ空间" data-bshare='{type:"qzone",url:"",title:"",summary:"",images:""}'></i>
              </span>
              
            </div>
            <div className="tw_share">
                <span className="share">
                      <em>分享連結：</em>
                      <i className="qq_div1 line bg_i" title="line" data-bshare='{type:"line",url:"",title:"",summary:"",images:""}'></i>
                      <i className="qq_div2 facebook bg_i" title="facebook" data-bshare='{type:"facebook",url:"",title:"",summary:"（分享至@FX110）",images:""}'></i>
                      <i className="qq_div3 twitter bg_i" title="twitter" data-bshare='{type:"twitter",url:"",title:"",summary:"",images:""}'></i>
                  </span>
                  <script src="~/Scripts/SharedViewmin/twShare.js?v=ded726c262"></script>
              </div>

          </div>
          
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