import React, { Component } from 'react'
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

import './index.less'
/**
 * @interface ITemplateSelectProps
 * 
 * 
 */
interface ITemplateSelectProps {

}

class templateSelect extends Component<ITemplateSelectProps> {
  render() {
        

    return (
        <div className="template-select-box">
            <div className="c-box">
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
                                        <img src="https://img.wbp5.com/upload/files/master/2020/06/24/100417907.png" alt=""/>
                                </div>
                                <div className="preview-usered">
                                    <span className="preview">预览</span>
                                    <Link to="/home">
                                        <span className="usered" >使用</span>   
                                    </Link> 
                                </div>    
                            </div>    
                            <div className="tmp-right">
                                <h6>牛人榜模板1</h6>
                                <p>模板说明：大图+图文+评论</p>
                            </div>
                        </li>
                      
                    </ul>
                   
                </div>
                <div className="tip-pagination">
                        <div className="select-tip">
                            注意：必需选择一个模板，才能进入下一步，暂不选择，请关闭本窗口
                        </div>
                        <div className="select-pagination">
                        <Pagination
                            showQuickJumper
                            size="small"
                            onShowSizeChange={this.onShowSizeChange}
                            defaultCurrent={1}
                            hideOnSinglePage={true}
                            pageSize={8}
                            pageSizeOptions={["8"]}
                            total={10}
                            />
                        </div>
                    </div>
            </div>
            </div>
          
        </div>
    )
  }
  onShowSizeChange(current:any,pageSize:any){

  }
}




export default templateSelect