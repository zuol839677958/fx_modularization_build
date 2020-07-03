import React, { Component, Fragment } from 'react'
import { Pagination, message, Button } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { getTemplateList } from '../../axios/api'
import { PageResponse, TemplateResponseModel } from '../../axios/data'

import './index.less'

interface ITemplateSelectState {
  templateList: PageResponse<TemplateResponseModel>
}

class TemplateSelect extends Component<RouteComponentProps, ITemplateSelectState> {
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
            {/* <i className="iconfont close-btn">&#xE005;</i> */}
            {/* <Button type="primary" shape="round" style={{ float: 'right' }}>新增模板</Button> */}
          </div>
          <div className="tmplate-content-list">
            <div className="list-tmp-box">
              {this.renderTemplateList()}
            </div>
            <div className="tip-pagination">
              <div className="select-tip">注意：必需选择一个模板，才能进入下一步</div>
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
    const { specialId } = this.props.match.params as { specialId: string }

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
                  <span className="preview" onClick={() => this.jumpToPreview(item.Content!)}>预览</span>
                  <Link to={`/home/${specialId}/0/${item.TempId}`}>
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

  // 跳转至预览页面
  jumpToPreview(content: string) {
    if (!content) return message.warning('此模板没有任何内容！')
    localStorage.setItem('pageEditorData', content)
    const openWindow = window.open('about:blank') as Window
    const { origin, pathname } = window.location
    openWindow.location = `${origin}${pathname}#/preview` as any
  }
}

export default withRouter(TemplateSelect) 