import React, { Component, Fragment } from 'react'
import { Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { getTemplateList } from '../../axios/api'
import { PageResponse, TemplateResponseModel } from '../../axios/data'

import './index.less'

interface ITemplateSelectProps { }

interface ITemplateSelectState {
  templateList: PageResponse<TemplateResponseModel>
}

class TemplateSelect extends Component<ITemplateSelectProps, ITemplateSelectState> {
  state: ITemplateSelectState = {
    templateList: {}
  }

  render() {
    const { templateList } = this.state

    return (
      <div className="template-select-box">
        <div className="c-box">
          <div className="select-top">
            <h2>请选择网站模板</h2>
            <i className="iconfont close-btn">&#xE005;</i>
          </div>
          <div className="tmplate-content-list">
            <div className="list-tmp-box">
              {this.renderTemplateList()}
            </div>
            <div className="tip-pagination">
              <div className="select-tip">注意：必需选择一个模板，才能进入下一步，暂不选择，请关闭本窗口</div>
              <div className="select-pagination">
                <Pagination
                  showQuickJumper
                  size="small"
                  onShowSizeChange={this.onShowSizeChange}
                  defaultCurrent={1}
                  hideOnSinglePage={true}
                  pageSize={templateList.PageSize || 10}
                  pageSizeOptions={["8"]}
                  total={templateList.TotalCount || 1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onShowSizeChange(current: any, pageSize: any) {

  }

  componentDidMount() {
    this.getTemplateList()
  }

  async getTemplateList() {
    const templateList = await getTemplateList()
    this.setState({ templateList })
  }

  // 渲染模板列表数据
  renderTemplateList(): JSX.Element {
    const { templateList } = this.state
    if (!templateList) return <Fragment></Fragment>
    return (
      <ul>
        {
          templateList.PageDatas?.map(item => (
            <li key={item.TempId}>
              <div className="tmp-left">
                <div className="img-box" >
                  <img src={item.Img} alt={item.Title} />
                </div>
                <div className="preview-usered">
                  <span className="preview">预览</span>
                  <Link to={`/home/0/${item.TempId}`}>
                    <span className="usered">使用</span>
                  </Link>
                </div>
              </div>
              <div className="tmp-right">
                <h6>{item.Title}</h6>
                <p>模板说明：{item.Summary}</p>
              </div>
            </li>
          ))
        }
      </ul>
    )
  }
}
export default TemplateSelect