import React, { Component } from 'react'


import './index.less'

interface ITemplateSelectProps {

}

class templateSelect extends Component<ITemplateSelectProps> {
  render() {
    

    return (
        <div className="template-select-box">
            <div className="select-top">
                <h2>请选择网站模板</h2>
                <i className="iconfont close-btn">&#xE005;</i>
            </div>
            <div className="tmplate-content-list">
                <div className="list-tmp-box">
                    <ul>
                        <li>
                            <div className="tmp-left">
                                <div className="img-box" >
                                        <img src="https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610115945561.png" alt=""/>
                                </div>
                                <div className="preview-usered">
                                    <span className="preview">预览</span><span className="usered" >使用</span>    
                                </div>    
                            </div>    
                            <div className="tmp-right">
                                <h3>牛人榜模板1</h3>
                                <p>模板说明：大图+图文+评论</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}




export default templateSelect